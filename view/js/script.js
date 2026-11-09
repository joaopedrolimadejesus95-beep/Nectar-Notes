// ============================================================================
// NectarNotes - Script Global, Mini-Player Persistente & Vitrine Indie
// ============================================================================

const DEFAULT_SONGS_FALLBACK = [
    { id: 1, title: 'Honeycomb Dreams', artist: 'Luna & Os Polinizadores', album: 'Cena Indie Vol. 1', genre: 'Indie Pop', duration: '3:15', release_year: 2026, cover_url: '../../pictures/Capas/Capa01.webp', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 320, liked: 1, artist_city: 'São Paulo, SP', artist_bio: 'Banda independente de Dream Pop e Indie formada em garagens paulistanas, misturando sintetizadores quentes com letras poéticas.', instagram_url: 'https://instagram.com/lunaeospolinizadores', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 1 },
    { id: 2, title: 'Néctar da Meia-Noite', artist: 'Cais Distante', album: 'Cena Indie Vol. 2', genre: 'Indie Rock', duration: '2:45', release_year: 2026, cover_url: '../../pictures/Capas/Capa02.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 310, liked: 0, artist_city: 'Curitiba, PR', artist_bio: 'Quarteto autoral de Indie Rock alternativo com guitarras reverberadas e batidas intensas.', instagram_url: 'https://instagram.com/caisdistante', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 3, title: 'Colmeia Elétrica', artist: 'Zangão Synth', album: 'Cena Indie Vol. 3', genre: 'Synthwave', duration: '3:30', release_year: 2026, cover_url: '../../pictures/Capas/Capa03.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 298, liked: 1, artist_city: 'Belo Horizonte, MG', artist_bio: 'Produtor independente de música eletrônica analógica e synthwave brasileiro.', instagram_url: 'https://instagram.com/zangaosynth', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 4, title: 'Doce Ferrão', artist: 'Garagem 404', album: 'Cena Indie Vol. 1', genre: 'Post-Punk / Indie', duration: '4:05', release_year: 2025, cover_url: '../../pictures/Capas/Capa04.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 285, liked: 0, artist_city: 'Porto Alegre, RS', artist_bio: 'Trio underground gaúcho com forte influência do post-punk anos 80 e rock de garagem.', instagram_url: 'https://instagram.com/garagem404', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 5, title: 'Horizonte Amarelo', artist: 'Clarice no Quarto', album: 'Cena Indie Vol. 2', genre: 'Bedroom Pop', duration: '2:50', release_year: 2026, cover_url: '../../pictures/Capas/Capa05.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 276, liked: 1, artist_city: 'Recife, PE', artist_bio: 'Artista solo de Bedroom Pop e Lo-Fi que grava e produz todas as suas faixas em seu home studio.', instagram_url: 'https://instagram.com/claricenoquarto', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 6, title: 'Enxame Urbano', artist: 'MC Favos & DJ Mel', album: 'Cena Indie Vol. 3', genre: 'Boom Bap / Rap Indie', duration: '3:20', release_year: 2026, cover_url: '../../pictures/Capas/Capa06.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 265, liked: 0, artist_city: 'São Paulo, SP', artist_bio: 'Dupla independente de rap autoral combinando samples de jazz brasileiro com poesia marginal.', instagram_url: 'https://instagram.com/enxameurbano', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 7, title: 'Tempestade de Pólen', artist: 'Flora Selvagem', album: 'Cena Indie Vol. 1', genre: 'MPB Alternativo', duration: '3:40', release_year: 2025, cover_url: '../../pictures/Capas/Capa07.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 254, liked: 0, artist_city: 'Salvador, BA', artist_bio: 'Projeto autoral que une percussão orgânica baiana com guitarras psicodélicas.', instagram_url: 'https://instagram.com/floraselvagem', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 8, title: 'Geleia Real Sessions', artist: 'Abelha Rainha', album: 'Cena Indie Vol. 2', genre: 'Neo-Soul / R&B', duration: '3:12', release_year: 2026, cover_url: '../../pictures/Capas/Capa08.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 248, liked: 1, artist_city: 'Rio de Janeiro, RJ', artist_bio: 'Cantora e compositora independente da cena Neo-Soul carioca.', instagram_url: 'https://instagram.com/abelharainhasoul', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 9, title: 'Jardim de Concreto', artist: 'Subúrbio Solar', album: 'Cena Indie Vol. 3', genre: 'Indie Folk', duration: '3:55', release_year: 2026, cover_url: '../../pictures/Capas/Capa09.webp', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 235, liked: 0, artist_city: 'Fortaleza, CE', artist_bio: 'Canções acústicas sobre o cotidiano jovem, gravadas de forma 100% independente.', instagram_url: 'https://instagram.com/suburbiosolar', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 10, title: 'Zumbido na Frequência', artist: 'Rádio Colmeia', album: 'Cena Indie Vol. 1', genre: 'Alt-Pop', duration: '2:58', release_year: 2026, cover_url: '../../pictures/Capas/Capa10.jpg', audio_url: '../../audios/audio1.mp3', category: 'em_alta', plays: 229, liked: 0, artist_city: 'Brasília, DF', artist_bio: 'Coletivo audiovisual e musical independente focado em experimentações pop.', instagram_url: 'https://instagram.com/radiocolmeia', spotify_url: 'https://open.spotify.com', soundcloud_url: 'https://soundcloud.com', youtube_url: 'https://youtube.com', support_link: 'https://apoia.se', is_indie_spotlight: 0 },
    { id: 11, title: 'Gotas de Âmbar', artist: 'Nectar Jazz Trio', album: 'Cena Indie Vol. 2', genre: 'Nu-Jazz / Lo-Fi', duration: '4:10', release_year: 2025, cover_url: '../../pictures/Capas/Capa11.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 215, liked: 0, artist_city: 'São Paulo, SP', artist_bio: 'Instrumental independente misturando jazz contemporâneo com batidas de lo-fi hip-hop.', instagram_url: 'https://instagram.com/nectarjazztrio' },
    { id: 12, title: 'Manhã de Girassóis', artist: 'Asas Douradas', album: 'Cena Indie Vol. 3', genre: 'Folk Brasil', duration: '3:25', release_year: 2026, cover_url: '../../pictures/Capas/Capa12.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 204, liked: 1, artist_city: 'Goiânia, GO', artist_bio: 'Duo de vozes e violões trazendo uma nova roupagem para o folk brasileiro.', instagram_url: 'https://instagram.com/asasdouradas' },
    { id: 13, title: 'Hexágono Neon', artist: 'CyberAbelha', album: 'Cena Indie Vol. 1', genre: 'Retrowave', duration: '3:48', release_year: 2026, cover_url: '../../pictures/Capas/Capa13.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 198, liked: 0, artist_city: 'Campinas, SP', artist_bio: 'Projeto solo de trilhas sonoras eletrônicas e synthpop independente.', instagram_url: 'https://instagram.com/cyberabelha' },
    { id: 14, title: 'Flor do Campo', artist: 'Bumblebee Indie', album: 'Cena Indie Vol. 2', genre: 'Shoegaze / Dream Pop', duration: '3:05', release_year: 2026, cover_url: '../../pictures/Capas/Capa14.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 190, liked: 0, artist_city: 'Florianópolis, SC', artist_bio: 'Paredes de guitarra etéreas e vocais suaves direto da cena indie catarinense.', instagram_url: 'https://instagram.com/bumblebeeindie' },
    { id: 15, title: 'Voo da Rainha', artist: 'Orquestra de Bolso', album: 'Cena Indie Vol. 3', genre: 'Instrumental', duration: '2:35', release_year: 2024, cover_url: '../../pictures/Capas/Capa15.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 184, liked: 0, artist_city: 'Ouro Preto, MG', artist_bio: 'Grupo independente de música de câmara moderna e trilhas cinematográficas.', instagram_url: 'https://instagram.com/orquestradebolso' },
    { id: 16, title: 'Mel Destilado', artist: 'Koda 011', album: 'Cena Indie Vol. 1', genre: 'Trap Alternativo', duration: '3:18', release_year: 2026, cover_url: '../../pictures/Capas/Capa16.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 176, liked: 0, artist_city: 'São Paulo, SP', artist_bio: 'Artista independente explorando timbres melódicos no trap e R&B.', instagram_url: 'https://instagram.com/koda011' },
    { id: 17, title: 'Cera Quente', artist: 'Vinil de Garagem', album: 'Cena Indie Vol. 2', genre: 'Soul / Funk Indie', duration: '3:44', release_year: 2025, cover_url: '../../pictures/Capas/capa17.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 170, liked: 0, artist_city: 'São Paulo, SP', artist_bio: 'Grooves analógicos, baixo marcante e metais gravados ao vivo.', instagram_url: 'https://instagram.com/vinildegaragem' },
    { id: 18, title: 'Coroa de Espinhos e Mel', artist: 'Monarca Underground', album: 'Cena Indie Vol. 3', genre: 'Indie Rock', duration: '3:52', release_year: 2026, cover_url: '../../pictures/Capas/capa18.jpg', audio_url: '../../audios/audio1.mp3', category: 'recomendados', plays: 165, liked: 0, artist_city: 'Niterói, RJ', artist_bio: 'Rock alternativo com letras fortes sobre a vida nas grandes cidades.', instagram_url: 'https://instagram.com/monarcaunderground' },
    { id: 19, title: 'Brisa da Colmeia', artist: 'Vento Sul', album: 'Cena Indie Vol. 1', genre: 'Chillhop', duration: '3:10', release_year: 2026, cover_url: '../../pictures/Capas/capa19.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 158, liked: 0, artist_city: 'Pelotas, RS', artist_bio: 'Beats relaxantes para estudar, programar e desacelerar.', instagram_url: 'https://instagram.com/ventosulbeats' },
    { id: 20, title: 'Hino NectarNotes', artist: 'Coletivo APS', album: 'Cena Indie Vol. 2', genre: 'Indie / Tema', duration: '3:45', release_year: 2026, cover_url: '../../pictures/Capas/capa20.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 152, liked: 0, artist_city: 'Brasil', artist_bio: 'Faixa oficial criada para celebrar os artistas independentes da comunidade NectarNotes.', instagram_url: 'https://instagram.com/nectarnotes' },
    { id: 21, title: 'Vespa Noturna', artist: 'Voltagem Baixa', album: 'Cena Indie Vol. 3', genre: 'Garage Rock', duration: '4:02', release_year: 2025, cover_url: '../../pictures/Capas/capa21.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 145, liked: 0, artist_city: 'Santo André, SP', artist_bio: 'Riffs crus e bateria energética da cena independente do ABC Paulista.', instagram_url: 'https://instagram.com/voltagembaixa' },
    { id: 22, title: 'Pólen Estelar', artist: 'Nebulosa Indie', album: 'Cena Indie Vol. 1', genre: 'Ambient / Post-Rock', duration: '3:33', release_year: 2026, cover_url: '../../pictures/Capas/capa22.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 140, liked: 0, artist_city: 'Brasília, DF', artist_bio: 'Paisagens sonoras espaciais criadas com pedais de delay e sintetizadores.', instagram_url: 'https://instagram.com/nebulosaindie' },
    { id: 23, title: 'Baião da Colmeia', artist: 'Trio Mandacaru', album: 'Cena Indie Vol. 2', genre: 'Forró Indie', duration: '2:55', release_year: 2026, cover_url: '../../pictures/Capas/capa23.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 132, liked: 0, artist_city: 'João Pessoa, PB', artist_bio: 'Fusão moderna de baião tradicional com guitarras indie e synths.', instagram_url: 'https://instagram.com/triomandacaru' },
    { id: 24, title: 'Tarde de Sol', artist: 'Girassol Acústico', album: 'Cena Indie Vol. 3', genre: 'MPB / Folk', duration: '3:22', release_year: 2026, cover_url: '../../pictures/Capas/capa24.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 128, liked: 0, artist_city: 'Vitória, ES', artist_bio: 'Canções solares à beira-mar com voz, violão e trompete.', instagram_url: 'https://instagram.com/girassolacustico' },
    { id: 25, title: 'Madrugada Lo-Fi', artist: 'Café & Mel', album: 'Cena Indie Vol. 1', genre: 'Lo-Fi Beats', duration: '3:08', release_year: 2025, cover_url: '../../pictures/Capas/capa25.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 121, liked: 0, artist_city: 'São Paulo, SP', artist_bio: 'Beatmaker independente focado em texturas de fita cassete e chuva.', instagram_url: 'https://instagram.com/cafeemelbeats' },
    { id: 26, title: 'Ruas de Ouro', artist: 'Verso Livre', album: 'Cena Indie Vol. 2', genre: 'Rap Acústico', duration: '3:29', release_year: 2026, cover_url: '../../pictures/Capas/capa26.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 118, liked: 0, artist_city: 'Guarulhos, SP', artist_bio: 'Rimador independente unindo poesia falada e violão de sete cordas.', instagram_url: 'https://instagram.com/versolivre' },
    { id: 27, title: 'Essência Pura', artist: 'Marina Luz', album: 'Cena Indie Vol. 3', genre: 'Nova MPB', duration: '3:50', release_year: 2026, cover_url: '../../pictures/Capas/capa27.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 112, liked: 0, artist_city: 'Belo Horizonte, MG', artist_bio: 'Cantautora mineira com foco em arranjos minimalistas e intimistas.', instagram_url: 'https://instagram.com/marinaluzmpb' },
    { id: 28, title: 'Céu de Fim de Tarde', artist: 'Horizonte Perdido', album: 'Cena Indie Vol. 1', genre: 'Midwest Emo / Indie', duration: '3:16', release_year: 2026, cover_url: '../../pictures/Capas/Capa28.png', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 108, liked: 0, artist_city: 'Sorocaba, SP', artist_bio: 'Guitarras dedilhadas e letras sinceras da cena emo/indie do interior.', instagram_url: 'https://instagram.com/horizonteperdido' },
    { id: 29, title: 'Folhas de Outono', artist: 'Quarto de Hóspedes', album: 'Cena Indie Vol. 2', genre: 'Bedroom Indie', duration: '3:41', release_year: 2025, cover_url: '../../pictures/Capas/capa29.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 102, liked: 0, artist_city: 'Curitiba, PR', artist_bio: 'Gravações caseiras cheias de personalidade e nostalgia.', instagram_url: 'https://instagram.com/quartodehospedes' },
    { id: 30, title: 'Frequência Solar', artist: 'Prisma Tropical', album: 'Cena Indie Vol. 3', genre: 'Indie Pop Brasil', duration: '2:49', release_year: 2026, cover_url: '../../pictures/Capas/Capa30.jpg', audio_url: '../../audios/audio1.mp3', category: 'recentes', plays: 98, liked: 0, artist_city: 'Natal, RN', artist_bio: 'Grooves tropicais e refrões marcantes da cena independente nordestina.', instagram_url: 'https://instagram.com/prismatropical' }
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

function showNectarToast(message) {
    let toast = document.getElementById('nectarToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'nectarToast';
        toast.className = 'nectar-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
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
        localStorage.setItem('bio', user.bio || 'Polinizando os melhores artistas indies da nossa colmeia! 🐝🍯');
        localStorage.setItem('country', user.country || 'brasil');
        if (user.profile_pic) {
            localStorage.setItem('profilePic', user.profile_pic);
        }
    },

    getLocalCustomSongs() {
        try {
            return JSON.parse(localStorage.getItem('nectarCustomIndieSongs') || '[]');
        } catch (_) {
            return [];
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
        } catch (_) {}

        let songs = [...this.getLocalCustomSongs(), ...DEFAULT_SONGS_FALLBACK].map(s => ({
            ...s,
            cover_url: resolveAssetUrl(s.cover_url),
            audio_url: resolveAssetUrl(s.audio_url)
        }));

        if (params.category) {
            songs = songs.filter(s => s.category === params.category);
        }
        if (params.genre) {
            const g = params.genre.toLowerCase();
            songs = songs.filter(s => (s.genre || '').toLowerCase().includes(g));
        }
        if (params.search) {
            const q = params.search.toLowerCase();
            songs = songs.filter(s =>
                s.title.toLowerCase().includes(q) ||
                s.artist.toLowerCase().includes(q) ||
                (s.genre || '').toLowerCase().includes(q) ||
                (s.artist_city || '').toLowerCase().includes(q)
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
        const all = [...this.getLocalCustomSongs(), ...DEFAULT_SONGS_FALLBACK];
        const found = all.find(s => s.id === Number(id)) || DEFAULT_SONGS_FALLBACK[0];
        return {
            ...found,
            cover_url: resolveAssetUrl(found.cover_url),
            audio_url: resolveAssetUrl(found.audio_url)
        };
    },

    async createIndieSong(payload) {
        try {
            const res = await fetch('/api/songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                return await res.json();
            }
        } catch (_) {}

        const custom = this.getLocalCustomSongs();
        const newSong = {
            id: Date.now(),
            title: payload.title,
            artist: payload.artist,
            genre: payload.genre || 'Indie',
            duration: '3:30',
            release_year: 2026,
            cover_url: payload.cover_url || '/pictures/Capas/Capa01.webp',
            audio_url: '/audios/audio1.mp3',
            category: 'em_alta',
            plays: 50,
            liked: 1,
            artist_city: payload.artist_city || 'Brasil',
            artist_bio: payload.artist_bio || 'Artista independente da Colmeia.',
            instagram_url: payload.instagram_url || 'https://instagram.com',
            spotify_url: payload.spotify_url || 'https://open.spotify.com',
            soundcloud_url: payload.soundcloud_url || 'https://soundcloud.com',
            youtube_url: payload.youtube_url || 'https://youtube.com',
            support_link: payload.support_link || 'https://apoia.se',
            is_indie_spotlight: 1
        };
        custom.unshift(newSong);
        localStorage.setItem('nectarCustomIndieSongs', JSON.stringify(custom));
        return newSong;
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
        const likedIds = JSON.parse(localStorage.getItem('likedSongIds') || '[1,2,5,8,12]');
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
    },

    async recordPlay(songId) {
        try {
            await fetch(`/api/songs/${songId}/play`, { method: 'POST' });
        } catch (_) {}
    }
};

// ============================================================================
// Mini-Player Persistente Global + Controle de Áudio
// ============================================================================
let globalAudio = null;
let currentPlayingSong = null;

function ensureMiniPlayer() {
    const isAuthPage = window.location.pathname.endsWith('/index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.includes('TelaCadastro.html') ||
        window.location.pathname.includes('iframedatelademusica.html');
    if (isAuthPage) return null;

    let playerEl = document.getElementById('nectarMiniPlayer');
    if (playerEl) return playerEl;

    globalAudio = new Audio(resolveAssetUrl('/audios/audio1.mp3'));
    currentPlayingSong = DEFAULT_SONGS_FALLBACK[0];

    playerEl = document.createElement('div');
    playerEl.id = 'nectarMiniPlayer';
    playerEl.className = 'nectar-mini-player';
    playerEl.innerHTML = `
        <div class="mp-left">
            <img id="mpCover" class="mp-cover" src="${resolveAssetUrl(currentPlayingSong.cover_url)}" alt="Capa">
            <div class="mp-meta">
                <div id="mpTitle" class="mp-title">${currentPlayingSong.title}</div>
                <div id="mpArtist" class="mp-artist">🐝 ${currentPlayingSong.artist} • ${currentPlayingSong.artist_city || 'Cena Indie'}</div>
            </div>
        </div>
        <div class="mp-center">
            <div class="mp-controls">
                <button class="mp-btn" title="Faixa Anterior" onclick="skipMiniPlayer(-1)">⏮</button>
                <button id="mpPlayBtn" class="mp-btn-play" title="Tocar / Pausar" onclick="toggleMiniPlayer()">▶</button>
                <button class="mp-btn" title="Próxima Faixa" onclick="skipMiniPlayer(1)">⏭</button>
            </div>
            <div class="mp-progress-wrap">
                <span id="mpCurrentTime">0:00</span>
                <input id="mpProgress" type="range" class="mp-progress-bar" min="0" max="100" value="0">
                <span id="mpDuration">3:15</span>
            </div>
        </div>
        <div class="mp-right">
            <button class="mp-action-pill" onclick="shareCurrentSong()" title="Copiar link para divulgar artista">🔗 Divulgar</button>
            <a id="mpArtistLink" class="mp-action-pill" href="${resolveAssetUrl('view/html/telademusica.html')}?id=1">✨ Ver Artista</a>
        </div>
    `;
    document.body.appendChild(playerEl);

    const progress = playerEl.querySelector('#mpProgress');
    globalAudio.addEventListener('timeupdate', () => {
        if (!globalAudio.duration) return;
        progress.value = (globalAudio.currentTime / globalAudio.duration) * 100;
        const mins = Math.floor(globalAudio.currentTime / 60);
        const secs = String(Math.floor(globalAudio.currentTime % 60)).padStart(2, '0');
        document.getElementById('mpCurrentTime').textContent = `${mins}:${secs}`;
    });

    progress.addEventListener('input', () => {
        if (globalAudio.duration) {
            globalAudio.currentTime = (progress.value / 100) * globalAudio.duration;
        }
    });

    globalAudio.addEventListener('ended', () => {
        document.getElementById('mpPlayBtn').textContent = '▶';
    });

    return playerEl;
}

function updateMiniPlayerSong(song, autoPlay = true) {
    ensureMiniPlayer();
    if (!song || !globalAudio) return;
    currentPlayingSong = song;

    const coverEl = document.getElementById('mpCover');
    const titleEl = document.getElementById('mpTitle');
    const artistEl = document.getElementById('mpArtist');
    const linkEl = document.getElementById('mpArtistLink');
    const playBtn = document.getElementById('mpPlayBtn');

    if (coverEl) coverEl.src = resolveAssetUrl(song.cover_url);
    if (titleEl) titleEl.textContent = song.title;
    if (artistEl) artistEl.textContent = `🐝 ${song.artist} • ${song.artist_city || song.genre || 'Cena Indie'}`;
    if (linkEl) {
        const isInView = window.location.pathname.includes('/view/html/');
        linkEl.href = `${isInView ? 'telademusica.html' : 'view/html/telademusica.html'}?id=${song.id}`;
    }

    const targetAudio = resolveAssetUrl(song.audio_url || '/audios/audio1.mp3');
    if (globalAudio.src !== new URL(targetAudio, window.location.href).href) {
        globalAudio.src = targetAudio;
    }

    if (autoPlay) {
        globalAudio.play().catch(() => {});
        if (playBtn) playBtn.textContent = '⏸';
        NectarAPI.recordPlay(song.id);
    }
}

function toggleMiniPlayer() {
    ensureMiniPlayer();
    if (!globalAudio) return;
    const playBtn = document.getElementById('mpPlayBtn');
    if (globalAudio.paused) {
        globalAudio.play().catch(() => {});
        if (playBtn) playBtn.textContent = '⏸';
    } else {
        globalAudio.pause();
        if (playBtn) playBtn.textContent = '▶';
    }
}

function skipMiniPlayer(dir) {
    if (!currentPlayingSong) return;
    const curIdx = DEFAULT_SONGS_FALLBACK.findIndex(s => s.id === Number(currentPlayingSong.id));
    const nextIdx = (curIdx + dir + DEFAULT_SONGS_FALLBACK.length) % DEFAULT_SONGS_FALLBACK.length;
    updateMiniPlayerSong(DEFAULT_SONGS_FALLBACK[nextIdx], true);
}

function shareCurrentSong(songId) {
    const id = songId || (currentPlayingSong ? currentPlayingSong.id : 1);
    const isInView = window.location.pathname.includes('/view/html/');
    const shareUrl = new URL(isInView ? `telademusica.html?id=${id}` : `view/html/telademusica.html?id=${id}`, window.location.href).href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    showNectarToast('🔗 Link da música copiado! Pronto para divulgar nos Stories / WhatsApp 🐝');
}

function playMusic(cardElement, event) {
    if (event && event.target && event.target.closest('.btn-open-song')) {
        return;
    }
    const songId = Number(cardElement.dataset.songId || 1);
    const isAlreadyPlaying = cardElement.classList.contains('playing');

    document.querySelectorAll('.CardMusic.playing').forEach(el => {
        el.classList.remove('playing');
        const fab = el.querySelector('.card-play-fab');
        if (fab) fab.textContent = '▶';
    });

    if (isAlreadyPlaying && globalAudio && !globalAudio.paused) {
        toggleMiniPlayer();
        return;
    }

    cardElement.classList.add('playing');
    const fab = cardElement.querySelector('.card-play-fab');
    if (fab) fab.textContent = '⏸';

    NectarAPI.getSongById(songId).then(song => {
        updateMiniPlayerSong(song, true);
    });
}

// ============================================================================
// Modal Global (<dialog>) — Divulgar Artista Indie na Colmeia
// ============================================================================
function openIndieSubmitModal() {
    let dialog = document.getElementById('indieSubmitDialog');
    if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.id = 'indieSubmitDialog';
        dialog.className = 'nectar-modal';
        dialog.innerHTML = `
            <div class="modal-header">
                <h2>🐝 Polinizar Artista Indie</h2>
                <button type="button" class="modal-close" onclick="document.getElementById('indieSubmitDialog').close()">✕</button>
            </div>
            <p style="margin-top: 0; font-size: 13px; color: #cbd5e1; margin-bottom: 16px;">
                Cadastre uma faixa autoral sua ou de um amigo para aparecer no topo da Colmeia com links de divulgação:
            </p>
            <form id="indieSubmitForm">
                <div class="nectar-form-grid">
                    <div class="nectar-form-group">
                        <label>Nome da Música *</label>
                        <input type="text" name="title" placeholder="Ex: Sol de Outubro" required>
                    </div>
                    <div class="nectar-form-group">
                        <label>Artista / Banda Indie *</label>
                        <input type="text" name="artist" placeholder="Ex: Banda Garagem Azul" required>
                    </div>
                    <div class="nectar-form-group">
                        <label>Gênero Musical</label>
                        <select name="genre">
                            <option value="Indie Rock">Indie Rock</option>
                            <option value="Bedroom Pop">Bedroom Pop</option>
                            <option value="MPB Alternativo">MPB Alternativo</option>
                            <option value="Lo-Fi / Chill">Lo-Fi / Chill</option>
                            <option value="Rap / Trap Indie">Rap / Trap Indie</option>
                            <option value="Synthwave / Eletrônica">Synthwave / Eletrônica</option>
                            <option value="Post-Punk / Emo">Post-Punk / Emo</option>
                        </select>
                    </div>
                    <div class="nectar-form-group">
                        <label>Cidade / Cena Local</label>
                        <input type="text" name="artist_city" placeholder="Ex: São Paulo, SP">
                    </div>
                    <div class="nectar-form-group">
                        <label>Link do Instagram</label>
                        <input type="url" name="instagram_url" placeholder="https://instagram.com/sua_banda">
                    </div>
                    <div class="nectar-form-group">
                        <label>Link Spotify / SoundCloud</label>
                        <input type="url" name="spotify_url" placeholder="https://open.spotify.com/...">
                    </div>
                    <div class="nectar-form-group full">
                        <label>Link de Apoio / Ingresso / PIX (Opcional)</label>
                        <input type="text" name="support_link" placeholder="Link do Apoia.se, Sympla ou chave PIX">
                    </div>
                    <div class="nectar-form-group full">
                        <label>Capa da Música (Escolha do acervo ou cole uma URL de imagem)</label>
                        <select name="cover_url">
                            <option value="/pictures/Capas/Capa01.webp">Capa 01 — Colmeia Dourada</option>
                            <option value="/pictures/Capas/Capa02.jpg">Capa 02 — Indie Vibes</option>
                            <option value="/pictures/Capas/Capa05.jpg">Capa 05 — Bedroom Pop</option>
                            <option value="/pictures/Capas/Capa08.jpg">Capa 08 — Neo-Soul</option>
                            <option value="/pictures/Capas/Capa12.jpg">Capa 12 — Folk Solar</option>
                            <option value="/pictures/Capas/Capa14.jpg">Capa 14 — Dream Pop</option>
                        </select>
                    </div>
                    <div class="nectar-form-group full">
                        <label>Bio / História da Banda ou Faixa</label>
                        <textarea name="artist_bio" rows="3" placeholder="Conte um pouco sobre o som de vocês, influências e próximos shows..."></textarea>
                    </div>
                </div>
                <button type="submit" class="btn-primary-nectar" style="margin-top: 8px;">🚀 Publicar na Colmeia</button>
            </form>
        `;
        document.body.appendChild(dialog);

        // Light dismiss ao clicar no backdrop
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) dialog.close();
        });

        dialog.querySelector('#indieSubmitForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const payload = Object.fromEntries(fd.entries());
            const created = await NectarAPI.createIndieSong(payload);
            dialog.close();
            e.target.reset();
            showNectarToast(`🐝 "${created.title}" de ${created.artist} foi publicada no topo da Colmeia!`);
            setTimeout(() => {
                const isInView = window.location.pathname.includes('/view/html/');
                window.location.href = isInView ? `telademusica.html?id=${created.id}` : `view/html/telademusica.html?id=${created.id}`;
            }, 900);
        });
    }
    dialog.showModal();
}

window.NectarAPI = NectarAPI;
window.handleButtonClick = handleButtonClick;
window.playMusic = playMusic;
window.resolveAssetUrl = resolveAssetUrl;
window.showNectarToast = showNectarToast;
window.openIndieSubmitModal = openIndieSubmitModal;
window.toggleMiniPlayer = toggleMiniPlayer;
window.skipMiniPlayer = skipMiniPlayer;
window.shareCurrentSong = shareCurrentSong;
window.updateMiniPlayerSong = updateMiniPlayerSong;

function highlightActiveMenu() {
    const path = window.location.pathname;
    document.querySelectorAll('.menu ul li a').forEach(a => {
        const href = a.getAttribute('href') || '';
        const page = href.split('/').pop();
        if (page && path.endsWith(page)) {
            a.classList.add('active-nav');
        }
    });
}

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
    highlightActiveMenu();
    ensureMiniPlayer();
});
