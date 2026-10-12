const scenes = [
    { type: 'image', src: 'assets/nier.jpg' },
    { type: 'image', src: 'assets/spyro.gif' },
    { type: 'video', src: 'assets/CozyKnightDragon.mp4' },
    { type: 'video', src: 'assets/RetroAquariumVibes.mp4' },
    { type: 'video', src: 'assets/infinitynikki.mp4' },
    { type: 'video', src: 'assets/re4.mp4' }
];

let currentIndex = 0;
let currentVolume = 1.0;

function renderScene() {
    const mediaDisplay = document.getElementById('mediaDisplay');
    if (!mediaDisplay) return;
    const current = scenes[currentIndex];

    if (current.type === 'image') {
        mediaDisplay.innerHTML = `<img src="${current.src}" alt="Scene">`;
    } else if (current.type === 'video') {
        mediaDisplay.innerHTML = `<video src="${current.src}" autoplay loop playsinline></video>`;
        const videoEl = mediaDisplay.querySelector('video');
        if (videoEl) {
            videoEl.volume = currentVolume;
            videoEl.play().catch(e => console.log(e));
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

function volumeUp() {
    currentVolume = Math.min(1.0, currentVolume + 0.1);
    const videoEl = document.querySelector('#mediaDisplay video');
    if (videoEl) videoEl.volume = currentVolume;
}

function volumeDown() {
    currentVolume = Math.max(0.0, currentVolume - 0.1);
    const videoEl = document.querySelector('#mediaDisplay video');
    if (videoEl) videoEl.volume = currentVolume;
}

// Desbloquear audio/video automáticamente con el primer clic en la página
document.addEventListener('click', () => {
    const videoEl = document.querySelector('#mediaDisplay video');
    if (videoEl && videoEl.paused) {
        videoEl.play().catch(e => console.log(e));
    }
}, { once: true });

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextScene();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevScene();
});
