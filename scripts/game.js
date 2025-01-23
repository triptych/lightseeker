/**
 * Main game entry point and mode management
 */

import Engine from './core/engine.js';
import InputManager from './core/input.js';
import CollisionManager from './core/collision.js';
import PlayMode from './modes/play/playMode.js';
import EditMode from './modes/edit/editMode.js';

class Game {
    /**
     * Initialize game systems
     */
    constructor() {
        // Initialize core systems
        this.engine = new Engine('game-container');
        this.engine.inputManager = new InputManager();
        this.engine.collisionManager = new CollisionManager();

        // Initialize modes
        this.playMode = new PlayMode(this.engine);
        this.editMode = new EditMode(this.engine);
        this.currentMode = 'play';

        // Set up mode switching
        this.setupModeControls();

        // Set up mobile controls
        this.engine.inputManager.setupMobileControls('.d-pad button', '.action-buttons button');

        // Start game loop
        this.engine.start();
    }

    /**
     * Set up mode switching controls
     */
    setupModeControls() {
        const playModeBtn = document.getElementById('play-mode');
        const editModeBtn = document.getElementById('edit-mode');

        playModeBtn.addEventListener('click', () => this.switchMode('play'));
        editModeBtn.addEventListener('click', () => this.switchMode('edit'));

        // Initialize in play mode
        this.switchMode('play');
    }

    /**
     * Switch between play and edit modes
     * @param {string} mode - Mode to switch to ('play' or 'edit')
     */
    switchMode(mode) {
        // Clean up current mode
        if (this.currentMode === 'play') {
            this.playMode.cleanup();
        } else {
            this.editMode.cleanup();
        }

        // Switch to new mode
        this.currentMode = mode;

        // Update UI
        const playModeBtn = document.getElementById('play-mode');
        const editModeBtn = document.getElementById('edit-mode');
        playModeBtn.classList.toggle('active', mode === 'play');
        editModeBtn.classList.toggle('active', mode === 'edit');

        // Initialize new mode
        if (mode === 'play') {
            this.playMode.initialize();
        } else {
            this.editMode.initialize();
        }
    }

    /**
     * Save current game state
     * @returns {Object} Complete game state
     */
    saveState() {
        return {
            mode: this.currentMode,
            playState: this.playMode.saveState(),
            editState: this.editMode.saveState()
        };
    }

    /**
     * Load a saved game state
     * @param {Object} state - State to load
     */
    loadState(state) {
        if (!state) return;

        // Switch to correct mode
        this.switchMode(state.mode);

        // Load mode-specific state
        if (state.playState) {
            this.playMode.loadState(state.playState);
        }
        if (state.editState) {
            this.editMode.loadState(state.editState);
        }
    }

    /**
     * Toggle debug mode
     */
    toggleDebug() {
        this.engine.toggleDebug();
    }
}

// Create and export game instance
const game = new Game();
export default game;

// Add debug mode toggle
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyD') {
        game.toggleDebug();
    }
});
