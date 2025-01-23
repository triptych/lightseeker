/**
 * Sprite system for handling character animations and composition
 */

class Sprite {
    /**
     * Create a sprite
     * @param {Object} config - Sprite configuration
     * @param {number} [config.frameWidth=32] - Width of each animation frame
     * @param {number} [config.frameHeight=32] - Height of each animation frame
     * @param {string} [config.spritePath] - Path to sprite image
     * @param {Object} [config.animations] - Animation definitions
     */
    constructor(config) {
        this.frameWidth = config.frameWidth || 32;
        this.frameHeight = config.frameHeight || 32;
        this.currentAnimation = 'idle';
        this.isAnimating = false;

        // Animation state
        this.animations = config.animations || {
            idle: { frames: 1, loop: true },
            walk: { frames: 4, loop: true }
        };

        // Create sprite canvas for composition
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.frameWidth;
        this.canvas.height = this.frameHeight;
        this.ctx = this.canvas.getContext('2d');

        // Sprite components (for character customization)
        this.components = new Map();

        // Load default sprite if path provided
        if (config.spritePath) {
            this.loadSprite(config.spritePath);
        }
    }

    /**
     * Load a sprite image
     * @param {string} path - Path to sprite image
     * @returns {Promise} Promise that resolves when sprite is loaded
     */
    loadSprite(path) {
        return new Promise((resolve, reject) => {
            this.image = new Image();
            this.image.onload = () => resolve(this.image);
            this.image.onerror = reject;
            this.image.src = path;
        });
    }

    /**
     * Add a sprite component (for character customization)
     * @param {string} name - Component name (e.g., 'body', 'hair', 'clothes')
     * @param {string} path - Path to component image
     * @param {Object} [options] - Component options (position, scale, etc.)
     */
    addComponent(name, path, options = {}) {
        const component = {
            image: new Image(),
            options: {
                x: options.x || 0,
                y: options.y || 0,
                scale: options.scale || 1,
                zIndex: options.zIndex || 0
            }
        };

        return new Promise((resolve, reject) => {
            component.image.onload = () => {
                this.components.set(name, component);
                this.compositeSprite();
                resolve();
            };
            component.image.onerror = reject;
            component.image.src = path;
        });
    }

    /**
     * Remove a sprite component
     * @param {string} name - Component name to remove
     */
    removeComponent(name) {
        this.components.delete(name);
        this.compositeSprite();
    }

    /**
     * Composite all components into final sprite
     */
    compositeSprite() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Sort components by z-index
        const sortedComponents = Array.from(this.components.values())
            .sort((a, b) => a.options.zIndex - b.options.zIndex);

        // Draw each component
        sortedComponents.forEach(component => {
            const { image, options } = component;
            const scaledWidth = this.frameWidth * options.scale;
            const scaledHeight = this.frameHeight * options.scale;

            this.ctx.drawImage(
                image,
                options.x,
                options.y,
                scaledWidth,
                scaledHeight
            );
        });
    }

    /**
     * Update sprite animation
     * @param {number} dt - Delta time in seconds
     */
    update(dt) {
        // Animation state is handled by SVG animations or sprite sheets
        this.isAnimating = this.currentAnimation === 'walk';
    }

    /**
     * Draw the sprite
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     * @param {number} x - X position to draw at
     * @param {number} y - Y position to draw at
     * @param {number} width - Width to draw
     * @param {number} height - Height to draw
     */
    draw(ctx, x, y, width, height) {
        if (this.image && this.image.complete) {
            // For SVG files, draw directly from the image
            if (this.image.src.endsWith('.svg')) {
                ctx.drawImage(this.image, x, y, width, height);
            } else {
                // For other images, use the composite canvas
                ctx.drawImage(this.canvas, x, y, width, height);
            }
        }
    }

    /**
     * Set current animation
     * @param {string} animationName - Name of animation to play
     */
    setAnimation(animationName) {
        if (this.animations[animationName]) {
            this.currentAnimation = animationName;
        }
    }

    /**
     * Get current animation state
     * @returns {Object} Current animation state
     */
    getAnimationState() {
        return {
            name: this.currentAnimation,
            isPlaying: this.isAnimating
        };
    }
}

export default Sprite;
