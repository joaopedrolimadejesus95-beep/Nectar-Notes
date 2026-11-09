const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');
const { db, hashPassword, ensureUserDefaults, DB_PATH } = require('./database/db');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav'
};

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 12 * 1024 * 1024) {
                reject(new Error('Payload too large'));
            }
        });
        req.on('end', () => {
            if (!body) return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
        req.on('error', reject);
    });
}

function sanitizeUser(user) {
    if (!user) return null;
    const { password_hash, ...safeUser } = user;
    return safeUser;
}

async function handleApi(req, res, pathname, searchParams) {
    if (req.method === 'OPTIONS') {
        return sendJson(res, 200, { ok: true });
    }

    // Compatibilidade com controller/php/getCapas.php e /api/capas
    if ((pathname === '/api/capas' || pathname === '/controller/php/getCapas.php') && req.method === 'GET') {
        const capasDir = path.join(ROOT_DIR, 'pictures', 'Capas');
        const files = fs.existsSync(capasDir)
            ? fs.readdirSync(capasDir).filter(f => !f.startsWith('.'))
            : [];
        return sendJson(res, 200, files);
    }

    // POST /api/auth/register
    if (pathname === '/api/auth/register' && req.method === 'POST') {
        const { username, email, password } = await parseBody(req);
        if (!username || !email || !password) {
            return sendJson(res, 400, { error: 'Preencha usuário, email e senha.' });
        }
        const existing = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username.trim(), email.trim());
        if (existing) {
            return sendJson(res, 409, { error: 'Nome de usuário ou email já cadastrado.' });
        }
        const info = db.prepare(`
            INSERT INTO users (username, email, password_hash)
            VALUES (?, ?, ?)
        `).run(username.trim(), email.trim(), hashPassword(password));
        const userId = Number(info.lastInsertRowid);
        ensureUserDefaults(userId);
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        return sendJson(res, 201, { user: sanitizeUser(user) });
    }

    // POST /api/auth/login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
        const { username, password } = await parseBody(req);
        if (!username || !password) {
            return sendJson(res, 400, { error: 'Informe usuário e senha.' });
        }
        let user = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(username.trim(), username.trim());
        if (!user) {
            const email = username.includes('@') ? username.trim() : `${username.trim().toLowerCase().replace(/\s+/g, '')}@nectarnotes.com`;
            const info = db.prepare(`
                INSERT INTO users (username, email, password_hash)
                VALUES (?, ?, ?)
            `).run(username.trim(), email, hashPassword(password));
            const newId = Number(info.lastInsertRowid);
            ensureUserDefaults(newId);
            user = db.prepare('SELECT * FROM users WHERE id = ?').get(newId);
            return sendJson(res, 200, { user: sanitizeUser(user), created: true });
        }
        if (user.password_hash !== hashPassword(password)) {
            return sendJson(res, 401, { error: 'Senha incorreta.' });
        }
        ensureUserDefaults(user.id);
        return sendJson(res, 200, { user: sanitizeUser(user) });
    }

    // GET / PUT / DELETE /api/users/:id
    const userMatch = pathname.match(/^\/api\/users\/(\d+)$/);
    if (userMatch) {
        const userId = Number(userMatch[1]);
        if (req.method === 'GET') {
            const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
            if (!user) return sendJson(res, 404, { error: 'Usuário não encontrado.' });
            const likedSongs = db.prepare(`
                SELECT s.* FROM songs s
                INNER JOIN liked_songs ls ON ls.song_id = s.id
                WHERE ls.user_id = ?
                ORDER BY ls.liked_at DESC
            `).all(userId);
            const pet = db.prepare('SELECT * FROM pets WHERE user_id = ?').get(userId);
            return sendJson(res, 200, { user: sanitizeUser(user), likedSongs, pet });
        }

        if (req.method === 'PUT') {
            const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
            if (!user) return sendJson(res, 404, { error: 'Usuário não encontrado.' });
            const { username, email, bio, password, country, profile_pic, banner_color } = await parseBody(req);

            const newUsername = username ? username.trim() : user.username;
            const newEmail = email ? email.trim() : user.email;
            const newBio = bio !== undefined ? bio : user.bio;
            const newCountry = country || user.country;
            const newProfilePic = profile_pic || user.profile_pic;
            const newBannerColor = banner_color || user.banner_color;
            const newPassHash = password ? hashPassword(password) : user.password_hash;

            db.prepare(`
                UPDATE users
                SET username = ?, email = ?, bio = ?, password_hash = ?, country = ?, profile_pic = ?, banner_color = ?
                WHERE id = ?
            `).run(newUsername, newEmail, newBio, newPassHash, newCountry, newProfilePic, newBannerColor, userId);

            const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
            return sendJson(res, 200, { user: sanitizeUser(updated) });
        }

        if (req.method === 'DELETE') {
            db.prepare('DELETE FROM users WHERE id = ?').run(userId);
            return sendJson(res, 200, { deleted: true });
        }
    }

    // GET / POST /api/songs
    if (pathname === '/api/songs') {
        if (req.method === 'GET') {
            const category = searchParams.get('category');
            const search = searchParams.get('search');
            const genre = searchParams.get('genre');
            const userId = Number(searchParams.get('userId') || 1);

            let query = `
                SELECT s.*,
                       CASE WHEN ls.user_id IS NOT NULL THEN 1 ELSE 0 END AS liked
                FROM songs s
                LEFT JOIN liked_songs ls ON ls.song_id = s.id AND ls.user_id = ?
                WHERE 1=1
            `;
            const params = [userId];

            if (category) {
                query += ' AND s.category = ?';
                params.push(category);
            }
            if (genre) {
                query += ' AND s.genre LIKE ?';
                params.push(`%${genre.trim()}%`);
            }
            if (search) {
                query += ' AND (s.title LIKE ? OR s.artist LIKE ? OR s.genre LIKE ? OR s.album LIKE ? OR s.artist_city LIKE ?)';
                const term = `%${search.trim()}%`;
                params.push(term, term, term, term, term);
            }
            query += ' ORDER BY s.is_indie_spotlight DESC, s.plays DESC, s.id ASC';

            const songs = db.prepare(query).all(...params);
            return sendJson(res, 200, songs);
        }

        if (req.method === 'POST') {
            const body = await parseBody(req);
            const {
                title,
                artist,
                genre = 'Indie',
                artist_city = 'Brasil',
                artist_bio = 'Artista independente divulgado na Colmeia NectarNotes.',
                instagram_url = 'https://instagram.com',
                spotify_url = 'https://open.spotify.com',
                soundcloud_url = 'https://soundcloud.com',
                youtube_url = 'https://youtube.com',
                support_link = 'https://apoia.se',
                cover_url = '/pictures/Capas/Capa01.webp',
                audio_url = '/audios/audio1.mp3',
                category = 'em_alta'
            } = body;

            if (!title || !artist) {
                return sendJson(res, 400, { error: 'Informe o nome da música e do artista indie.' });
            }

            const info = db.prepare(`
                INSERT INTO songs (
                    title, artist, album, genre, duration, release_year,
                    cover_url, audio_url, category, plays,
                    artist_bio, artist_city, instagram_url, spotify_url, soundcloud_url, youtube_url, support_link, is_indie_spotlight
                ) VALUES (?, ?, ?, ?, '3:30', 2026, ?, ?, ?, 50, ?, ?, ?, ?, ?, ?, ?, 1)
            `).run(
                title.trim(),
                artist.trim(),
                'Single Independente',
                genre.trim(),
                cover_url,
                audio_url,
                category,
                artist_bio.trim(),
                artist_city.trim(),
                instagram_url.trim(),
                spotify_url.trim(),
                soundcloud_url.trim(),
                youtube_url.trim(),
                support_link.trim()
            );

            const newSong = db.prepare('SELECT * FROM songs WHERE id = ?').get(Number(info.lastInsertRowid));
            return sendJson(res, 201, newSong);
        }
    }

    // GET /api/songs/:id
    const songMatch = pathname.match(/^\/api\/songs\/(\d+)$/);
    if (songMatch && req.method === 'GET') {
        const songId = Number(songMatch[1]);
        const userId = Number(searchParams.get('userId') || 1);
        const song = db.prepare(`
            SELECT s.*,
                   CASE WHEN ls.user_id IS NOT NULL THEN 1 ELSE 0 END AS liked
            FROM songs s
            LEFT JOIN liked_songs ls ON ls.song_id = s.id AND ls.user_id = ?
            WHERE s.id = ?
        `).get(userId, songId);

        if (!song) return sendJson(res, 404, { error: 'Música não encontrada.' });
        return sendJson(res, 200, song);
    }

    // POST /api/songs/:id/like
    const likeMatch = pathname.match(/^\/api\/songs\/(\d+)\/like$/);
    if (likeMatch && req.method === 'POST') {
        const songId = Number(likeMatch[1]);
        const { userId = 1 } = await parseBody(req);
        const exists = db.prepare('SELECT 1 FROM liked_songs WHERE user_id = ? AND song_id = ?').get(userId, songId);
        if (exists) {
            db.prepare('DELETE FROM liked_songs WHERE user_id = ? AND song_id = ?').run(userId, songId);
            return sendJson(res, 200, { liked: false });
        } else {
            db.prepare('INSERT OR IGNORE INTO liked_songs (user_id, song_id) VALUES (?, ?)').run(userId, songId);
            db.prepare('UPDATE songs SET plays = plays + 5 WHERE id = ?').run(songId);
            return sendJson(res, 200, { liked: true });
        }
    }

    // POST /api/songs/:id/play
    const playMatch = pathname.match(/^\/api\/songs\/(\d+)\/play$/);
    if (playMatch && req.method === 'POST') {
        const songId = Number(playMatch[1]);
        db.prepare('UPDATE songs SET plays = plays + 1 WHERE id = ?').run(songId);
        const updated = db.prepare('SELECT plays FROM songs WHERE id = ?').get(songId);
        return sendJson(res, 200, { plays: updated ? updated.plays : 1 });
    }

    // GET / POST /api/playlists
    if (pathname === '/api/playlists') {
        if (req.method === 'GET') {
            const userId = Number(searchParams.get('userId') || 1);
            ensureUserDefaults(userId);
            const playlists = db.prepare('SELECT * FROM playlists WHERE user_id = ? ORDER BY id ASC').all(userId);
            const getSongs = db.prepare(`
                SELECT s.* FROM songs s
                INNER JOIN playlist_songs ps ON ps.song_id = s.id
                WHERE ps.playlist_id = ?
                ORDER BY ps.position ASC, s.id ASC
            `);
            const result = playlists.map(p => ({
                ...p,
                songs: getSongs.all(p.id)
            }));

            const likedSongs = db.prepare(`
                SELECT s.* FROM songs s
                INNER JOIN liked_songs ls ON ls.song_id = s.id
                WHERE ls.user_id = ?
                ORDER BY ls.liked_at DESC
            `).all(userId);

            if (likedSongs.length > 0) {
                result.unshift({
                    id: 'liked',
                    user_id: userId,
                    name: 'Minha Colmeia (Favoritas)',
                    description: 'Músicas independentes que você polinizou com ❤️',
                    songs: likedSongs
                });
            }

            return sendJson(res, 200, result);
        }

        if (req.method === 'POST') {
            const { userId = 1, name, description = '', songIds = [] } = await parseBody(req);
            if (!name || !name.trim()) {
                return sendJson(res, 400, { error: 'Informe um nome para a playlist.' });
            }
            const info = db.prepare('INSERT INTO playlists (user_id, name, description) VALUES (?, ?, ?)').run(
                userId,
                name.trim(),
                description
            );
            const playlistId = Number(info.lastInsertRowid);
            const insertSong = db.prepare('INSERT OR IGNORE INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)');
            const idsToInsert = songIds.length > 0 ? songIds : [1, 2, 4, 5];
            idsToInsert.forEach((sId, idx) => insertSong.run(playlistId, Number(sId), idx));

            const playlist = db.prepare('SELECT * FROM playlists WHERE id = ?').get(playlistId);
            const songs = db.prepare(`
                SELECT s.* FROM songs s
                INNER JOIN playlist_songs ps ON ps.song_id = s.id
                WHERE ps.playlist_id = ?
            `).all(playlistId);
            return sendJson(res, 201, { ...playlist, songs });
        }
    }

    // POST /api/playlists/:id/songs
    const playlistSongsMatch = pathname.match(/^\/api\/playlists\/(\d+)\/songs$/);
    if (playlistSongsMatch && req.method === 'POST') {
        const playlistId = Number(playlistSongsMatch[1]);
        const { songId } = await parseBody(req);
        db.prepare('INSERT OR IGNORE INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)').run(playlistId, Number(songId));
        return sendJson(res, 200, { added: true });
    }

    // GET / PUT /api/pets/:userId
    const petMatch = pathname.match(/^\/api\/pets\/(\d+)$/);
    if (petMatch) {
        const userId = Number(petMatch[1]);
        ensureUserDefaults(userId);

        if (req.method === 'GET') {
            const pet = db.prepare(`
                SELECT p.*,
                       s.name as shirt_name, s.image_url as shirt_url,
                       f.name as face_name, f.image_url as face_url
                FROM pets p
                LEFT JOIN pet_items s ON s.id = p.equipped_shirt_id
                LEFT JOIN pet_items f ON f.id = p.equipped_face_id
                WHERE p.user_id = ?
            `).get(userId);
            const items = db.prepare('SELECT * FROM pet_items ORDER BY id ASC').all();
            return sendJson(res, 200, { pet, items });
        }

        if (req.method === 'PUT') {
            const { name, itemId, category } = await parseBody(req);
            const pet = db.prepare('SELECT * FROM pets WHERE user_id = ?').get(userId);
            let newName = name ? name.trim() : pet.name;
            let newXp = pet.xp;
            let shirtId = pet.equipped_shirt_id;
            let faceId = pet.equipped_face_id;

            if (itemId !== undefined) {
                const item = db.prepare('SELECT * FROM pet_items WHERE id = ?').get(Number(itemId));
                if (item) {
                    if (item.category === 'camisa') {
                        shirtId = shirtId === item.id ? null : item.id;
                    } else if (item.category === 'rosto') {
                        faceId = faceId === item.id ? null : item.id;
                    }
                    newXp = Math.min(9999, pet.xp + (item.xp_bonus || 10));
                }
            } else if (category === 'unequip') {
                shirtId = null;
                faceId = null;
            }

            const newLevel = Math.floor(newXp / 50) + 1;
            db.prepare(`
                UPDATE pets
                SET name = ?, xp = ?, level = ?, equipped_shirt_id = ?, equipped_face_id = ?, updated_at = CURRENT_TIMESTAMP
                WHERE user_id = ?
            `).run(newName, newXp, newLevel, shirtId, faceId, userId);

            const updatedPet = db.prepare(`
                SELECT p.*,
                       s.name as shirt_name, s.image_url as shirt_url,
                       f.name as face_name, f.image_url as face_url
                FROM pets p
                LEFT JOIN pet_items s ON s.id = p.equipped_shirt_id
                LEFT JOIN pet_items f ON f.id = p.equipped_face_id
                WHERE p.user_id = ?
            `).get(userId);
            return sendJson(res, 200, { pet: updatedPet });
        }
    }

    return sendJson(res, 404, { error: 'Rota da API não encontrada.' });
}

const server = http.createServer(async (req, res) => {
    try {
        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        let pathname = decodeURIComponent(parsedUrl.pathname);

        if (pathname.startsWith('/api/') || pathname === '/controller/php/getCapas.php') {
            return await handleApi(req, res, pathname, parsedUrl.searchParams);
        }

        if (pathname === '/') {
            pathname = '/index.html';
        }

        const legacyRedirects = {
            '/Principal/principal.html': '/view/html/principal.html',
            '/Pesquisa/TelaPesquisa.html': '/view/html/TelaPesquisa.html',
            '/Album/MusicasSalvas.html': '/view/html/MusicasSalvas.html',
            '/Pets/TelaPets.html': '/view/html/TelaPets.html',
            '/perfil/TelaPerfil.html': '/view/html/TelaPerfil.html',
            '/Configurações/TelaConfig.html': '/view/html/TelaConfig.html'
        };
        if (legacyRedirects[pathname]) {
            res.writeHead(302, { Location: legacyRedirects[pathname] });
            return res.end();
        }

        const safePath = path.normalize(path.join(ROOT_DIR, pathname));
        if (!safePath.startsWith(ROOT_DIR)) {
            res.writeHead(403);
            return res.end('Forbidden');
        }

        if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
            const ext = path.extname(safePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(safePath).pipe(res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Arquivo não encontrado: ' + pathname);
        }
    } catch (err) {
        console.error('Erro no servidor:', err);
        sendJson(res, 500, { error: err.message || 'Erro interno no servidor' });
    }
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`🐝 Servidor NectarNotes rodando em http://localhost:${PORT}`);
        console.log(`🗄️  Banco de dados SQLite ativo em: ${DB_PATH}`);
    });
}

module.exports = server;
