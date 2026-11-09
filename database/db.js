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

const CAPAS_CATALOG = [
    { file: 'Capa01.webp', title: 'Honeycomb Dreams', artist: 'Luna & Os Polinizadores', genre: 'Indie Pop', category: 'em_alta', city: 'São Paulo, SP', bio: 'Banda independente de Dream Pop e Indie formada em garagens paulistanas, misturando sintetizadores quentes com letras poéticas.', insta: 'https://instagram.com/lunaeospolinizadores', spotlight: 1 },
    { file: 'Capa02.jpg', title: 'Néctar da Meia-Noite', artist: 'Cais Distante', genre: 'Indie Rock', category: 'em_alta', city: 'Curitiba, PR', bio: 'Quarteto autoral de Indie Rock alternativo com guitarras reverberadas e batidas intensas.', insta: 'https://instagram.com/caisdistante', spotlight: 0 },
    { file: 'Capa03.jpg', title: 'Colmeia Elétrica', artist: 'Zangão Synth', genre: 'Synthwave', category: 'em_alta', city: 'Belo Horizonte, MG', bio: 'Produtor independente de música eletrônica analógica e synthwave brasileiro.', insta: 'https://instagram.com/zangaosynth', spotlight: 0 },
    { file: 'Capa04.jpg', title: 'Doce Ferrão', artist: 'Garagem 404', genre: 'Post-Punk / Indie', category: 'em_alta', city: 'Porto Alegre, RS', bio: 'Trio underground gaúcho com forte influência do post-punk anos 80 e rock de garagem.', insta: 'https://instagram.com/garagem404', spotlight: 0 },
    { file: 'Capa05.jpg', title: 'Horizonte Amarelo', artist: 'Clarice no Quarto', genre: 'Bedroom Pop', category: 'em_alta', city: 'Recife, PE', bio: 'Artista solo de Bedroom Pop e Lo-Fi que grava e produz todas as suas faixas em seu home studio.', insta: 'https://instagram.com/claricenoquarto', spotlight: 0 },
    { file: 'Capa06.jpg', title: 'Enxame Urbano', artist: 'MC Favos & DJ Mel', genre: 'Boom Bap / Rap Indie', category: 'em_alta', city: 'São Paulo, SP', bio: 'Dupla independente de rap autoral combinando samples de jazz brasileiro com poesia marginal.', insta: 'https://instagram.com/enxameurbano', spotlight: 0 },
    { file: 'Capa07.jpg', title: 'Tempestade de Pólen', artist: 'Flora Selvagem', genre: 'MPB Alternativo', category: 'em_alta', city: 'Salvador, BA', bio: 'Projeto autoral que une percussão orgânica baiana com guitarras psicodélicas.', insta: 'https://instagram.com/floraselvagem', spotlight: 0 },
    { file: 'Capa08.jpg', title: 'Geleia Real Sessions', artist: 'Abelha Rainha', genre: 'Neo-Soul / R&B', category: 'em_alta', city: 'Rio de Janeiro, RJ', bio: 'Cantora e compositora independente da cena Neo-Soul carioca.', insta: 'https://instagram.com/abelharainhasoul', spotlight: 0 },
    { file: 'Capa09.webp', title: 'Jardim de Concreto', artist: 'Subúrbio Solar', genre: 'Indie Folk', category: 'em_alta', city: 'Fortaleza, CE', bio: 'Canções acústicas sobre o cotidiano jovem, gravadas de forma 100% independente.', insta: 'https://instagram.com/suburbiosolar', spotlight: 0 },
    { file: 'Capa10.jpg', title: 'Zumbido na Frequência', artist: 'Rádio Colmeia', genre: 'Alt-Pop', category: 'em_alta', city: 'Brasília, DF', bio: 'Coletivo audiovisual e musical independente focado em experimentações pop.', insta: 'https://instagram.com/radiocolmeia', spotlight: 0 },
    { file: 'Capa11.jpg', title: 'Gotas de Âmbar', artist: 'Nectar Jazz Trio', genre: 'Nu-Jazz / Lo-Fi', category: 'recomendados', city: 'São Paulo, SP', bio: 'Instrumental independente misturando jazz contemporâneo com batidas de lo-fi hip-hop.', insta: 'https://instagram.com/nectarjazztrio', spotlight: 0 },
    { file: 'Capa12.jpg', title: 'Manhã de Girassóis', artist: 'Asas Douradas', genre: 'Folk Brasil', category: 'recomendados', city: 'Goiânia, GO', bio: 'Duo de vozes e violões trazendo uma nova roupagem para o folk brasileiro.', insta: 'https://instagram.com/asasdouradas', spotlight: 0 },
    { file: 'Capa13.jpg', title: 'Hexágono Neon', artist: 'CyberAbelha', genre: 'Retrowave', category: 'recomendados', city: 'Campinas, SP', bio: 'Projeto solo de trilhas sonoras eletrônicas e synthpop independente.', insta: 'https://instagram.com/cyberabelha', spotlight: 0 },
    { file: 'Capa14.jpg', title: 'Flor do Campo', artist: 'Bumblebee Indie', genre: 'Shoegaze / Dream Pop', category: 'recomendados', city: 'Florianópolis, SC', bio: 'Paredes de guitarra etéreas e vocais suaves direto da cena indie catarinense.', insta: 'https://instagram.com/bumblebeeindie', spotlight: 0 },
    { file: 'Capa15.jpg', title: 'Voo da Rainha', artist: 'Orquestra de Bolso', genre: 'Instrumental', category: 'recomendados', city: 'Ouro Preto, MG', bio: 'Grupo independente de música de câmara moderna e trilhas cinematográficas.', insta: 'https://instagram.com/orquestradebolso', spotlight: 0 },
    { file: 'Capa16.jpg', title: 'Mel Destilado', artist: 'Koda 011', genre: 'Trap Alternativo', category: 'recomendados', city: 'São Paulo, SP', bio: 'Artista independente explorando timbres melódicos no trap e R&B.', insta: 'https://instagram.com/koda011', spotlight: 0 },
    { file: 'capa17.jpg', title: 'Cera Quente', artist: 'Vinil de Garagem', genre: 'Soul / Funk Indie', category: 'recomendados', city: 'São Paulo, SP', bio: 'Grooves analógicos, baixo marcante e metais gravados ao vivo.', insta: 'https://instagram.com/vinildegaragem', spotlight: 0 },
    { file: 'capa18.jpg', title: 'Coroa de Espinhos e Mel', artist: 'Monarca Underground', genre: 'Indie Rock', category: 'recomendados', city: 'Niterói, RJ', bio: 'Rock alternativo com letras fortes sobre a vida nas grandes cidades.', insta: 'https://instagram.com/monarcaunderground', spotlight: 0 },
    { file: 'capa19.jpg', title: 'Brisa da Colmeia', artist: 'Vento Sul', genre: 'Chillhop', category: 'recentes', city: 'Pelotas, RS', bio: 'Beats relaxantes para estudar, programar e desacelerar.', insta: 'https://instagram.com/ventosulbeats', spotlight: 0 },
    { file: 'capa20.jpg', title: 'Hino NectarNotes', artist: 'Coletivo APS', genre: 'Indie / Tema', category: 'recentes', city: 'Brasil', bio: 'Faixa oficial criada para celebrar os artistas independentes da comunidade NectarNotes.', insta: 'https://instagram.com/nectarnotes', spotlight: 0 },
    { file: 'capa21.jpg', title: 'Vespa Noturna', artist: 'Voltagem Baixa', genre: 'Garage Rock', category: 'recentes', city: 'Santo André, SP', bio: 'Riffs crus e bateria energética da cena independente do ABC Paulista.', insta: 'https://instagram.com/voltagembaixa', spotlight: 0 },
    { file: 'capa22.jpg', title: 'Pólen Estelar', artist: 'Nebulosa Indie', genre: 'Ambient / Post-Rock', category: 'recentes', city: 'Brasília, DF', bio: 'Paisagens sonoras espaciais criadas com pedais de delay e sintetizadores.', insta: 'https://instagram.com/nebulosaindie', spotlight: 0 },
    { file: 'capa23.jpg', title: 'Baião da Colmeia', artist: 'Trio Mandacaru', genre: 'Forró Indie', category: 'recentes', city: 'João Pessoa, PB', bio: 'Fusão moderna de baião tradicional com guitarras indie e synths.', insta: 'https://instagram.com/triomandacaru', spotlight: 0 },
    { file: 'capa24.jpg', title: 'Tarde de Sol', artist: 'Girassol Acústico', genre: 'MPB / Folk', category: 'recentes', city: 'Vitória, ES', bio: 'Canções solares à beira-mar com voz, violão e trompete.', insta: 'https://instagram.com/girassolacustico', spotlight: 0 },
    { file: 'capa25.jpg', title: 'Madrugada Lo-Fi', artist: 'Café & Mel', genre: 'Lo-Fi Beats', category: 'recentes', city: 'São Paulo, SP', bio: 'Beatmaker independente focado em texturas de fita cassete e chuva.', insta: 'https://instagram.com/cafeemelbeats', spotlight: 0 },
    { file: 'capa26.jpg', title: 'Ruas de Ouro', artist: 'Verso Livre', genre: 'Rap Acústico', category: 'recentes', city: 'Guarulhos, SP', bio: 'Rimador independente unindo poesia falada e violão de sete cordas.', insta: 'https://instagram.com/versolivre', spotlight: 0 },
    { file: 'capa27.jpg', title: 'Essência Pura', artist: 'Marina Luz', genre: 'Nova MPB', category: 'recentes', city: 'Belo Horizonte, MG', bio: 'Cantautora mineira com foco em arranjos minimalistas e intimistas.', insta: 'https://instagram.com/marinaluzmpb', spotlight: 0 },
    { file: 'Capa28.png', title: 'Céu de Fim de Tarde', artist: 'Horizonte Perdido', genre: 'Midwest Emo / Indie', category: 'recentes', city: 'Sorocaba, SP', bio: 'Guitarras dedilhadas e letras sinceras da cena emo/indie do interior.', insta: 'https://instagram.com/horizonteperdido', spotlight: 0 },
    { file: 'capa29.jpg', title: 'Folhas de Outono', artist: 'Quarto de Hóspedes', genre: 'Bedroom Indie', category: 'recentes', city: 'Curitiba, PR', bio: 'Gravações caseiras cheias de personalidade e nostalgia.', insta: 'https://instagram.com/quartodehospedes', spotlight: 0 },
    { file: 'Capa30.jpg', title: 'Frequência Solar', artist: 'Prisma Tropical', genre: 'Indie Pop Brasil', category: 'recentes', city: 'Natal, RN', bio: 'Grooves tropicais e refrões marcantes da cena independente nordestina.', insta: 'https://instagram.com/prismatropical', spotlight: 0 }
];

const PET_ITEMS_SEED = [
    { name: 'Camiseta Azul Indie', category: 'camisa', image_url: 'https://img.freepik.com/vetores-gratis/desenho-de-adesivo-com-camiseta-azul-isolada_1308-79625.jpg', xp_bonus: 15 },
    { name: 'Camiseta Vermelha Tour', category: 'camisa', image_url: 'https://static.vecteezy.com/system/resources/previews/003/532/204/non_2x/sticker-design-with-red-t-shirt-isolated-free-vector.jpg', xp_bonus: 15 },
    { name: 'Camiseta Studio Branca', category: 'camisa', image_url: 'https://static.vecteezy.com/system/resources/thumbnails/006/034/398/small_2x/sticker-white-t-shirt-with-coathanger-free-vector.jpg', xp_bonus: 15 },
    { name: 'Moletom Colmeia', category: 'camisa', image_url: 'https://th.bing.com/th/id/OIP.UL742fzpgA2pX35cdY-MgAHaHa?rs=1&pid=ImgDetMain', xp_bonus: 20 },
    { name: 'Jaqueta Néctar Dourada', category: 'camisa', image_url: 'https://th.bing.com/th/id/OIP.WlR4JaP6HPBjIfmq0pQ9LwHaGG?rs=1&pid=ImgDetMain', xp_bonus: 25 },
    { name: 'Camisa Clássica Vasco', category: 'camisa', image_url: 'https://static.shopvasco.com.br/produtos/camiseta-infantil-vasco-da-gama-recorte/06/425-8912-006/425-8912-006_zoom1.jpg?ts=1581420023&ims=1088x', xp_bonus: 30 },
    { name: 'Manto Rei da Colmeia', category: 'camisa', image_url: 'https://thumbs.dreamstime.com/z/composi%C3%A7%C3%A3o-realista-do-rei-cloak-manto-com-imagem-vestido-monarca-o-cetro-vermelho-real-e-ilustra%C3%A7%C3%A3o-vetor-de-bola-200482946.jpg', xp_bonus: 50 },
    { name: 'Óculos Indie Escuros', category: 'rosto', image_url: 'https://prints.ultracoloringpages.com/b052c464fc36c37388dfbe6082288d3d.png', xp_bonus: 20 },
    { name: 'Óculos Festival', category: 'rosto', image_url: 'https://th.bing.com/th/id/OIP.ylbodItlJPFQym6zWriM7QHaHa?rs=1&pid=ImgDetMain', xp_bonus: 20 },
    { name: 'Coroa Real de Mel', category: 'rosto', image_url: 'https://th.bing.com/th/id/OIP.NT-IKq8OjQHsY5cWkk9o-AHaHa?rs=1&pid=ImgDetMain', xp_bonus: 35 }
];

function ensureSongColumns() {
    const cols = db.prepare("PRAGMA table_info(songs)").all().map(c => c.name);
    const additions = [
        ['artist_bio', "TEXT DEFAULT 'Artista independente da cena autoral brasileira.'"],
        ['artist_city', "TEXT DEFAULT 'São Paulo, SP'"],
        ['instagram_url', "TEXT DEFAULT 'https://instagram.com'"],
        ['spotify_url', "TEXT DEFAULT 'https://open.spotify.com'"],
        ['soundcloud_url', "TEXT DEFAULT 'https://soundcloud.com'"],
        ['youtube_url', "TEXT DEFAULT 'https://youtube.com'"],
        ['support_link', "TEXT DEFAULT 'https://apoia.se'"],
        ['is_indie_spotlight', "INTEGER DEFAULT 0"]
    ];
    for (const [col, def] of additions) {
        if (!cols.includes(col)) {
            db.exec(`ALTER TABLE songs ADD COLUMN ${col} ${def};`);
        }
    }
}

function initDatabase() {
    const schemaSql = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schemaSql);
    ensureSongColumns();

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
            'Polinizando os melhores artistas indies da nossa colmeia.',
            'brasil',
            '/pictures/icons/profile.png'
        );
        defaultUserId = Number(info.lastInsertRowid);
    } else {
        const firstUser = db.prepare('SELECT id FROM users ORDER BY id ASC LIMIT 1').get();
        if (firstUser) defaultUserId = firstUser.id;
        db.prepare("UPDATE users SET bio = 'Polinizando os melhores artistas indies da nossa colmeia.' WHERE bio LIKE '%🐝%'").run();
    }

    // 2. Atualizar ou inserir catálogo de artistas indies
    const songCount = db.prepare('SELECT COUNT(*) as count FROM songs').get().count;
    if (songCount === 0) {
        const insertSong = db.prepare(`
            INSERT INTO songs (
                title, artist, album, genre, duration, release_year,
                cover_url, audio_url, category, plays,
                artist_bio, artist_city, instagram_url, spotify_url, soundcloud_url, youtube_url, support_link, is_indie_spotlight
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        CAPAS_CATALOG.forEach((item, idx) => {
            const mins = 2 + (idx % 3);
            const secs = String(15 + ((idx * 7) % 44)).padStart(2, '0');
            insertSong.run(
                item.title,
                item.artist,
                'Cena Indie Vol. ' + ((idx % 3) + 1),
                item.genre,
                `${mins}:${secs}`,
                2024 + (idx % 3),
                `/pictures/Capas/${item.file}`,
                '/audios/audio1.mp3',
                item.category,
                320 - idx * 7,
                item.bio,
                item.city,
                item.insta,
                'https://open.spotify.com',
                'https://soundcloud.com',
                'https://youtube.com',
                'https://apoia.se',
                item.spotlight || 0
            );
        });
    } else {
        // Atualizar metadados indies nas músicas iniciais para garantir que fiquem ricas
        const updateSong = db.prepare(`
            UPDATE songs
            SET title = ?, artist = ?, genre = ?, artist_bio = ?, artist_city = ?, instagram_url = ?, is_indie_spotlight = ?
            WHERE id = ?
        `);
        CAPAS_CATALOG.forEach((item, idx) => {
            updateSong.run(
                item.title,
                item.artist,
                item.genre,
                item.bio,
                item.city,
                item.insta,
                item.spotlight || 0,
                idx + 1
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
    const existingPet = db.prepare('SELECT id FROM pets WHERE user_id = ?').get(userId);
    if (!existingPet) {
        db.prepare(`
            INSERT INTO pets (user_id, name, xp, level, photo_url)
            VALUES (?, 'Buzzy Mel', 55, 2, '/pictures/FotosPets/FotoPet01.jpg')
        `).run(userId);
    }

    const playlistCount = db.prepare('SELECT COUNT(*) as count FROM playlists WHERE user_id = ?').get(userId).count;
    if (playlistCount === 0) {
        const insertPlaylist = db.prepare('INSERT INTO playlists (user_id, name, description) VALUES (?, ?, ?)');
        const insertPlaylistSong = db.prepare('INSERT OR IGNORE INTO playlist_songs (playlist_id, song_id, position) VALUES (?, ?, ?)');

        const p1 = Number(insertPlaylist.run(userId, 'Destaques da Cena Indie', 'Bandas e artistas independentes em alta na Colmeia').lastInsertRowid);
        [1, 2, 4, 5, 7, 8].forEach((songId, idx) => insertPlaylistSong.run(p1, songId, idx));

        const p2 = Number(insertPlaylist.run(userId, 'Bedroom Pop & Lo-Fi', 'Produções caseiras para relaxar e estudar').lastInsertRowid);
        [5, 11, 14, 19, 25, 29].forEach((songId, idx) => insertPlaylistSong.run(p2, songId, idx));

        const p3 = Number(insertPlaylist.run(userId, 'Garagem & Post-Punk Brasil', 'Guitarras reverberadas do underground nacional').lastInsertRowid);
        [2, 4, 18, 21, 28, 3].forEach((songId, idx) => insertPlaylistSong.run(p3, songId, idx));

        const insertLike = db.prepare('INSERT OR IGNORE INTO liked_songs (user_id, song_id) VALUES (?, ?)');
        [1, 2, 5, 8, 12].forEach(songId => insertLike.run(userId, songId));
    }
}

initDatabase();

module.exports = {
    db,
    hashPassword,
    ensureUserDefaults,
    DB_PATH
};
