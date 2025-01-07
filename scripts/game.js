// Game state
let currentMode = "play"; // "play" or "edit"
let currentTool = "select";
let currentLayer = "ground";
const gridSize = 40;

// Initialize Canvas
const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");

// Add canvas to game container
document.getElementById("game-container").appendChild(canvas);

// Make canvas responsive
function resizeCanvas() {
    const container = document.getElementById("game-container");
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scale = Math.min(
        containerWidth / canvas.width,
        containerHeight / canvas.height
    );

    canvas.style.width = `${canvas.width * scale}px`;
    canvas.style.height = `${canvas.height * scale}px`;
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.transform = `translate(-50%, -50%)`;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Setup mobile controls
const dpadButtons = document.querySelectorAll(".d-pad button");
const actionButtons = document.querySelectorAll(".action-buttons button");

// D-pad controls
const dpadDirections = {
    "↑": "up",
    "→": "right",
    "↓": "down",
    "←": "left"
};

const activeDirections = new Set();

// Handle D-pad touch/mouse events
dpadButtons.forEach(button => {
    const direction = dpadDirections[button.textContent];
    if (!direction) return;

    // Touch events
    button.addEventListener("touchstart", (e) => {
        e.preventDefault();
        activeDirections.add(direction);
    });

    button.addEventListener("touchend", (e) => {
        e.preventDefault();
        activeDirections.delete(direction);
    });

    // Mouse events for testing on desktop
    button.addEventListener("mousedown", () => {
        activeDirections.add(direction);
    });

    button.addEventListener("mouseup", () => {
        activeDirections.delete(direction);
    });
});

// Handle action buttons
const actionMap = {
    "A": "action1",
    "B": "action2"
};

actionButtons.forEach(button => {
    const action = actionMap[button.textContent];
    if (!action) return;

    // Touch events
    button.addEventListener("touchstart", (e) => {
        e.preventDefault();
        // Trigger action start
    });

    button.addEventListener("touchend", (e) => {
        e.preventDefault();
        // Trigger action end
    });

    // Mouse events for testing
    button.addEventListener("mousedown", () => {
        // Trigger action start
    });

    button.addEventListener("mouseup", () => {
        // Trigger action end
    });
});

// Game objects and scenes
let currentScene = null;
const scenes = {};
const gameObjects = new Set();

class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 200;
        gameObjects.add(this);
    }

    update(dt) {
        // Override in subclasses
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    destroy() {
        gameObjects.delete(this);
    }
}

// Scene management
function scene(name, setupFn) {
    scenes[name] = setupFn;
}

function go(sceneName) {
    gameObjects.clear();
    currentScene = sceneName;
    if (scenes[sceneName]) {
        scenes[sceneName]();
    }
}

// Game scene
scene("game", () => {
    const player = new GameObject(
        canvas.width / 2 - 20,
        canvas.height / 2 - 20,
        40,
        40,
        "rgb(0, 255, 0)"
    );

    player.update = (dt) => {
        const moveDir = { x: 0, y: 0 };

        if (activeDirections.has("left") || keyStates["ArrowLeft"]) moveDir.x -= 1;
        if (activeDirections.has("right") || keyStates["ArrowRight"]) moveDir.x += 1;
        if (activeDirections.has("up") || keyStates["ArrowUp"]) moveDir.y -= 1;
        if (activeDirections.has("down") || keyStates["ArrowDown"]) moveDir.y += 1;

        if (moveDir.x !== 0 || moveDir.y !== 0) {
            // Normalize for diagonal movement
            const length = Math.sqrt(moveDir.x * moveDir.x + moveDir.y * moveDir.y);
            moveDir.x = moveDir.x / length;
            moveDir.y = moveDir.y / length;

            player.x += moveDir.x * player.speed * dt;
            player.y += moveDir.y * player.speed * dt;
        }
    };
});

// Editor scene
scene("edit", () => {
    // Add grid lines
    const gridLines = new GameObject(0, 0, canvas.width, canvas.height, "transparent");
    gridLines.draw = (ctx) => {
        ctx.strokeStyle = "rgba(128, 128, 128, 0.3)";
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    };
});

// Input handling
const keyStates = {};
window.addEventListener("keydown", (e) => {
    keyStates[e.key] = true;
});
window.addEventListener("keyup", (e) => {
    keyStates[e.key] = false;
});

canvas.addEventListener("click", (e) => {
    if (currentMode !== "edit") return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const scale = canvas.width / rect.width;

    const gridX = Math.floor(mouseX * scale / gridSize) * gridSize;
    const gridY = Math.floor(mouseY * scale / gridSize) * gridSize;

    if (currentTool === "paint") {
        new GameObject(gridX + 1, gridY + 1, gridSize - 2, gridSize - 2, "red");
    } else if (currentTool === "erase") {
        gameObjects.forEach(obj => {
            if (obj.x >= gridX && obj.x < gridX + gridSize &&
                obj.y >= gridY && obj.y < gridY + gridSize) {
                obj.destroy();
            }
        });
    }
});

// Mode switching
const playModeBtn = document.getElementById("play-mode");
const editModeBtn = document.getElementById("edit-mode");
const editorTools = document.getElementById("editor-tools");
const controls = document.getElementById("controls");

playModeBtn.addEventListener("click", () => switchMode("play"));
editModeBtn.addEventListener("click", () => switchMode("edit"));

function switchMode(mode) {
    currentMode = mode;

    // Update UI
    playModeBtn.classList.toggle("active", mode === "play");
    editModeBtn.classList.toggle("active", mode === "edit");
    editorTools.style.display = mode === "edit" ? "flex" : "none";
    controls.style.display = mode === "play" ? "flex" : "none";

    // Switch scenes
    go(mode === "play" ? "game" : "edit");
}

// Editor tools
document.querySelectorAll("#editor-tools [data-tool]").forEach(button => {
    button.addEventListener("click", (e) => {
        currentTool = e.target.dataset.tool;
        document.querySelectorAll("#editor-tools [data-tool]").forEach(btn =>
            btn.classList.toggle("active", btn === e.target)
        );
    });
});

document.querySelectorAll("#editor-tools [data-layer]").forEach(button => {
    button.addEventListener("click", (e) => {
        currentLayer = e.target.dataset.layer;
        document.querySelectorAll("#editor-tools [data-layer]").forEach(btn =>
            btn.classList.toggle("active", btn === e.target)
        );
    });
});

// Game loop
let lastTime = 0;

function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw all game objects
    gameObjects.forEach(obj => {
        obj.update(dt);
        obj.draw(ctx);
    });

    requestAnimationFrame(gameLoop);
}

// Start in play mode
go("game");
requestAnimationFrame(gameLoop);
