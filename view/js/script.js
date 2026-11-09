// ============================================================================
// NectarNotes - Script Global e Cliente da API (SQLite + Fallback LocalStorage)
// ============================================================================

const DEFAULT_SONGS_FALLBACK = [
    { id: 1, title: 'Honeycomb Dreams', artist: 'Queen Bee', album: 'Colmeia Hits Vol. 1', genre: 'Pop', duration: '3:15', release_year: 2024, cover_url: '../../pictures/Capas/Capa01.webp', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 1 },
    { id: 2, title: 'Nectar Vibes', artist: 'The Pollinators', album: 'Colmeia Hits Vol. 2', genre: 'Indie', duration: '2:45', release_year: 2024, cover_url: '../../pictures/Capas/Capa02.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 0 },
    { id: 3, title: 'Golden Hive', artist: 'Buzz Light', album: 'Colmeia Hits Vol. 3', genre: 'Eletrônica', duration: '3:30', release_year: 2024, cover_url: '../../pictures/Capas/Capa03.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 1 },
    { id: 4, title: 'Sweet Stinger', artist: 'Apiary Club', album: 'Colmeia Hits Vol. 1', genre: 'Rock', duration: '4:05', release_year: 2023, cover_url: '../../pictures/Capas/Capa04.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 0 },
    { id: 5, title: 'Yellow Horizon', artist: 'Melodia Real', album: 'Colmeia Hits Vol. 2', genre: 'Lo-Fi', duration: '2:50', release_year: 2024, cover_url: '../../pictures/Capas/Capa05.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 1 },
    { id: 6, title: 'Midnight Swarm', artist: 'Zangão Beats', album: 'Colmeia Hits Vol. 3', genre: 'Hip-Hop', duration: '3:20', release_year: 2024, cover_url: '../../pictures/Capas/Capa06.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 0 },
    { id: 7, title: 'Pollen Storm', artist: 'Flora & Fauna', album: 'Colmeia Hits Vol. 1', genre: 'Indie Rock', duration: '3:40', release_year: 2023, cover_url: '../../pictures/Capas/Capa07.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 0 },
    { id: 8, title: 'Royal Jelly', artist: 'Abelha Rainha', album: 'Colmeia Hits Vol. 2', genre: 'R&B', duration: '3:12', release_year: 2024, cover_url: '../../pictures/Capas/Capa08.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 1 },
    { id: 9, title: 'Flowers in Bloom', artist: 'Jardim Secreto', album: 'Colmeia Hits Vol. 3', genre: 'MPB', duration: '3:55', release_year: 2024, cover_url: '../../pictures/Capas/Capa09.webp', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 0 },
    { id: 10, title: 'Buzzing Around', artist: 'Colmeia Sonora', album: 'Colmeia Hits Vol. 1', genre: 'Pop', duration: '2:58', release_year: 2024, cover_url: '../../pictures/Capas/Capa10.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', liked: 0 },
    { id: 11, title: 'Amber Drops', artist: 'Nectar Collective', album: 'Colmeia Hits Vol. 2', genre: 'Jazz', duration: '4:10', release_year: 2023, cover_url: '../../pictures/Capas/Capa11.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 0 },
    { id: 12, title: 'Sunlit Meadow', artist: 'Asas Douradas', album: 'Colmeia Hits Vol. 3', genre: 'Folk', duration: '3:25', release_year: 2024, cover_url: '../../pictures/Capas/Capa12.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 1 },
    { id: 13, title: 'Hexagon Rhythm', artist: 'SynthHive', album: 'Colmeia Hits Vol. 1', genre: 'Synthwave', duration: '3:48', release_year: 2024, cover_url: '../../pictures/Capas/Capa13.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 0 },
    { id: 14, title: 'Wildflower Nectar', artist: 'Bumblebee', album: 'Colmeia Hits Vol. 2', genre: 'Indie Pop', duration: '3:05', release_year: 2024, cover_url: '../../pictures/Capas/Capa14.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 0 },
    { id: 15, title: 'Flight of the Bee', artist: 'Orquestra Real', album: 'Colmeia Hits Vol. 3', genre: 'Clássica', duration: '2:35', release_year: 2022, cover_url: '../../pictures/Capas/Capa15.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 0 },
    { id: 16, title: 'Honey Drip', artist: 'DJ Colmeia', album: 'Colmeia Hits Vol. 1', genre: 'Trap', duration: '3:18', release_year: 2024, cover_url: '../../pictures/Capas/Capa16.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 0 },
    { id: 17, title: 'Wax & Gold', artist: 'Favos de Mel', album: 'Colmeia Hits Vol. 2', genre: 'Soul', duration: '3:44', release_year: 2023, cover_url: '../../pictures/Capas/capa17.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 0 },
    { id: 18, title: 'Queen\'s Crown', artist: 'Monarca', album: 'Colmeia Hits Vol. 3', genre: 'Rock', duration: '3:52', release_year: 2024, cover_url: '../../pictures/Capas/capa18.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', liked: 0 },
    { id: 19, title: 'Breeze in the Hive', artist: 'Vento Sul', album: 'Colmeia Hits Vol. 1', genre: 'Chill', duration: '3:10', release_year: 2024, cover_url: '../../pictures/Capas/capa19.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 20, title: 'Nectar Notes Theme', artist: 'NectarNotes Official', album: 'Colmeia Hits Vol. 2', genre: 'Soundtrack', duration: '3:45', release_year: 2024, cover_url: '../../pictures/Capas/capa20.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 21, title: 'Doce Veneno', artist: 'Vespa Negra', album: 'Colmeia Hits Vol. 3', genre: 'Hard Rock', duration: '4:02', release_year: 2023, cover_url: '../../pictures/Capas/capa21.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 22, title: 'Pólen de Estrelas', artist: 'Cosmos', album: 'Colmeia Hits Vol. 1', genre: 'Ambient', duration: '3:33', release_year: 2024, cover_url: '../../pictures/Capas/capa22.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 23, title: 'Dança das Abelhas', artist: 'Trio Colmeia', album: 'Colmeia Hits Vol. 2', genre: 'Forró', duration: '2:55', release_year: 2024, cover_url: '../../pictures/Capas/capa23.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 24, title: 'Sol de Primavera', artist: 'Girassol', album: 'Colmeia Hits Vol. 3', genre: 'Acústico', duration: '3:22', release_year: 2024, cover_url: '../../pictures/Capas/capa24.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 25, title: 'Noite na Floresta', artist: 'Eco Verde', album: 'Colmeia Hits Vol. 1', genre: 'Lo-Fi', duration: '3:08', release_year: 2023, cover_url: '../../pictures/Capas/capa25.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 26, title: 'Zumbido Urbano', artist: 'Metrópole', album: 'Colmeia Hits Vol. 2', genre: 'Rap', duration: '3:29', release_year: 2024, cover_url: '../../pictures/Capas/capa26.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 27, title: 'Mel Puro', artist: 'Essência', album: 'Colmeia Hits Vol. 3', genre: 'MPB', duration: '3:50', release_year: 2024, cover_url: '../../pictures/Capas/capa27.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 28, title: 'Céu Dourado', artist: 'Horizonte', album: 'Colmeia Hits Vol. 1', genre: 'Pop Rock', duration: '3:16', release_year: 2024, cover_url: '../../pictures/Capas/Capa28.png', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 29, title: 'Jardim de Inverno', artist: 'Outono', album: 'Colmeia Hits Vol. 2', genre: 'Indie', duration: '3:41', release_year: 2023, cover_url: '../../pictures/Capas/capa29.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 },
    { id: 30, title: 'Raio de Sol', artist: 'Luz', album: 'Colmeia Hits Vol. 3', genre: 'Pop', duration: '2:49', release_year: 2024, cover_url: '../../pictures/Capas/Capa30.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', liked: 0 }
];

function resolveAssetUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    const isInViewHtml = window.location.pathname.includes('/view/html/');
    const cleanPath = url.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
    return isInViewHtml ? `../../${cleanPath}` : `${cleanPath}`;
}

function handleButtonClick(buttonId) {
    console.log('Navegação NectarNotes:', buttonId);
}

function playMusic(cardElement, event) {
    if (event && event.target && event.target.closest('.btn-open-song')) {
        return;
    }
    const audio = cardElement.querySelector('.AudioMusica');
    if (!audio) return;

    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        cardElement.classList.remove('playing');
    } else {
        document.querySelectorAll('.AudioMusica').forEach(el => {
            el.pause();
            el.currentTime = 0;
        });
        document.querySelectorAll('.CardMusic.playing').forEach(el => {
            el.classList.remove('playing');
        });
        audio.play().catch(err => console.warn('Erro ao reproduzir áudio:', err));
        cardElement.classList.add('playing');
    }
}

const NectarAPI = {
    getCurrentUserId() {
        const stored = localStorage.getItem('userId');
        return stored ? Number(stored) : 1;
    },

    saveUserSession(user) {
        if (!user) return;
        localStorage.setItem('userId', String(user.id || 1));
        localStorage.setItem('username', user.username || 'AbelhaRainha');
        localStorage.setItem('email', user.email || 'rainha@nectarnotes.com');
        localStorage.setItem('bio', user.bio || 'Explorando a colmeia de melodias no NectarNotes 🐝');
        localStorage.setItem('country', user.country || 'brasil');
        if (user.profile_pic) {
            localStorage.setItem('profilePic', user.profile_pic);
        }
    },

    async getSongs(params = {}) {
        try {
            const query = new URLSearchParams({
                userId: this.getCurrentUserId(),
                ...params
            });
            const res = await fetch(`/api/songs?${query.toString()}`);
            if (res.ok) {
                const songs = await res.json();
                return songs.map(s => ({
                    ...s,
                    cover_url: resolveAssetUrl(s.cover_url),
                    audio_url: resolveAssetUrl(s.audio_url)
                }));
            }
        } catch (_) {
            // Fallback offline/LiveServer
        }

        let songs = [...DEFAULT_SONGS_FALLBACK];
        if (params.category) {
            songs = songs.filter(s => s.category === params.category);
        }
        if (params.search) {
            const q = params.search.toLowerCase();
            songs = songs.filter(s =>
                s.title.toLowerCase().includes(q) ||
                s.artist.toLowerCase().includes(q) ||
                s.genre.toLowerCase().includes(q)
            );
        }
        return songs;
    },

    async getSongById(id) {
        try {
            const res = await fetch(`/api/songs/${id}?userId=${this.getCurrentUserId()}`);
            if (res.ok) {
                const s = await res.json();
                return {
                    ...s,
                    cover_url: resolveAssetUrl(s.cover_url),
                    audio_url: resolveAssetUrl(s.audio_url)
                };
            }
        } catch (_) {}
        return DEFAULT_SONGS_FALLBACK.find(s => s.id === Number(id)) || DEFAULT_SONGS_FALLBACK[0];
    },

    async toggleLikeSong(songId) {
        try {
            const res = await fetch(`/api/songs/${songId}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: this.getCurrentUserId() })
            });
            if (res.ok) return await res.json();
        } catch (_) {}
        const likedIds = JSON.parse(localStorage.getItem('likedSongIds') || '[1,3,5,8,12]');
        const idx = likedIds.indexOf(Number(songId));
        if (idx >= 0) {
            likedIds.splice(idx, 1);
            localStorage.setItem('likedSongIds', JSON.stringify(likedIds));
            return { liked: false };
        } else {
            likedIds.push(Number(songId));
            localStorage.setItem('likedSongIds', JSON.stringify(likedIds));
            return { liked: true };
        }
    }
};

window.NectarAPI = NectarAPI;
window.handleButtonClick = handleButtonClick;
window.playMusic = playMusic;
window.resolveAssetUrl = resolveAssetUrl;

function bindSearchInputs(root = document) {
    const inputs = root.querySelectorAll('.group .input, #searchInput');
    inputs.forEach(input => {
        if (input.dataset.searchBound) return;
        input.dataset.searchBound = 'true';
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const q = input.value.trim();
                const isInViewHtml = window.location.pathname.includes('/view/html/');
                const target = isInViewHtml ? 'resultado.html' : 'view/html/resultado.html';
                window.location.href = `${target}?q=${encodeURIComponent(q)}`;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bindSearchInputs(document);
});
