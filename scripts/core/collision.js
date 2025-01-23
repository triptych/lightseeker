/**
 * Collision detection and management system
 */

class CollisionManager {
    constructor() {
        this.collidables = new Set();
    }

    /**
     * Add an object to the collision system
     * @param {GameObject} object - The object to make collidable
     */
    addCollidable(object) {
        if (!object.getBounds) {
            console.warn('Object must implement getBounds() to be collidable');
            return;
        }
        this.collidables.add(object);
    }

    /**
     * Remove an object from the collision system
     * @param {GameObject} object - The object to remove
     */
    removeCollidable(object) {
        this.collidables.delete(object);
    }

    /**
     * Check if an object collides with any other collidable objects
     * @param {GameObject} object - The object to check collisions for
     * @param {number} [offsetX=0] - X offset for prediction
     * @param {number} [offsetY=0] - Y offset for prediction
     * @returns {GameObject|null} The first object collided with, or null if no collision
     */
    checkCollisions(object, offsetX = 0, offsetY = 0) {
        for (const other of this.collidables) {
            if (other !== object && this.checkCollision(object, other, offsetX, offsetY)) {
                return other;
            }
        }
        return null;
    }

    /**
     * Check collision between two specific objects
     * @param {GameObject} obj1 - First object
     * @param {GameObject} obj2 - Second object
     * @param {number} [offsetX=0] - X offset for prediction
     * @param {number} [offsetY=0] - Y offset for prediction
     * @returns {boolean} Whether the objects collide
     */
    checkCollision(obj1, obj2, offsetX = 0, offsetY = 0) {
        const bounds1 = obj1.getBounds();
        const bounds2 = obj2.getBounds();

        // Apply offsets for prediction
        bounds1.x += offsetX;
        bounds1.y += offsetY;

        return bounds1.x < bounds2.x + bounds2.width &&
               bounds1.x + bounds1.width > bounds2.x &&
               bounds1.y < bounds2.y + bounds2.height &&
               bounds1.y + bounds1.height > bounds2.y;
    }

    /**
     * Get all objects colliding with a given object
     * @param {GameObject} object - The object to check
     * @param {number} [offsetX=0] - X offset for prediction
     * @param {number} [offsetY=0] - Y offset for prediction
     * @returns {GameObject[]} Array of colliding objects
     */
    getAllCollisions(object, offsetX = 0, offsetY = 0) {
        return Array.from(this.collidables)
            .filter(other => other !== object && this.checkCollision(object, other, offsetX, offsetY));
    }

    /**
     * Check if a movement would result in any collisions
     * @param {GameObject} object - The object to check
     * @param {number} moveX - Intended X movement
     * @param {number} moveY - Intended Y movement
     * @returns {{x: boolean, y: boolean}} Whether movement in each axis would cause collision
     */
    checkMovement(object, moveX, moveY) {
        return {
            x: this.checkCollisions(object, moveX, 0) !== null,
            y: this.checkCollisions(object, 0, moveY) !== null
        };
    }

    /**
     * Get all collidable objects
     * @returns {Set<GameObject>} Set of all collidable objects
     */
    getCollidables() {
        return this.collidables;
    }

    /**
     * Clear all collidables from the system
     */
    clear() {
        this.collidables.clear();
    }
}

export default CollisionManager;
