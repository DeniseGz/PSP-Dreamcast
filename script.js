const scenes = [
    { type: "img", src: "assets/nier.jpg" },
    { type: "video", src: "assets/re4.mp4" },
    { type: "video", src: "assets/CozyKnightDragon.mp4" },
    { type: "gif", src: "assets/spyro.gif" },
    { type: "video", src: "assets/infinitynikki.mp4" },
    { type: "video", src: "assets/RetroAquariumVibes.mp4" }
];

let currentIndex = 0;
const mediaDisplay = document.getElementById("mediaDisplay");

function renderScene(index) {
    const item = scenes[index];
    if (item.type === "video") {
        mediaDisplay.innerHTML = `
            <video autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;">
                <source src="${item.src}" type="video/mp4">
            </video>
        `;
    } else {
        mediaDisplay.innerHTML = `<img src="${item.src}" alt="Scene" style="width:100%; height:100%; object-fit:cover;">`;
    }
}

function nextScene() {
    currentIndex = (currentIndex + 1) % scenes.length;
    renderScene(currentIndex);
}

function prevScene() {
    currentIndex = (currentIndex - 1 + scenes.length) % scenes.length;
    renderScene(currentIndex);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextScene();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevScene();
    }
});

renderScene(0);