// --- DATOS DE LAS 6 ESCENAS CON SOPORTE DE VIDEO/GIF ---
const scenes = [
    {
        title: "01. NieR:Automata - A2",
        desc: "Estética post-apocalíptica y tonos blancos/grises.",
        bg: "linear-gradient(135deg, #2c2c2c, #595959)",
        accent: "#f48fb1",
        mediaType: "gif", // Puede ser 'gif', 'video' o 'img'
        mediaSrc: "https://media.giphy.com/media/3oKIPcfX631trLEyCQ/giphy.gif" // Reemplazá con tu link o archivo local ej: 'assets/nier.gif'
    },
    {
        title: "02. Resident Evil - Leon",
        desc: "Atmósfera de supervivencia y tensión clásica.",
        bg: "linear-gradient(135deg, #1b263b, #415a77)",
        accent: "#ff6b6b",
        mediaType: "gif",
        mediaSrc: "https://media.giphy.com/media/12XMGIW6H25qeY/giphy.gif"
    },
    {
        title: "03. Cozy Knight & Dragon",
        desc: "Ambiente lofi medieval y pixel art de descanso junto al fuego.",
        bg: "linear-gradient(135deg, #2e1d13, #5a3219)",
        accent: "#f39c12",
        mediaType: "gif", // O "video" / "img" según el archivo que uses
        mediaSrc: "assets/cozy-knight.gif" // O la ruta a tu GIF/video de la escena
    },
    {
        title: "04. Spyro The Dragon",
        desc: "Mundo vibrante y fantasía colorida.",
        bg: "linear-gradient(135deg, #480ca8, #7209b7)",
        accent: "#4cc9f0",
        mediaType: "gif",
        mediaSrc: "https://media.giphy.com/media/8qXJTU5oEhQZO/giphy.gif"
    },
    {
        title: "05. Infinity Nikki",
        desc: "Moda, coquette y exploración abierta.",
        bg: "linear-gradient(135deg, #ffc8dd, #ffafcc)",
        accent: "#b5179e",
        mediaType: "gif",
        mediaSrc: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif"
    },
    {
        title: "06. Retro Aquarium Vibes",
        desc: "Protector de pantalla clásico de pecera con pececitos nadando.",
        bg: "linear-gradient(135deg, #0077b6, #03045e)",
        accent: "#90e0ef",
        mediaType: "video", // Cambiamos a video porque descargaste un .mp4 o similar
        mediaSrc: "assets/pecera.mp4" // Reemplazá con el nombre exacto de tu archivo de video en la carpeta assets
    }
];

const gameTitle = document.getElementById('gameTitle');
const gameDesc = document.getElementById('gameDesc');
const gameViewport = document.getElementById('gameViewport');
const sceneTabs = document.querySelectorAll('.d-btn, .psp-btn');

let currentIndex = 0;

function loadScene(index) {
    currentIndex = index;
    const scene = scenes[index];

    gameTitle.textContent = scene.title;
    gameTitle.style.color = scene.accent;
    gameDesc.textContent = scene.desc;
    gameViewport.style.background = scene.bg;

    // Buscar o crear contenedor multimedia dentro de la pantalla
    let mediaContainer = document.getElementById('sceneMedia');
    if (!mediaContainer) {
        mediaContainer = document.createElement('div');
        mediaContainer.id = 'sceneMedia';
        mediaContainer.className = 'media-container';
        gameViewport.querySelector('.xmb-content-display').appendChild(mediaContainer);
    }

    // Insertar el elemento multimedia (GIF o Video local/remoto)
    if (scene.mediaType === 'video') {
        mediaContainer.innerHTML = `
            <video autoplay loop muted playsinline style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px;">
                <source src="${scene.mediaSrc}" type="video/mp4">
            </video>
        `;
    } else {
        mediaContainer.innerHTML = `
            <img src="${scene.mediaSrc}" alt="${scene.title}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 6px;">
        `;
    }
}

// Control por flechas del teclado o clics
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        currentIndex = (currentIndex + 1) % scenes.length;
        loadScene(currentIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        currentIndex = (currentIndex - 1 + scenes.length) % scenes.length;
        loadScene(currentIndex);
    }
});

// Cargar la primera escena al iniciar
loadScene(0);