/**
 * Edit mode handling map editor functionality
 */

import GameObject from '../../entities/base/gameObject.js';

class EditMode {
    /**
     * Create edit mode manager
     * @param {Engine} engine - Reference to game engine
     */
    constructor(engine) {
        this.engine = engine;
        this.currentTool = 'select';
        this.currentLayer = 'ground';
        this.gridSize = 40;
        this.selectedTile = null;
        this.clipboard = null;
        this.history = [];
        this.historyIndex = -1;
        this.maxHistory = 50;

        // Layer visibility
        this.layerVisibility = {
            ground: true,
            objects: true,
            events: true
        };

        // Tool options
        this.toolOptions = {
            paint: { size: 1, rotation: 0, flip: { x: false, y: false } },
            select: { x: 0, y: 0, width: 0, height: 0 }
        };

        this.setupScenes();
        this.setupEventListeners();
    }

    /**
     * Initialize edit mode
     */
    initialize() {
        // Set up editor scene
        this.engine.goToScene('edit');

        // Show editor UI elements
        document.getElementById('editor-tools').style.display = 'flex';
        document.getElementById('controls').style.display = 'none';
    }

    /**
     * Set up editor scenes
     */
    setupScenes() {
        this.engine.addScene('edit', () => {
            // Add grid visualization
            const gridLines = new GameObject(0, 0, this.engine.canvas.width, this.engine.canvas.height, 'transparent');
            gridLines.draw = (ctx) => this.drawGrid(ctx);
            this.engine.addGameObject(gridLines);
        });
    }

    /**
     * Set up event listeners for editor controls
     */
    setupEventListeners() {
        // Canvas click handler
        this.engine.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.engine.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Tool selection
        document.querySelectorAll('#editor-tools [data-tool]').forEach(button => {
            button.addEventListener('click', (e) => this.selectTool(e.target.dataset.tool));
        });

        // Layer selection
        document.querySelectorAll('#editor-tools [data-layer]').forEach(button => {
            button.addEventListener('click', (e) => this.selectLayer(e.target.dataset.layer));
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcut(e));
    }

    /**
     * Draw editor grid
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawGrid(ctx) {
        ctx.strokeStyle = 'rgba(128, 128, 128, 0.3)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < this.engine.canvas.width; x += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.engine.canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < this.engine.canvas.height; y += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.engine.canvas.width, y);
            ctx.stroke();
        }

        // Draw selection if active
        if (this.currentTool === 'select' && this.toolOptions.select.width > 0) {
            ctx.strokeStyle = 'rgba(0, 150, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                this.toolOptions.select.x,
                this.toolOptions.select.y,
                this.toolOptions.select.width,
                this.toolOptions.select.height
            );
        }
    }

    /**
     * Handle canvas click events
     * @param {MouseEvent} e - Click event
     */
    handleCanvasClick(e) {
        const rect = this.engine.canvas.getBoundingClientRect();
        const scale = this.engine.canvas.width / rect.width;
        const mouseX = (e.clientX - rect.left) * scale;
        const mouseY = (e.clientY - rect.top) * scale;

        // Snap to grid
        const gridX = Math.floor(mouseX / this.gridSize) * this.gridSize;
        const gridY = Math.floor(mouseY / this.gridSize) * this.gridSize;

        switch (this.currentTool) {
            case 'paint':
                this.paintTile(gridX, gridY);
                break;
            case 'erase':
                this.eraseTile(gridX, gridY);
                break;
            case 'select':
                this.handleSelection(gridX, gridY, e);
                break;
        }
    }

    /**
     * Handle mouse movement for previews
     * @param {MouseEvent} e - Mouse event
     */
    handleMouseMove(e) {
        const rect = this.engine.canvas.getBoundingClientRect();
        const scale = this.engine.canvas.width / rect.width;
        const mouseX = (e.clientX - rect.left) * scale;
        const mouseY = (e.clientY - rect.top) * scale;

        // Update hover preview
        // TODO: Implement tile preview on hover
    }

    /**
     * Paint a tile at the specified grid position
     * @param {number} x - Grid X position
     * @param {number} y - Grid Y position
     */
    paintTile(x, y) {
        if (!this.selectedTile) return;

        const action = {
            type: 'paint',
            layer: this.currentLayer,
            position: { x, y },
            tile: this.selectedTile
        };

        this.executeAction(action);
    }

    /**
     * Erase tile at the specified grid position
     * @param {number} x - Grid X position
     * @param {number} y - Grid Y position
     */
    eraseTile(x, y) {
        const action = {
            type: 'erase',
            layer: this.currentLayer,
            position: { x, y }
        };

        this.executeAction(action);
    }

    /**
     * Handle selection tool
     * @param {number} x - Grid X position
     * @param {number} y - Grid Y position
     * @param {MouseEvent} e - Mouse event
     */
    handleSelection(x, y, e) {
        if (e.shiftKey) {
            // Extend selection
            const startX = Math.min(this.toolOptions.select.x, x);
            const startY = Math.min(this.toolOptions.select.y, y);
            const endX = Math.max(this.toolOptions.select.x + this.toolOptions.select.width, x + this.gridSize);
            const endY = Math.max(this.toolOptions.select.y + this.toolOptions.select.height, y + this.gridSize);

            this.toolOptions.select = {
                x: startX,
                y: startY,
                width: endX - startX,
                height: endY - startY
            };
        } else {
            // New selection
            this.toolOptions.select = {
                x: x,
                y: y,
                width: this.gridSize,
                height: this.gridSize
            };
        }
    }

    /**
     * Execute an editor action
     * @param {Object} action - Action to execute
     */
    executeAction(action) {
        // Clear redo history if we're not at the latest state
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }

        // Add action to history
        this.history.push(action);
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        this.historyIndex = this.history.length - 1;

        // Execute the action
        this.applyAction(action);
    }

    /**
     * Apply an editor action
     * @param {Object} action - Action to apply
     */
    applyAction(action) {
        switch (action.type) {
            case 'paint':
                // Create new tile object
                const tile = new GameObject(
                    action.position.x + 1,
                    action.position.y + 1,
                    this.gridSize - 2,
                    this.gridSize - 2,
                    action.tile.color || 'red'
                );
                this.engine.addGameObject(tile);
                break;

            case 'erase':
                // Find and remove objects at position
                this.engine.gameObjects.forEach(obj => {
                    if (obj.x >= action.position.x &&
                        obj.x < action.position.x + this.gridSize &&
                        obj.y >= action.position.y &&
                        obj.y < action.position.y + this.gridSize) {
                        obj.destroy();
                    }
                });
                break;
        }
    }

    /**
     * Select a tool
     * @param {string} tool - Tool to select
     */
    selectTool(tool) {
        this.currentTool = tool;

        // Update UI
        document.querySelectorAll('#editor-tools [data-tool]').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.tool === tool)
        );
    }

    /**
     * Select a layer
     * @param {string} layer - Layer to select
     */
    selectLayer(layer) {
        this.currentLayer = layer;

        // Update UI
        document.querySelectorAll('#editor-tools [data-layer]').forEach(btn =>
            btn.classList.toggle('active', btn.dataset.layer === layer)
        );
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboardShortcut(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'z':
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    e.preventDefault();
                    break;
                case 'c':
                    this.copy();
                    e.preventDefault();
                    break;
                case 'v':
                    this.paste();
                    e.preventDefault();
                    break;
                case 'x':
                    this.cut();
                    e.preventDefault();
                    break;
            }
        }
    }

    /**
     * Undo last action
     */
    undo() {
        if (this.historyIndex >= 0) {
            // TODO: Implement undo logic
            this.historyIndex--;
        }
    }

    /**
     * Redo last undone action
     */
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            // TODO: Implement redo logic
            this.historyIndex++;
        }
    }

    /**
     * Copy selected tiles
     */
    copy() {
        // TODO: Implement copy logic
    }

    /**
     * Cut selected tiles
     */
    cut() {
        this.copy();
        // TODO: Implement cut logic
    }

    /**
     * Paste copied tiles
     */
    paste() {
        // TODO: Implement paste logic
    }

    /**
     * Clean up edit mode
     */
    cleanup() {
        // Remove editor-specific event listeners
        // Clear selection
        this.toolOptions.select = { x: 0, y: 0, width: 0, height: 0 };
        document.getElementById('editor-tools').style.display = 'none';
    }

    /**
     * Save editor state
     * @returns {Object} Editor state data
     */
    saveState() {
        return {
            currentTool: this.currentTool,
            currentLayer: this.currentLayer,
            layerVisibility: { ...this.layerVisibility },
            toolOptions: { ...this.toolOptions },
            // Add additional state data as needed
        };
    }

    /**
     * Load editor state
     * @param {Object} state - Editor state to load
     */
    loadState(state) {
        if (!state) return;

        this.currentTool = state.currentTool;
        this.currentLayer = state.currentLayer;
        Object.assign(this.layerVisibility, state.layerVisibility);
        Object.assign(this.toolOptions, state.toolOptions);
    }
}

export default EditMode;
