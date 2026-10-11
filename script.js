// --- DATOS DE LAS 6 ESCENAS ---
const scenes = [
    {
        title: "01. NieR:Automata - A2 (Long Hair)",
        desc: "Escena melancólica y ruinosa. Estética post-apocalíptica y tonos blancos/grises.",
        bg: "linear-gradient(135deg, #2c2c2c, #595959)",
        accent: "#f48fb1"
    },
    {
        title: "02. Resident Evil - Leon S. Kennedy",
        desc: "Atmosférica y de supervivencia. Misterio y tensión clásica de Raccoon City.",
        bg: "linear-gradient(135deg, #1b263b, #415a77)",
        accent: "#ff6b6b"
    },
    {
        title: "03. Elden Ring - Zona de la Fogata",
        desc: "Calidez en medio de la oscuridad. Descanso antes de la próxima batalla.",
        bg: "linear-gradient(135deg, #3a1c0d, #6d3215)",
        accent: "#ffb703"
    },
    {
        title: "04. Spyro The Dragon",
        desc: "Mundo vibrante, fantasía colorida y cristales mágicos.",
        bg: "linear-gradient(135deg, #480ca8, #7209b7)",
        accent: "#4cc9f0"
    },
    {
        title: "05. Infinity Nikki",
        desc: "Moda, coquette, exploración abierta y mucha ternura pastel.",
        bg: "linear-gradient(135deg, #ffc8dd, #ffafcc)",
        accent: "#b5179e"
    },
    {
        title: "06. Frutiger Aero / Aerowave",
        desc: "Nostalgia tecnológica del 2000, transparencias, burbujas y verde/azul agua.",
        bg: "linear-gradient(135deg, #00b4d8, #90e0ef)",
        accent: "#03045e"
    }
];

// --- SELECCIÓN DE ELEMENTOS DEL HTML ---
const gameTitle = document.getElementById('gameTitle');
const gameViewport = document.getElementById('gameViewport');
const sceneIndicator = document.getElementById('sceneIndicator');
const sceneTabs = document.querySelectorAll('.scene-tab');

// Botones de la consola física
const upBtn = document.querySelector('.d-up');
const downBtn = document.querySelector('.d-down');
const leftBtn = document.querySelector('.d-left');
const rightBtn = document.querySelector('.d-right');
const triangleBtn = document.querySelector('.btn-triangle');
const circleBtn = document.querySelector('.btn-circle');
const crossBtn = document.querySelector('.btn-cross');
const squareBtn = document.querySelector('.btn-square');

let currentIndex = 0;

// --- FUNCIÓN PARA CAMBIAR DE ESCENA ---
function loadScene(index) {
    currentIndex = index;
    const scene = scenes[index];

    // Actualizar textos y estilos visuales
    gameTitle.textContent = scene.title;
    gameViewport.style.background = scene.bg;
    sceneIndicator.textContent = `Escena ${index + 1}/6`;

    // Renderizar contenido interno del visor
    gameViewport.innerHTML = `
        <div class="active-scene-content" style="color: #ffffff; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">
            <h2 style="font-size: 2rem; margin-bottom: 10px; color: ${scene.accent};">${scene.title}</h2>
            <p style="font-size: 1.2rem; max-width: 400px; margin: 0 auto;">${scene.desc}</p>
        </div>
    `;

    // Actualizar pestañas activas abajo
    sceneTabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// --- EVENTOS DE LOS BOTONES DE ABAJO (TESTING TABS) ---
sceneTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        loadScene(index);
    });
});

// --- EVENTOS DE LAS FLECHAS Y BOTONES DE LA PSP ---
function nextScene() {
    let newIndex = (currentIndex + 1) % scenes.length;
    loadScene(newIndex);
}

function prevScene() {
    let newIndex = (currentIndex - 1 + scenes.length) % scenes.length;
    loadScene(newIndex);
}

// Asignar controles físicos simulados
if (rightBtn) rightBtn.addEventListener('click', nextScene);
if (leftBtn) leftBtn.addEventListener('click', prevScene);
if (downBtn) downBtn.addEventListener('click', nextScene);
if (upBtn) upBtn.addEventListener('click', prevScene);

// Botones de acción principales también mueven o interactúan
if (crossBtn) crossBtn.addEventListener('click', nextScene);
if (circleBtn) circleBtn.addEventListener('click', nextScene);

// Cargar la primera escena por defecto al abrir
loadScene(0);