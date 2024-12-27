# KAPLAY.js Reference Guide

## Overview
KAPLAY.js is an open-source (MIT) game development library designed for creating browser-based games.

## Installation & Setup

### Basic Initialization
```javascript
// Start KAPLAY with default options (creates a fullscreen canvas)
kaplay()

// Init with custom options
kaplay({
    width: number,    // Width of game
    height: number,   // Height of game
    scale: number,    // Pixel scale/size
})
```

## Configuration Options (KAPLAYOpt)

### Core Settings
- `width?: number` - Width of game
- `height?: number` - Height of game
- `scale?: number` - Pixel scale/size
- `stretch?: boolean` - If stretch canvas to container when width and height is specified
- `letterbox?: boolean` - When stretching, keep aspect ratio and leave black bars on remaining spaces
- `crisp?: boolean` - Disable antialiasing and enable sharp pixel display
- `debug?: boolean` - If register debug buttons (default true)
- `debugKey?: Key` - Key that toggles debug mode
- `font?: string` - Default font (defaults to "monospace")

### Canvas and Display Settings
- `canvas?: HTMLCanvasElement` - The canvas DOM element to use. If empty will create one
- `root?: HTMLElement` - The container DOM element to insert the canvas if created. Defaults to document.body
- `background?: RGBValue | RGBAValue | string` - Background color. Can be specified as:
  - RGB array: `[r, g, b]` where values are 0-255
  - RGBA array: `[r, g, b, a]` where alpha is 0-1
  - CSS color string: e.g. "#ff0000" or "red"
- `crisp?: boolean` - Disable antialiasing and enable sharp pixel display for retro-style graphics

## Core Functions

### Game Loop and Event Functions
```javascript
// All KAPLAY functions are imported to global after calling kaplay()
add()        // Add a game object
onUpdate()   // Update loop handler
onKeyPress() // Key press event handler
vec2()       // Create a 2D vector

// If you want to prevent KAPLAY from importing all functions to global:
const k = kaplay({ global: false })
k.add(...)
k.onUpdate(...)
k.onKeyPress(...)
k.vec2(...)
```

### Shape Components and Collision
```javascript
// Shape Components
ellipse()    // Create an ellipse component
area()       // Get area of shapes (supports circle shapes)
clipLineToRect() // Clip a line to a rectangle

// Collision Detection
// The engine supports circle and rotated ellipse collision shapes
```

### Game Object Management
```javascript
// Object Manipulation
obj.setParent()  // Change the parent of a game object

// Mouse Cursor Control
fakeMouse()      // Create a fake mouse cursor
myCursor.press() // Trigger onclick events if mouse is over
myCursor.release() // Release mouse press

// Example: Custom Cursor
const myCursor = add([
    fakeMouse(),
    sprite("cat"),
    pos(100, 100)
]);
```

### Utility Functions
```javascript
quit(): void  // End everything
```

## Types

### Component Types
```typescript
ellipse()    // Ellipse component type
fakeMouse()  // Fake mouse cursor component type
```

### Vector Types
```typescript
vec2(x: number, y: number)  // 2D vector creation
```

### Plugin Types
```typescript
TPlugin       // Plugin type definition
TButtonDef    // Button definition type
```

## Best Practices
1. Use the global functions when possible for cleaner code
2. Configure debug mode during development
3. Use proper scaling for pixel-perfect rendering
4. Enable crisp mode for retro-style pixel art games
5. Use letterbox mode when you need to maintain aspect ratio
6. Handle cleanup with quit() when needed

## Performance Tips
1. Use appropriate scale values for your game's pixel art style
2. Enable crisp mode only when needed for pixel art
3. Consider using letterbox mode for consistent display across different screen sizes
4. Set appropriate canvas dimensions based on your game's requirements

## Version Information
Current Version: v4000 alpha

## Community and Support

### Resources
- GitHub Repository: Source code and issue tracking
- Discord Community: Real-time support and discussions
- KA-PLAYGROUND: Interactive examples and game demos

### Contributing
KAPLAY.js is open source under the MIT license. Contributions are welcome through:
- Bug reports and feature requests on GitHub
- Pull requests for improvements
- Community plugins and extensions
- Documentation improvements

### Support Channels
- Discord server for community discussions
- GitHub issues for bug reports
- KA-PLAYGROUND for learning and experimentation
