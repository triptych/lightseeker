/**
 * Core game engine handling canvas, game loop, and scene management
 */

// Canvas setup
class Engine {
    constructor(containerId) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext("2d", { alpha: false });
        this.ctx.imageSmoothingEnabled = false;  // Disable anti-aliasing for pixel art
        this.lastTime = 0;
        this.gameObjects = new Set();
        this.scenes = {};
        this.currentScene = null;
        this.debugMode = true;  // Start with debug mode on

        // Add canvas to container
        const container = document.getElementById(containerId);
        if (container) {
            container.appendChild(this.canvas);
            console.log('Canvas added to container');
        } else {
            console.error('Container not found:', containerId);
        }

        // Make canvas responsive
        this.setupResponsiveCanvas();
        window.addEventListener("resize", () => this.setupResponsiveCanvas());
    }

    setupResponsiveCanvas() {
        const container = this.canvas.parentElement;
        if (!container) return;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const scale = Math.min(
            containerWidth / this.canvas.width,
            containerHeight / this.canvas.height
        );

        this.canvas.style.width = `${this.canvas.width * scale}px`;
        this.canvas.style.height = `${this.canvas.height * scale}px`;
        this.canvas.style.position = "absolute";
        this.canvas.style.left = "50%";
        this.canvas.style.top = "50%";
        this.canvas.style.transform = `translate(-50%, -50%)`;
    }

    // Scene Management
    addScene(name, setupFn) {
        this.scenes[name] = setupFn;
    }

    goToScene(sceneName) {
        this.gameObjects.clear();
        this.currentScene = sceneName;
        if (this.scenes[sceneName]) {
            this.scenes[sceneName]();
        }
    }

    // Game Object Management
    addGameObject(gameObject) {
        this.gameObjects.add(gameObject);
    }

    removeGameObject(gameObject) {
        this.gameObjects.delete(gameObject);
    }

    // Debug Mode
    toggleDebug() {
        this.debugMode = !this.debugMode;
        console.log(`Debug mode ${this.debugMode ? "enabled" : "disabled"} - collision bounds visible`);
    }

    // Game Loop
    start() {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(timestamp) {
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Clear canvas with black background
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw all game objects
        this.gameObjects.forEach(obj => {
            obj.update(dt);
            obj.draw(this.ctx);
            // Show debug visualization when debug mode is on
            if (this.debugMode && obj.drawDebug) {
                obj.drawDebug(this.ctx);
            }
        });

        // Draw debug info
        if (this.debugMode) {
            this.ctx.fillStyle = '#00FF00';
            this.ctx.font = '12px monospace';
            this.ctx.fillText(`Objects: ${this.gameObjects.size}`, 10, 20);
            this.ctx.fillText(`FPS: ${Math.round(1 / dt)}`, 10, 40);
        }

        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}

export default Engine;
