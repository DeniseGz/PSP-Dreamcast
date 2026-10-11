const scenes = [
    { type: 'image', src: 'assets/nier.jpg' },
    // Agregá acá tus otras escenas, por ejemplo:
    // { type: 'video', src: 'assets/tu-video.mp4' }
];

let currentIndex = 0;
let currentVolume = 1.0; // Volumen inicial al 100%

function renderScene() {
    const mediaDisplay = document.getElementById('mediaDisplay');
    const current = scenes[currentIndex];

    if (current.type === 'image') {
        mediaDisplay.innerHTML = `<img src="${current.src}" alt="Scene" style="width: 100%; height: 100%; object-fit: cover; display: block;">`;
    } else if (current.type === 'video') {
        mediaDisplay.innerHTML = `
            <video src="${current.src}" autoplay loop playsinline style="width: 100%; height: 100%; object-fit: cover; display: block;"></video>
        `;
        // Aplicar volumen al video actual
        const videoEl = mediaDisplay.querySelector('video');
        if (videoEl) {
            videoEl.volume = currentVolume;
        }
    }
}

function nextScene() {
    currentIndex = (currentIndex + 1) % scenes.length;
    renderScene();
}

function prevScene() {
    currentIndex = (currentIndex - 1 + scenes.length) % scenes.length;
    renderScene();
}

// Funciones para el volumen
function volumeUp() {
    currentVolume = Math.min(1.0, currentVolume + 0.1);
    const videoEl = document.querySelector('#mediaDisplay video');
    if (videoEl) videoEl.volume = currentVolume;
    console.log(`Volumen: ${Math.round(currentVolume * 100)}%`);
}

function volumeDown() {
    currentVolume = Math.max(0.0, currentVolume - 0.1);
    const videoEl = document.querySelector('#mediaDisplay video');
    if (videoEl) videoEl.volume = currentVolume;
    console.log(`Volumen: ${Math.round(currentVolume * 100)}%`);
}

// Inicializar la primera escena al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderScene();
});

// Navegación con teclado opcional (flechas)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextScene();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevScene();
});
