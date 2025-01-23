/**
 * Player character class with movement and animation
 */

import GameObject from '../base/gameObject.js';
import Sprite from '../base/sprite.js';

class Player extends GameObject {
    /**
     * Create a player character
     * @param {number} x - Initial X position
     * @param {number} y - Initial Y position
     * @param {Object} [config] - Player configuration
     */
    constructor(x, y, config = {}) {
        super(x, y, 32, 32, 'transparent');

        // Initialize sprite system
        this.sprite = new Sprite({
            frameWidth: 32,
            frameHeight: 32,
            spritePath: config.spritePath || 'assets/character.svg',
            animations: {
                idle: { frames: 1, loop: true },
                walk: { frames: 4, loop: true },
                attack: { frames: 2, loop: false },
                jump: { frames: 2, loop: false }
            }
        });

        // Wait for sprite to load
        this.spriteLoaded = false;
        this.sprite.loadSprite(config.spritePath || 'assets/character.svg')
            .then(() => {
                this.spriteLoaded = true;
                console.log('Character sprite loaded successfully');
            })
            .catch(error => {
                console.error('Failed to load character sprite:', error);
            });

        // Movement state
        this.direction = 'down';
        this.moving = false;
        this.speed = config.speed || 200;

        // Stats system (for RPG mechanics)
        this.stats = {
            level: 1,
            hp: config.hp || 100,
            maxHp: config.maxHp || 100,
            mp: config.mp || 50,
            maxMp: config.maxMp || 50,
            strength: config.strength || 10,
            defense: config.defense || 10,
            speed: config.speed || 10
        };

        // Inventory system
        this.inventory = [];
        this.equipment = {
            weapon: null,
            armor: null,
            accessory: null
        };

        // Quest tracking
        this.quests = new Set();
        this.completedQuests = new Set();
    }

    /**
     * Update player state
     * @param {number} dt - Delta time in seconds
     */
    update(dt) {
        if (!this.engine) return;

        const input = this.engine.inputManager;
        if (!input) return;

        // Get movement vector from input
        const moveDir = input.getMovementVector();

        if (moveDir.x !== 0 || moveDir.y !== 0) {
            // Update facing direction
            if (Math.abs(moveDir.x) > Math.abs(moveDir.y)) {
                this.direction = moveDir.x > 0 ? 'right' : 'left';
            } else {
                this.direction = moveDir.y > 0 ? 'down' : 'up';
            }

            // Calculate movement with speed and delta time
            const movement = {
                x: moveDir.x * this.speed * dt,
                y: moveDir.y * this.speed * dt
            };

            // Attempt movement with collision checking
            this.moveIfPossible(movement.x, movement.y);
        }

        // Update movement state and animation
        this.moving = moveDir.x !== 0 || moveDir.y !== 0;
        this.sprite.setAnimation(this.moving ? 'walk' : 'idle');
        this.sprite.update(dt);
    }

    /**
     * Draw the player
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        if (this.spriteLoaded) {
            this.sprite.draw(ctx, this.x, this.y, this.width, this.height);
        } else {
            // Draw placeholder while sprite loads
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2,
                this.y + this.height / 2,
                this.width / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        if (this.engine?.debugMode) {
            this.drawDebug(ctx);
        }
    }

    /**
     * Add an item to inventory
     * @param {Object} item - Item to add
     * @returns {boolean} Whether item was added successfully
     */
    addItem(item) {
        if (this.inventory.length < 20) { // Example inventory limit
            this.inventory.push(item);
            return true;
        }
        return false;
    }

    /**
     * Equip an item
     * @param {Object} item - Item to equip
     * @returns {Object|null} Previously equipped item if any
     */
    equip(item) {
        if (!item.slot || !this.equipment.hasOwnProperty(item.slot)) {
            return null;
        }

        const previousItem = this.equipment[item.slot];
        this.equipment[item.slot] = item;

        // Update stats based on equipment
        this.updateEquipmentStats();

        return previousItem;
    }

    /**
     * Update stats based on equipped items
     */
    updateEquipmentStats() {
        // Reset to base stats
        Object.assign(this.stats, {
            strength: 10,
            defense: 10,
            speed: 10
        });

        // Add equipment bonuses
        Object.values(this.equipment).forEach(item => {
            if (item) {
                Object.entries(item.stats || {}).forEach(([stat, value]) => {
                    if (this.stats.hasOwnProperty(stat)) {
                        this.stats[stat] += value;
                    }
                });
            }
        });
    }

    /**
     * Start a new quest
     * @param {Object} quest - Quest to start
     */
    startQuest(quest) {
        if (!this.completedQuests.has(quest.id)) {
            this.quests.add(quest);
        }
    }

    /**
     * Complete a quest
     * @param {Object} quest - Quest to complete
     */
    completeQuest(quest) {
        if (this.quests.has(quest)) {
            this.quests.delete(quest);
            this.completedQuests.add(quest.id);
            // Handle quest rewards here
        }
    }

    /**
     * Take damage
     * @param {number} amount - Amount of damage
     * @returns {number} Actual damage taken
     */
    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - this.stats.defense / 2);
        this.stats.hp = Math.max(0, this.stats.hp - actualDamage);
        return actualDamage;
    }

    /**
     * Heal the player
     * @param {number} amount - Amount to heal
     * @returns {number} Actual amount healed
     */
    heal(amount) {
        const missingHp = this.stats.maxHp - this.stats.hp;
        const actualHeal = Math.min(missingHp, amount);
        this.stats.hp += actualHeal;
        return actualHeal;
    }
}

export default Player;
