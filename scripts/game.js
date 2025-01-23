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

// Collision Manager
class CollisionManager {
    constructor() {
        this.collidables = new Set();
    }

    addCollidable(object) {
        this.collidables.add(object);
    }

    removeCollidable(object) {
        this.collidables.delete(object);
    }

    checkCollisions(object) {
        for (const other of this.collidables) {
            if (other !== object && object.checkCollision(other)) {
                return other;
            }
        }
        return null;
    }
}

// Sprite System
class Sprite {
    constructor(config) {
        this.frameWidth = config.frameWidth || 32;
        this.frameHeight = config.frameHeight || 32;
        this.currentAnimation = 'idle';

        // Load SVG sprite
        this.image = new Image();
        this.image.src = 'assets/character.svg';

        // Create a temporary canvas for SVG rendering
        this.svgCanvas = document.createElement('canvas');
        this.svgCanvas.width = this.frameWidth;
        this.svgCanvas.height = this.frameHeight;
        this.svgCtx = this.svgCanvas.getContext('2d');

        // Track animation state
        this.isWalking = false;
    }

    update(dt) {
        // Animation state is handled by SVG animations
        this.isWalking = this.currentAnimation === 'walk';
    }

    draw(ctx, x, y, width, height) {
        // Only draw if image is loaded
        if (this.image.complete) {
            // Draw the SVG image
            ctx.drawImage(this.image, x, y, width, height);

            // Control SVG animations based on state
            const svgDoc = this.image.contentDocument;
            if (svgDoc) {
                const walkPulse = svgDoc.getElementById('walk-pulse');
                if (walkPulse) {
                    if (this.isWalking && walkPulse.getAttribute('begin') === 'indefinite') {
                        walkPulse.beginElement();
                    } else if (!this.isWalking) {
                        walkPulse.endElement();
                    }
                }
            }
        }
    }
}

class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 200;
        this.collider = {
            offsetX: 0,
            offsetY: 0,
            width: width,
            height: height
        };
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
        if (collisionManager.collidables.has(this)) {
            collisionManager.removeCollidable(this);
        }
    }

    checkCollision(other, offsetX = 0, offsetY = 0) {
        const bounds1 = this.getBounds();
        const bounds2 = other.getBounds();

        // Apply offsets for prediction
        bounds1.x += offsetX;
        bounds1.y += offsetY;

        return bounds1.x < bounds2.x + bounds2.width &&
               bounds1.x + bounds1.width > bounds2.x &&
               bounds1.y < bounds2.y + bounds2.height &&
               bounds1.y + bounds1.height > bounds2.y;
    }

    // Debug draw method
    drawDebug(ctx) {
        // Draw collision bounds
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineWidth = 2;
        const bounds = this.getBounds();
        ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    }

    getBounds() {
        return {
            x: this.x + this.collider.offsetX,
            y: this.y + this.collider.offsetY,
            width: this.collider.width,
            height: this.collider.height
        };
    }
}

class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32, 'transparent');
        this.sprite = new Sprite({
            frameWidth: 32,
            frameHeight: 32
        });
        this.direction = 'down';
        this.moving = false;
        collisionManager.addCollidable(this);
    }

    update(dt) {
        const prevX = this.x;
        const prevY = this.y;

        const moveDir = { x: 0, y: 0 };

        if (activeDirections.has("left") || keyStates["ArrowLeft"] || keyStates["KeyA"]) moveDir.x -= 1;
        if (activeDirections.has("right") || keyStates["ArrowRight"] || keyStates["KeyD"]) moveDir.x += 1;
        if (activeDirections.has("up") || keyStates["ArrowUp"] || keyStates["KeyW"]) moveDir.y -= 1;
        if (activeDirections.has("down") || keyStates["ArrowDown"] || keyStates["KeyS"]) moveDir.y += 1;

        if (moveDir.x !== 0 || moveDir.y !== 0) {
            // Normalize for diagonal movement
            const length = Math.sqrt(moveDir.x * moveDir.x + moveDir.y * moveDir.y);
            moveDir.x = moveDir.x / length;
            moveDir.y = moveDir.y / length;

            const movement = {
                x: moveDir.x * this.speed * dt,
                y: moveDir.y * this.speed * dt
            };

            // Try X movement first
            let collisionX = false;
            if (movement.x !== 0) {
                // Check if X movement would cause collision
                for (const other of collisionManager.collidables) {
                    if (other !== this && this.checkCollision(other, movement.x, 0)) {
                        collisionX = true;
                        break;
                    }
                }
                if (!collisionX) {
                    this.x += movement.x;
                }
            }

            // Try Y movement
            let collisionY = false;
            if (movement.y !== 0) {
                // Check if Y movement would cause collision
                for (const other of collisionManager.collidables) {
                    if (other !== this && this.checkCollision(other, 0, movement.y)) {
                        collisionY = true;
                        break;
                    }
                }
                if (!collisionY) {
                    this.y += movement.y;
                }
            }
        }

        // Update movement state
        this.moving = prevX !== this.x || prevY !== this.y;

        // Update animation
        this.sprite.currentAnimation = this.moving ? 'walk' : 'idle';
        this.sprite.update(dt);
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.x, this.y, this.width, this.height);
        // Draw debug visualization in development
        if (debugMode) {
            this.drawDebug(ctx);
        }
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

// Initialize collision manager
const collisionManager = new CollisionManager();

// Game scene
scene("game", () => {
    // Create player
    const player = new Player(
        canvas.width / 2 - 16,
        canvas.height / 2 - 16
    );

    // Add some walls for collision testing
    const walls = [
        new GameObject(100, 100, 200, 40, "gray"),  // Top wall
        new GameObject(100, 300, 200, 40, "gray"),  // Bottom wall
        new GameObject(100, 100, 40, 240, "gray"),  // Left wall
        new GameObject(300, 100, 40, 240, "gray")   // Right wall
    ];

    // Add walls to collision system
    walls.forEach(wall => collisionManager.addCollidable(wall));
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
    keyStates[e.code] = true;

    // Toggle debug mode with 'D' key press
    if (e.code === "KeyD") {
        debugMode = !debugMode;
        console.log(`Debug mode ${debugMode ? "enabled" : "disabled"} - collision bounds visible`);
    }
});
window.addEventListener("keyup", (e) => {
    keyStates[e.code] = false;
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

// Debug mode flag
let debugMode = false;

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
        // Show debug visualization for collidable objects when debug mode is on
        if (debugMode && collisionManager.collidables.has(obj)) {
            obj.drawDebug(ctx);
        }
    });

    requestAnimationFrame(gameLoop);
}

// Start in play mode
go("game");
requestAnimationFrame(gameLoop);
