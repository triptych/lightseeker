# Changelog

All notable changes to the LightSeeker project will be documented in this file.

## [Unreleased]

### Added

- Character system implementation with SVG-based assets
- README.md with project overview, features, and setup instructions
- MIT License for 2025
- Core engine setup features:
  - HTML5 Canvas API implementation with pixel-perfect rendering
  - Basic map rendering system with layers
  - Vector-based character movement
- Map editor features:
  - Grid-based placement system
  - Layer management
  - Basic editing tools
  - Tile palette system
- Mobile support features:
  - Virtual D-pad and action buttons
  - Responsive canvas scaling
  - Basic player movement with keyboard and touch support

### Fixed

- Canvas rendering issue (b687a5f) by correctly accessing canvas element and context

## [0.1.0] - 2024-01-09

### Changed

- Updated design document (43f50f2) to reflect correct game concept:
  - Changed from puzzle-platformer to web-based RPG game making tool
  - Added Play Mode features (RPG gameplay, battles, quests)
  - Added Edit Mode tools (map editor, character creator, event system)
  - Updated technical implementation with Canvas API
  - Added community features and sharing capabilities
  - Revised development timeline to reflect new scope
