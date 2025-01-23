/**
 * Base class for all game objects
 */

class GameObject {
    /**
     * Create a game object
     * @param {number} x - Initial X position
     * @param {number} y - Initial Y position
     * @param {number} width - Object width
     * @param {number} height - Object height
     * @param {string} [color='transparent'] - Fill color for basic rendering
     */
    constructor(x, y, width, height, color = 'transparent') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 200; // Default movement speed

        // Collision box configuration
        this.collider = {
            offsetX: 0,
            offsetY: 0,
            width: width,
            height: height
        };

        // Reference to game engine (set when added to engine)
        this.engine = null;
    }

    /**
     * Update object state
     * @param {number} dt - Delta time in seconds
     */
    update(dt) {
        // Override in subclasses
    }

    /**
     * Draw the object
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        if (this.color !== 'transparent') {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Draw debug visualization
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawDebug(ctx) {
        // Draw collision bounds
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineWidth = 2;
        const bounds = this.getBounds();
        ctx.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    }

    /**
     * Get collision boundaries
     * @returns {{x: number, y: number, width: number, height: number}} Collision bounds
     */
    getBounds() {
        return {
            x: this.x + this.collider.offsetX,
            y: this.y + this.collider.offsetY,
            width: this.collider.width,
            height: this.collider.height
        };
    }

    /**
     * Set the game engine reference
     * @param {Engine} engine - Reference to the game engine
     */
    setEngine(engine) {
        this.engine = engine;
    }

    /**
     * Remove this object from the game
     */
    destroy() {
        if (this.engine) {
            this.engine.removeGameObject(this);
        }
    }

    /**
     * Check collision with another object
     * @param {GameObject} other - Object to check collision with
     * @param {number} [offsetX=0] - X offset for prediction
     * @param {number} [offsetY=0] - Y offset for prediction
     * @returns {boolean} Whether objects collide
     */
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

    /**
     * Move the object if no collision would occur
     * @param {number} dx - X movement
     * @param {number} dy - Y movement
     * @returns {boolean} Whether movement was successful
     */
    moveIfPossible(dx, dy) {
        // If no collision system or engine, just move
        if (!this.engine?.collisionManager) {
            this.x += dx;
            this.y += dy;
            return true;
        }

        const collisions = this.engine.collisionManager.checkMovement(this, dx, dy);

        // Move on axes where there are no collisions
        if (!collisions.x) {
            this.x += dx;
        }
        if (!collisions.y) {
            this.y += dy;
        }

        // Return true if we were able to move in at least one direction
        return !collisions.x || !collisions.y;
    }
}

export default GameObject;
