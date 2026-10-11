const scenes = [
    { type: 'image', src: 'assets/nier.jpg' },
    { type: 'image', src: 'assets/spyro.gif' },
    { type: 'video', src: 'assets/CozyKnightDragon.mp4' },
    { type: 'video', src: 'assets/RetroAquariumVibes.mp4' },
    { type: 'video', src: 'assets/infinitynikki.mp4' },
    { type: 'video', src: 'assets/re4.mp4' }
];

let currentIndex = 0;
let currentVolume = 1.0; // Volumen inicial al 100%

function renderScene() {
    const mediaDisplay = document.getElementById('mediaDisplay');
    if (!mediaDisplay) return;
    const current = scenes[currentIndex];

    if (current.type === 'image') {
        mediaDisplay.innerHTML = `<img src="${current.src}" alt="Scene" style="width: 100%; height: 100%; object-fit: fill; display: block;">`;
    } else if (current.type === 'video') {
        mediaDisplay.innerHTML = `
            <video src="${current.src}" autoplay loop playsinline style="width: 100%; height: 100%; object-fit: fill; display: block;"></video>
        `;
        const videoEl = mediaDisplay.querySelector('video');
        if (videoEl) {
            videoEl.volume = currentVolume;
            videoEl.play().catch(e => console.log("Autoplay bloqueado o requiere interacción previa:", e));
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

// Funciones vinculadas a los botones de volumen
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

// Inicializar al cargar la página de forma segura
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderScene);
} else {
    renderScene();
}

// Navegación con teclado (Flechas)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextScene();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevScene();
});
