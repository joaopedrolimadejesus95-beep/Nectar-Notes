-- ============================================================================
-- NectarNotes - Esquema do Banco de Dados (SQLite) + Vitrine de Artistas Indies
-- ============================================================================

PRAGMA foreign_keys = ON;

-- 1. Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    bio TEXT DEFAULT 'Polinizador de músicas independentes no NectarNotes 🐝',
    country TEXT DEFAULT 'brasil',
    profile_pic TEXT DEFAULT '/pictures/icons/profile.png',
    banner_color TEXT DEFAULT '#fbff00',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Músicas e Divulgação de Artistas Indies
CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT DEFAULT 'Cena Indie Colmeia',
    genre TEXT DEFAULT 'Indie',
    duration TEXT DEFAULT '3:45',
    release_year INTEGER DEFAULT 2026,
    cover_url TEXT NOT NULL,
    audio_url TEXT NOT NULL DEFAULT '/audios/audio1.mp3',
    category TEXT DEFAULT 'em_alta', -- 'em_alta', 'recomendados', 'recentes'
    plays INTEGER DEFAULT 0,
    artist_bio TEXT DEFAULT 'Artista independente da cena autoral brasileira, trazendo sonoridades autênticas para a Colmeia.',
    artist_city TEXT DEFAULT 'São Paulo, SP',
    instagram_url TEXT DEFAULT 'https://instagram.com',
    spotify_url TEXT DEFAULT 'https://open.spotify.com',
    soundcloud_url TEXT DEFAULT 'https://soundcloud.com',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    support_link TEXT DEFAULT 'https://apoia.se',
    is_indie_spotlight INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Playlists
CREATE TABLE IF NOT EXISTS playlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Relação Músicas nas Playlists
CREATE TABLE IF NOT EXISTS playlist_songs (
    playlist_id INTEGER NOT NULL,
    song_id INTEGER NOT NULL,
    position INTEGER DEFAULT 0,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

-- 5. Músicas Curtidas ("Adicionadas à Colmeia")
CREATE TABLE IF NOT EXISTS liked_songs (
    user_id INTEGER NOT NULL,
    song_id INTEGER NOT NULL,
    liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, song_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

-- 6. Itens e Acessórios de Pets
CREATE TABLE IF NOT EXISTS pet_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'camisa' ou 'rosto'
    image_url TEXT NOT NULL,
    xp_bonus INTEGER DEFAULT 10
);

-- 7. Pets dos Usuários
CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL DEFAULT 'Buzzy Mel',
    xp INTEGER NOT NULL DEFAULT 55,
    level INTEGER NOT NULL DEFAULT 2,
    photo_url TEXT NOT NULL DEFAULT '/pictures/FotosPets/FotoPet01.jpg',
    equipped_shirt_id INTEGER,
    equipped_face_id INTEGER,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (equipped_shirt_id) REFERENCES pet_items(id) ON DELETE SET NULL,
    FOREIGN KEY (equipped_face_id) REFERENCES pet_items(id) ON DELETE SET NULL
);

-- Índices para buscas rápidas
CREATE INDEX IF NOT EXISTS idx_songs_category ON songs(category);
CREATE INDEX IF NOT EXISTS idx_songs_title ON songs(title);
CREATE INDEX IF NOT EXISTS idx_songs_artist ON songs(artist);
CREATE INDEX IF NOT EXISTS idx_playlists_user ON playlists(user_id);
