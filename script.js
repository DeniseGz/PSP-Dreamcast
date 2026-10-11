const scenes = [
    { type: 'image', src: 'assets/nier.jpg' }
];

let currentIndex = 0;
let currentVolume = 1.0;

function renderScene() {
    const mediaDisplay = document.getElementById('mediaDisplay');
    if (!mediaDisplay) return;
    const current = scenes[currentIndex];

    if (current.type === 'image') {
        mediaDisplay.innerHTML = `<img src="${current.src}" alt="Scene" style="width: 100%; height: 100%; object-fit: cover; display: block;">`;
    } else if (current.type === 'video') {
        mediaDisplay.innerHTML = `
            <video src="${current.src}" autoplay loop playsinline style="width: 100%; height: 100%; object-fit: cover; display: block;"></video>
        `;
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

document.addEventListener('DOMContentLoaded', () => {
    renderScene();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextScene();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevScene();
});
