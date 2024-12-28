# KAPLAY.js API Summary

KAPLAY.js is a game development framework that provides a comprehensive set of tools for 2D game development. Here's a summary of its key functions and capabilities:

## Core Functions

- `kaplay()` - Initialize KAPLAY context, the starting point of all KAPLAY games
- `add()` - Add game objects to the scene with components
- `make()` - Create game objects without adding them to scene
- `get()` - Get game objects by tag
- `destroy()` - Remove game objects
- `quit()` - End everything

## Game Objects & Components

- `pos()` - Position component
- `sprite()` - Sprite rendering component
- `area()` - Collision detection component
- `body()` - Physics body component
- `scale()` - Scale component
- `rotate()` - Rotation component
- `color()` - Color component
- `text()` - Text rendering component
- `health()` - Health/damage component
- `timer()` - Timer functionality component

## Input Handling

- `onKeyPress()` - Key press events
- `onKeyDown()` - Key held down events
- `onMouseDown()` - Mouse button events
- `onMouseMove()` - Mouse movement events
- `onClick()` - Click events
- `onGamepadButtonPress()` - Gamepad button events

## Scene Management

- `scene()` - Define a scene
- `go()` - Switch to a scene
- `addLevel()` - Create a level from a tile map
- `layers()` - Define render layers

## Audio

- `loadSound()` - Load sound effects
- `loadMusic()` - Load music
- `play()` - Play audio
- `volume()` - Control volume

## Graphics

- `loadSprite()` - Load sprite images
- `drawSprite()` - Draw sprites
- `drawText()` - Draw text
- `drawRect()` - Draw rectangles
- `drawCircle()` - Draw circles
- `drawLine()` - Draw lines

## Camera

- `camPos()` - Control camera position
- `camScale()` - Control camera zoom
- `camRot()` - Control camera rotation
- `shake()` - Screen shake effect

## Architecture

The framework uses a component-based architecture where game objects are created by combining different components like position, sprites, collision, etc. This modular approach allows for flexible and reusable game object creation.
