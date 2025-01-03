import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";

// Game state
let currentMode = "play"; // "play" or "edit"
let currentTool = "select";
let currentLayer = "ground";
const gridSize = 40;

// Initialize Kaplay
const canvas = kaplay({
    width: 800,
    height: 600,
    scale: 1,
    crisp: true,
    canvas: document.createElement("canvas"),
    global: true,
});

// Add canvas to game container
document.getElementById("game-container").appendChild(canvas.canvas);

// Make canvas responsive
function resizeCanvas() {
    const container = document.getElementById("game-container");
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scale = Math.min(
        containerWidth / width(),
        containerHeight / height()
    );

    canvas.canvas.style.width = `${width() * scale}px`;
    canvas.canvas.style.height = `${height() * scale}px`;
    canvas.canvas.style.position = "absolute";
    canvas.canvas.style.left = "50%";
    canvas.canvas.style.top = "50%";
    canvas.canvas.style.transform = `translate(-50%, -50%)`;
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

// Test scene
scene("game", () => {
    // Add a test rectangle that can be moved with controls
    const player = add([
        rect(40, 40),
        pos(width() / 2, height() / 2),
        color(0, 255, 0),
        {
            speed: 200
        }
    ]);

    // Update player movement based on active directions
    player.onUpdate(() => {
        const moveDir = vec2(0, 0);

        if (activeDirections.has("left")) moveDir.x -= 1;
        if (activeDirections.has("right")) moveDir.x += 1;
        if (activeDirections.has("up")) moveDir.y -= 1;
        if (activeDirections.has("down")) moveDir.y += 1;

        // Also support keyboard
        if (isKeyDown("left")) moveDir.x -= 1;
        if (isKeyDown("right")) moveDir.x += 1;
        if (isKeyDown("up")) moveDir.y -= 1;
        if (isKeyDown("down")) moveDir.y += 1;

        if (moveDir.x !== 0 || moveDir.y !== 0) {
            // Normalize for diagonal movement
            moveDir.x = moveDir.x / Math.sqrt(moveDir.x * moveDir.x + moveDir.y * moveDir.y);
            moveDir.y = moveDir.y / Math.sqrt(moveDir.x * moveDir.x + moveDir.y * moveDir.y);

            player.pos.x += moveDir.x * player.speed * dt();
            player.pos.y += moveDir.y * player.speed * dt();
        }
    });
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

// Editor scene
scene("edit", () => {
    // Add grid
    for (let x = 0; x < width(); x += gridSize) {
        add([
            rect(1, height()),
            pos(x, 0),
            color(0.5, 0.5, 0.5, 0.3),
            fixed()
        ]);
    }
    for (let y = 0; y < height(); y += gridSize) {
        add([
            rect(width(), 1),
            pos(0, y),
            color(0.5, 0.5, 0.5, 0.3),
            fixed()
        ]);
    }

    // Handle mouse input for editing
    onClick((mousePos) => {
        if (currentTool === "paint") {
            const gridX = Math.floor(mousePos.x / gridSize) * gridSize;
            const gridY = Math.floor(mousePos.y / gridSize) * gridSize;

            add([
                rect(gridSize - 2, gridSize - 2),
                pos(gridX + 1, gridY + 1),
                color(1, 0, 0),
                layer(currentLayer),
                "tile"
            ]);
        } else if (currentTool === "erase") {
            every("tile", (tile) => {
                if (mousePos.x >= tile.pos.x && mousePos.x <= tile.pos.x + gridSize &&
                    mousePos.y >= tile.pos.y && mousePos.y <= tile.pos.y + gridSize) {
                    destroy(tile);
                }
            });
        }
    });
});

// Start in play mode
go("game");
