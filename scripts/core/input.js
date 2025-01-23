/**
 * Input handling system for keyboard, touch, and mobile controls
 */

class InputManager {
    constructor() {
        this.keyStates = {};
        this.activeDirections = new Set();
        this.setupKeyboardListeners();
    }

    // Keyboard input handling
    setupKeyboardListeners() {
        window.addEventListener("keydown", (e) => {
            this.keyStates[e.code] = true;
        });

        window.addEventListener("keyup", (e) => {
            this.keyStates[e.code] = false;
        });
    }

    // Mobile D-pad setup
    setupMobileControls(dpadSelector, actionButtonsSelector) {
        const dpadButtons = document.querySelectorAll(dpadSelector);
        const actionButtons = document.querySelectorAll(actionButtonsSelector);

        // D-pad direction mapping
        const dpadDirections = {
            "↑": "up",
            "→": "right",
            "↓": "down",
            "←": "left"
        };

        // Setup D-pad controls
        dpadButtons.forEach(button => {
            const direction = dpadDirections[button.textContent];
            if (!direction) return;

            // Touch events
            button.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.activeDirections.add(direction);
            });

            button.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.activeDirections.delete(direction);
            });

            // Mouse events for testing on desktop
            button.addEventListener("mousedown", () => {
                this.activeDirections.add(direction);
            });

            button.addEventListener("mouseup", () => {
                this.activeDirections.delete(direction);
            });
        });

        // Action button mapping
        const actionMap = {
            "A": "action1",
            "B": "action2"
        };

        // Setup action buttons
        actionButtons.forEach(button => {
            const action = actionMap[button.textContent];
            if (!action) return;

            // Touch events
            button.addEventListener("touchstart", (e) => {
                e.preventDefault();
                this.triggerAction(action, true);
            });

            button.addEventListener("touchend", (e) => {
                e.preventDefault();
                this.triggerAction(action, false);
            });

            // Mouse events for testing
            button.addEventListener("mousedown", () => {
                this.triggerAction(action, true);
            });

            button.addEventListener("mouseup", () => {
                this.triggerAction(action, false);
            });
        });
    }

    // Input state checks
    isKeyPressed(keyCode) {
        return this.keyStates[keyCode] || false;
    }

    isDirectionActive(direction) {
        return this.activeDirections.has(direction);
    }

    getMovementVector() {
        const moveDir = { x: 0, y: 0 };

        // Check both keyboard and d-pad inputs
        if (this.isKeyPressed("ArrowLeft") || this.isKeyPressed("KeyA") || this.isDirectionActive("left")) moveDir.x -= 1;
        if (this.isKeyPressed("ArrowRight") || this.isKeyPressed("KeyD") || this.isDirectionActive("right")) moveDir.x += 1;
        if (this.isKeyPressed("ArrowUp") || this.isKeyPressed("KeyW") || this.isDirectionActive("up")) moveDir.y -= 1;
        if (this.isKeyPressed("ArrowDown") || this.isKeyPressed("KeyS") || this.isDirectionActive("down")) moveDir.y += 1;

        // Normalize diagonal movement
        if (moveDir.x !== 0 && moveDir.y !== 0) {
            const length = Math.sqrt(moveDir.x * moveDir.x + moveDir.y * moveDir.y);
            moveDir.x = moveDir.x / length;
            moveDir.y = moveDir.y / length;
        }

        return moveDir;
    }

    // Action handling
    triggerAction(action, isStarting) {
        // Placeholder for action handling
        // This will be connected to the game's action system
        console.log(`Action ${action} ${isStarting ? 'started' : 'ended'}`);
    }
}

export default InputManager;
