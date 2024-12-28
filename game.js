import kaplay from "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";

// Initialize Kaplay
kaplay({
    width: 800,
    height: 600,
    scale: 1,
    crisp: true,
    canvas: document.createElement("canvas"),
    global: true,
});

// Add canvas to game container
document.getElementById("game-container").appendChild(canvas);

// Make canvas responsive
function resizeCanvas() {
    const container = document.getElementById("game-container");
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const scale = Math.min(
        containerWidth / kaplay.width(),
        containerHeight / kaplay.height()
    );

    canvas.style.width = `${kaplay.width() * scale}px`;
    canvas.style.height = `${kaplay.height() * scale}px`;
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

// Test scene
kaplay.scene("game", () => {
    // Add a test rectangle that can be moved with controls
    const player = kaplay.add([
        kaplay.rect(40, 40),
        kaplay.pos(kaplay.width() / 2, kaplay.height() / 2),
        kaplay.color(0, 255, 0),
        {
            speed: 200
        }
    ]);

    // Update player movement based on active directions
    player.onUpdate(() => {
        const moveDir = kaplay.vec2(0, 0);

        if (activeDirections.has("left")) moveDir.x -= 1;
        if (activeDirections.has("right")) moveDir.x += 1;
        if (activeDirections.has("up")) moveDir.y -= 1;
        if (activeDirections.has("down")) moveDir.y += 1;

        // Also support keyboard
        if (kaplay.isKeyDown("left")) moveDir.x -= 1;
        if (kaplay.isKeyDown("right")) moveDir.x += 1;
        if (kaplay.isKeyDown("up")) moveDir.y -= 1;
        if (kaplay.isKeyDown("down")) moveDir.y += 1;

        if (moveDir.x !== 0 || moveDir.y !== 0) {
            // Normalize for diagonal movement
            moveDir.x = moveDir.x / Math.sqrt(moveDir.x * moveDir.x + moveDir.y * moveDir.y);
            moveDir.y = moveDir.y / Math.sqrt(moveDir.x * moveDir.x + moveDir.y * moveDir.y);

            player.pos.x += moveDir.x * player.speed * kaplay.dt();
            player.pos.y += moveDir.y * player.speed * kaplay.dt();
        }
    });
});

// Start the game
kaplay.go("game");
