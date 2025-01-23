# LightSeeker

A browser-based game engine and editor for creating 2D pixel-perfect games. Built with HTML5 Canvas API, LightSeeker provides an intuitive interface for game development with no coding required.

## Project Structure

```
lightseeker/
├── scripts/
│   ├── core/               # Core engine systems
│   │   ├── engine.js      # Main game engine (canvas, loop, scene management)
│   │   ├── collision.js   # Collision detection system
│   │   └── input.js       # Input handling (keyboard, touch)
│   ├── entities/          # Game object implementations
│   │   ├── base/
│   │   │   ├── gameObject.js  # Base class for all game objects
│   │   │   └── sprite.js      # Sprite system for animations
│   │   └── characters/
│   │       └── player.js      # Player character implementation
│   └── modes/             # Game modes
│       ├── play/
│       │   └── playMode.js    # Gameplay mode
│       └── edit/
│           └── editMode.js    # Map editor mode
├── assets/               # Game assets (images, sprites)
└── styles/              # CSS stylesheets
```

## Core Systems

### Engine (engine.js)
- Canvas management and game loop
- Scene management system
- Debug mode with performance monitoring
- Responsive canvas scaling
- Game object lifecycle management

### GameObject System (gameObject.js)
- Base class for all game entities
- Collision detection integration
- Debug visualization support
- Movement and position management
- Flexible update/draw lifecycle

### Sprite System (sprite.js)
- Animation management
- Support for SVG and bitmap sprites
- Component-based character customization
- Z-index layering system
- Frame-based animation control

### Player System (player.js)
- Character movement and animation
- Stats and inventory systems
- Equipment management
- Quest tracking
- Combat mechanics (damage/healing)

## Game Modes

### Play Mode (playMode.js)
- Gameplay scene management
- Player instance management
- Collision testing environment
- Game state save/load system
- Pause functionality

### Edit Mode (editMode.js)
- Grid-based map editor
- Multi-layer editing system
- Tool system (paint, erase, select)
- Undo/redo functionality
- Copy/paste operations
- Selection tools
- Grid visualization

## Features

### Core Engine
- Pixel-perfect rendering with HTML5 Canvas
- Debug mode with performance monitoring
- Scene management system
- Collision detection
- Input handling (keyboard/touch)

### Sprite System
- Frame-based animations
- SVG support
- Component-based customization
- Dynamic sprite composition

### Map Editor
- Grid-based placement
- Multi-layer management:
  - Ground layer
  - Object layer
  - Event layer
- Editing tools:
  - Paint/erase
  - Selection tools
  - Copy/paste
- Layer visibility controls

### Player Features
- Vector-based movement
- Animation states
- Inventory system
- Equipment management
- Stats system
- Quest tracking

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Use the mode switcher to toggle between Play and Edit modes:
   - Play Mode: Test your game with keyboard or touch controls
   - Edit Mode: Create and modify maps with the built-in editor

## Development Status

The project is actively under development. Current focus areas:
- Enhanced sprite animation system
- Advanced collision detection
- Map save/load functionality
- UI improvements
- Mobile touch controls optimization

See [TASKS.md](TASKS.md) for detailed development progress.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
