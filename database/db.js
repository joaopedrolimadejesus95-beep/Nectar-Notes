const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = path.join(__dirname, 'nectarnotes.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA foreign_keys = ON;');

function hashPassword(password) {
    return crypto.createHash('sha256').update(String(password)).digest('hex');
}

// Capas reais presentes em /pictures/Capas (respeitando maiúsculas/minúsculas)
const CAPAS_CATALOG = [
    { file: 'Capa01.webp', title: 'Honeycomb Dreams', artist: 'Queen Bee', genre: 'Pop', category: 'em_alta' },
    { file: 'Capa02.jpg', title: 'Nectar Vibes', artist: 'The Pollinators', genre: 'Indie', category: 'em_alta' },
    { file: 'Capa03.jpg', title: 'Golden Hive', artist: 'Buzz Light', genre: 'Eletrônica', category: 'em_alta' },
    { file: 'Capa04.jpg', title: 'Sweet Stinger', artist: 'Apiary Club', genre: 'Rock', category: 'em_alta' },
    { file: 'Capa05.jpg', title: 'Yellow Horizon', artist: 'Melodia Real', genre: 'Lo-Fi', category: 'em_alta' },
    { file: 'Capa06.jpg', title: 'Midnight Swarm', artist: 'Zangão Beats', genre: 'Hip-Hop', category: 'em_alta' },
    { file: 'Capa07.jpg', title: 'Pollen Storm', artist: 'Flora & Fauna', genre: 'Indie Rock', category: 'em_alta' },
    { file: 'Capa08.jpg', title: 'Royal Jelly', artist: 'Abelha Rainha', genre: 'R&B', category: 'em_alta' },
    { file: 'Capa09.webp', title: 'Flowers in Bloom', artist: 'Jardim Secreto', genre: 'MPB', category: 'em_alta' },
    { file: 'Capa10.jpg', title: 'Buzzing Around', artist: 'Colmeia Sonora', genre: 'Pop', category: 'em_alta' },
    { file: 'Capa11.jpg', title: 'Amber Drops', artist: 'Nectar Collective', genre: 'Jazz', category: 'recomendados' },
    { file: 'Capa12.jpg', title: 'Sunlit Meadow', artist: 'Asas Douradas', genre: 'Folk', category: 'recomendados' },
    { file: 'Capa13.jpg', title: 'Hexagon Rhythm', artist: 'SynthHive', genre: 'Synthwave', category: 'recomendados' },
    { file: 'Capa14.jpg', title: 'Wildflower Nectar', artist: 'Bumblebee', genre: 'Indie Pop', category: 'recomendados' },
    { file: 'Capa15.jpg', title: 'Flight of the Bee', artist: 'Orquestra Real', genre: 'Clássica', category: 'recomendados' },
    { file: 'Capa16.jpg', title: 'Honey Drip', artist: 'DJ Colmeia', genre: 'Trap', category: 'recomendados' },
    { file: 'capa17.jpg', title: 'Wax & Gold', artist: 'Favos de Mel', genre: 'Soul', category: 'recomendados' },
    { file: 'capa18.jpg', title: 'Queen\'s Crown', artist: 'Monarca', genre: 'Rock', category: 'recomendados' },
    { file: 'capa19.jpg', title: 'Breeze in the Hive', artist: 'Vento Sul', genre: 'Chill', category: 'recentes' },
    { file: 'capa20.jpg', title: 'Nectar Notes Theme', artist: 'NectarNotes Official', genre: 'Soundtrack', category: 'recentes' },
    { file: 'capa21.jpg', title: 'Doce Veneno', artist: 'Vespa Negra', genre: 'Hard Rock', category: 'recentes' },
    { file: 'capa22.jpg', title: 'Pólen de Estrelas', artist: 'Cosmos', genre: 'Ambient', category: 'recentes' },
    { file: 'capa23.jpg', title: 'Dança das Abelhas', artist: 'Trio Colmeia', genre: 'Forró', category: 'recentes' },
    { file: 'capa24.jpg', title: 'Sol de Primavera', artist: 'Girassol', genre: 'Acústico', category: 'recentes' },
    { file: 'capa25.jpg', title: 'Noite na Floresta', artist: 'Eco Verde', genre: 'Lo-Fi', category: 'recentes' },
    { file: 'capa26.jpg', title: 'Zumbido Urbano', artist: 'Metrópole', genre: 'Rap', category: 'recentes' },
    { file: 'capa27.jpg', title: 'Mel Puro', artist: 'Essência', genre: 'MPB', category: 'recentes' },
    { file: 'Capa28.png', title: 'Céu Dourado', artist: 'Horizonte', genre: 'Pop Rock', category: 'recentes' },
    { file: 'capa29.jpg', title: 'Jardim de Inverno', artist: 'outono', genre: 'Indie', category: 'recentes' },
    { file: 'Capa30.jpg', title: 'Raio de Sol', artist: 'Luz', genre: 'Pop', category: 'recentes' }
];

const PET_ITEMS_SEED = [
    { name: 'Camiseta Azul', category: 'camisa', image_url: 'https://img.freepik.com/vetores-gratis/desenho-de-adesivo-com-camiseta-azul-isolada_1308-79625.jpg', xp_bonus: 15 },
    { name: 'Camiseta Vermelha', category: 'camisa', image_url: 'https://static.vecteezy.com/system/resources/previews/003/532/204/non_2x/sticker-design-with-red-t-shirt-isolated-free-vector.jpg', xp_bonus: 15 },
    { name: 'Camiseta Branca', category: 'camisa', image_url: 'https://static.vecteezy.com/system/resources/thumbnails/006/034/398/small_2x/sticker-white-t-shirt-with-coathanger-free-vector.jpg', xp_bonus: 15 },
    { name: 'Moletom Colmeia', category: 'camisa', image_url: 'https://th.bing.com/th/id/OIP.UL742fzpgA2pX35cdY-MgAHaHa?rs=1&pid=ImgDetMain', xp_bonus: 20 },
    { name: 'Jaqueta Dourada', category: 'camisa', image_url: 'https://th.bing.com/th/id/OIP.WlR4JaP6HPBjIfmq0pQ9LwHaGG?rs=1&pid=ImgDetMain', xp_bonus: 25 },
    { name: 'Camisa Vasco', category: 'camisa', image_url: 'https://static.shopvasco.com.br/produtos/camiseta-infantil-vasco-da-gama-recorte/06/425-8912-006/425-8912-006_zoom1.jpg?ts=1581420023&ims=1088x', xp_bonus: 30 },
    { name: 'Manto Real', category: 'camisa', image_url: 'https://thumbs.dreamstime.com/z/composi%C3%A7%C3%A3o-realista-do-rei-cloak-manto-com-imagem-vestido-monarca-o-cetro-vermelho-real-e-ilustra%C3%A7%C3%A3o-vetor-de-bola-200482946.jpg', xp_bonus: 50 },
    { name: 'Óculos Escuros', category: 'rosto', image_url: 'https://prints.ultracoloringpages.com/b052c464fc36c37388dfbe6082288d3d.png', xp_bonus: 20 },
    { name: 'Óculos Cool', category: 'rosto', image_url: 'https://th.bing.com/th/id/OIP.ylbodItlJPFQym6zWriM7QHaHa?rs=1&pid=ImgDetMain', xp_bonus: 20 },
    { name: 'Coroa de Abelha', category: 'rosto', image_url: 'https://th.bing.com/th/id/OIP.NT-IKq8OjQHsY5cWkk9o-AHaHa?rs=1&pid=ImgDetMain', xp_bonus: 35 }
];

function initDatabase() {
    const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schemaSql);

    // 1. Seed usuário padrão se não existir
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    let defaultUserId = 1;
    if (userCount === 0) {
        const insertUser = db.prepare(`
            INSERT INTO users (username, email, password_hash, bio, country, profile_pic)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        const info = insertUser.run(
            'AbelhaRainha',
            'rainha@nectarnotes.com',
            hashPassword('123456'),
            'Apaixonada pelas melhores melodias da colmeia! 🐝🍯',
            'brasil',
            '/pictures/icons/profile.png'
        );
        defaultUserId = Number(info.lastInsertRowid);
    } else {
        const firstUser = db.prepare('SELECT id FROM users ORDER BY id ASC LIMIT 1').get();
        if (firstUser) defaultUserId = firstUser.id;
    }

    // 2. Seed músicas se não existirem
    const songCount = db.prepare('SELECT COUNT(*) as count FROM songs').get().count;
    if (songCount === 0) {
        const insertSong = db.prepare(`
            INSERT INTO songs (title, artist, album, genre, duration, release_year, cover_url, audio_url, category, plays)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        CAPAS_CATALOG.forEach((item, idx) => {
            const mins = 2 + (idx % 3);
            const secs = String(15 + ((idx * 7) % 44)).padStart(2, '0');
            insertSong.run(
                item.title,
                item.artist,
                'Colmeia Hits Vol. ' + ((idx % 3) + 1),
                item.genre,
                `${mins}:${secs}`,
                2022 + (idx % 3),
                `/pictures/Capas/${item.file}`,
                '/audios/audio1.mp3',
                item.category,
                100 + idx * 37
            );
        });
    }

    // 3. Seed itens de Pet se não existirem
    const petItemCount = db.prepare('SELECT COUNT(*) as count FROM pet_items').get().count;
    if (petItemCount === 0) {
        const insertPetItem = db.prepare(`
            INSERT INTO pet_items (name, category, image_url, xp_bonus)
            VALUES (?, ?, ?, ?)
        `);
        PET_ITEMS_SEED.forEach(item => {
            insertPetItem.run(item.name, item.category, item.image_url, item.xp_bonus);
        });
    }

    // 4. Garantir Pet e Playlists iniciais para o usuário padrão
    ensureUserDefaults(defaultUserId);
}

function ensureUserDefaults(userId) {
    // Garantir Pet
    const existingPet = db.prepare('SELECT id FROM pets WHERE user_id = ?').get(userId);
    if (!existingPet) {
        db.prepare(`
            INSERT INTO pets (user_id, name, xp, level, photo_url)
            VALUES (?, 'Buzzy Mel', 55, 2, '/pictures/FotosPets/FotoPet01.jpg')
        `).run(userId);
    }

    // Garantir Playlists iniciais se o usuário não tiver nenhuma
    const playlistCount = db.prepare('SELECT COUNT(*) as count FROM playlists WHERE user_id = ?').get(userId).count;
    if (playlistCount === 0) {
        const insertPlaylist = db.prepare('INSERT INTO playlists (user_id, name, description) VALUES (?, ?, ?)');
        const insertPlaylistSong = db.prepare('INSERT OR IGNORE INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)');

        const p1 = Number(insertPlaylist.run(userId, 'Favoritas da Colmeia', 'As mais tocadas na colmeia').lastInsertRowid);
        [12, 11, 24, 7, 1, 2].forEach((songId, idx) => insertPlaylistSong.run(p1, songId, idx));

        const p2 = Number(insertPlaylist.run(userId, 'Vibe Néctar & Lo-Fi', 'Para relaxar e estudar').lastInsertRowid);
        [5, 10, 13, 9, 15, 19].forEach((songId, idx) => insertPlaylistSong.run(p2, songId, idx));

        const p3 = Number(insertPlaylist.run(userId, 'Zumbido Eletrônico', 'Energia máxima para a festa').lastInsertRowid);
        [1, 8, 14, 4, 3, 6].forEach((songId, idx) => insertPlaylistSong.run(p3, songId, idx));

        // Curtidas iniciais
        const insertLike = db.prepare('INSERT OR IGNORE INTO liked_songs (user_id, song_id) VALUES (?, ?)');
        [1, 3, 5, 8, 12].forEach(songId => insertLike.run(userId, songId));
    }
}

initDatabase();

module.exports = {
    db,
    hashPassword,
    ensureUserDefaults,
    DB_PATH
};
