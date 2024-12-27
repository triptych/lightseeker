# LightSeeker - Web RPG Game Development Prompt

## Game Concept
LightSeeker is a web-based RPG game that combines the depth of RPG Maker with the simplicity of Bitsy. Players can:
- Play pre-made RPG adventures
- Create their own games using built-in tools
- Share their creations with the community

## Key Features
### Play Mode
- Explore interactive RPG worlds
- Engage in turn-based battles
- Manage character inventory and stats
- Experience story-driven quests

### Edit Mode
- Pixel-based map editor
- Event scripting system
- Character and NPC creation
- Inventory system design
- Simple music composition tool
- Dialogue and quest creation

## Technical Requirements
### Core Technologies
- HTML5 Canvas for rendering
- JavaScript (ES6+) for game logic
- WebGL for enhanced graphics
- Web Audio API for sound
- LocalStorage for game saves
- IndexedDB for user creations

### Architecture
- Component-based architecture
- State management using Redux
- Modular game systems
- Plugin system for extensibility

## Web Development Best Practices
1. Responsive Design
   - Support desktop and mobile play
   - Adaptive UI for edit mode tools

2. Performance Optimization
   - Efficient rendering with requestAnimationFrame
   - Web Workers for background tasks
   - Lazy loading of assets

3. Accessibility
   - Keyboard navigation support
   - Screen reader compatibility
   - Color contrast considerations

4. Security
   - Sanitize user-generated content
   - Implement CSP headers
   - Validate all user inputs

5. Progressive Web App
   - Offline capabilities
   - Installable on devices
   - Background sync for cloud saves

## Implementation Details
### Play Mode Components
- KAPLAY Game Engine Core
  - Component-based object system
  - Event-driven update loop
  - Built-in collision detection
  - Vector-based movement
- Battle System using KAPLAY components
  - Turn-based combat logic
  - Collision-based interaction
  - State management for battle flow
- Inventory Management
  - Parent-child relationships for item ownership
  - Component-based item properties
- Quest System
  - Event-driven progression tracking
  - State management through components

### Edit Mode Components
- Map Editor
  - KAPLAY's crisp rendering for pixel-perfect display
  - Custom cursor implementation for tool interaction
  - Grid-based placement system
- Pixel Art Tool
  - Scale-aware rendering for precise editing
  - Custom components for tool behaviors
- Event Scripting Interface
  - Component-based event system
  - Visual node editor using KAPLAY's UI components
- Character Creator
  - Composite sprite system
  - Real-time preview using KAPLAY's rendering
- Music Composer
  - Web Audio integration
  - Visual timeline editor

## Tools and Libraries
- KAPLAY.js for core game engine
  - Pixel-perfect rendering with crisp mode
  - Built-in collision detection for circles and ellipses
  - Component-based architecture
  - Debug mode for development
- Tone.js for audio
- Webpack for bundling
- Jest for testing

## KAPLAY.js Integration
### Core Setup
```javascript
// Initialize game with pixel-perfect rendering
kaplay({
    width: 800,
    height: 600,
    scale: 2,
    crisp: true,
    letterbox: true,
    debug: true
})
```

### Game Components
- Utilize KAPLAY's component system for:
  - Shape-based collision detection
  - Parent-child object relationships
  - Custom cursor implementation for UI
  - Vector-based movement and positioning

### Performance Optimizations
- Proper scale values for pixel art
- Letterbox mode for consistent display
- Efficient object management using KAPLAY's add() system
- Debug mode for development and testing

## Code Organization
```
/src
  /components
  /systems
  /assets
  /utils
  /tests
```

## Development Milestones
1. Core game engine
2. Play mode implementation
3. Edit mode tools
4. UI/UX polish
5. Community features
6. Performance optimization
7. Documentation and tutorials

## Quality Assurance
- Unit testing for core systems
- Integration testing for game flow
- User testing for edit mode tools
- Performance profiling
- Cross-browser compatibility testing

## Documentation
- API documentation for modding
- User guides for both play and edit modes
- Tutorials for game creation
- Developer documentation for contributors
