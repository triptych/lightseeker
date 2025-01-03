# Changelog

All notable changes to the LightSeeker project will be documented in this file.

## [Unreleased]

### Added
- Added README.md with project overview, features, and setup instructions
- Added MIT License for 2025
- Marked completion of core engine setup tasks:
  - KAPLAY.js integration with pixel-perfect rendering
  - Basic map rendering system with layers
  - Vector-based character movement
- Marked completion of map editor features:
  - Grid-based placement system
  - Layer management
  - Basic editing tools
  - Tile palette system

### Added (Previous)
- Implemented mobile-friendly controls with virtual D-pad and action buttons
- Added responsive canvas scaling for better display across devices
- Created basic player movement system with keyboard and touch support

### Fixed
- Fixed canvas rendering issue (b687a5f) by correctly accessing canvas element from KAPLAY instance

## [0.1.0] - 2024-01-09

### Changed
- Updated design document (43f50f2) to reflect correct game concept:
  - Changed from puzzle-platformer to web-based RPG game making tool
  - Added Play Mode features (RPG gameplay, battles, quests)
  - Added Edit Mode tools (map editor, character creator, event system)
  - Updated technical implementation with KAPLAY.js integration
  - Added community features and sharing capabilities
  - Revised development timeline to reflect new scope
