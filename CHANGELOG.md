# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [13.0.0] - v13 Migration Begins

### Important Notice
- **v13 MIGRATION START:** This version begins the migration to FoundryVTT v13
- **Breaking Changes:** This version requires FoundryVTT v13.0.0 or later
- **v12 Support Ended:** v12.1.3-FINAL was the last version supporting FoundryVTT v12

### Changed
- **Minimum Core Version:** Updated to require FoundryVTT v13.0.0
- **Module Version:** Bumped to 13.0.0 to align with FoundryVTT v13
- **Compatibility:** Module now exclusively supports FoundryVTT v13

### Technical
- **Migration Status:** Beginning v13 migration work
- **Breaking Changes:** Will address v13 API changes including:
  - `getSceneControlButtons` hook API changes (controls from array to object)
  - jQuery removal (migrating to native DOM methods)
  - ApplicationV2 framework migration (planned for future versions)

## [12.1.3] - Final v12 Release

### Important Notice
- **FINAL v12 RELEASE:** This is the final build of Coffee Pub Scribe compatible with FoundryVTT v12
- **v13 Migration:** All future builds will require FoundryVTT v13 or later
- **Breaking Changes:** Users must upgrade to FoundryVTT v13 to use future versions of this module

### Changed
- **Documentation Updates:** Updated README.md and module.json to reflect v12.1.3 as the final v12 release
- **Compatibility Notice:** Added clear notice that v12.1.3 is the last version supporting FoundryVTT v12
- **Migration Preparation:** Module is now locked for v12 compatibility; v13 migration work will begin in next version

## [12.1.2] - Bugsquashing

## [12.1.1] - Beginning of migration to version 13

### New
- **Modified Compatability**: Mod now on track to support FoundryVTT version 13

## [12.1.0] - MAJOR UPDATE - Blacksmith API Migration

### Added
- **Blacksmith API Integration**: Complete integration with the Coffee Pub Blacksmith API for standardized utilities and enhanced functionality
- **Enhanced Module Relationships**: Updated module dependencies to use Blacksmith as a library dependency
- **Improved Author Information**: Enhanced author metadata with maintainer and contribution flags
- **Bug Reporting Integration**: Direct link to GitHub issues for streamlined bug reporting

### Changed
- **Version Numbering**: Updated to semantic versioning format (12.1.0)
- **Foundry Compatibility**: Updated maximum compatibility to FoundryVTT v12
- **Module Dependencies**: Changed Blacksmith relationship from 'module' to 'library' type
- **Author Structure**: Enhanced author array with detailed contribution information
- **Library Configuration**: Added empty library array for future extensibility
- **Settings Access**: Migrated all settings access to use `BlacksmithUtils.getSettingSafely()` with safe defaults
- **Console Logging**: Replaced custom logging with `BlacksmithUtils.postConsoleAndNotification()` for enhanced formatting
- **Sound Playback**: Migrated to `BlacksmithUtils.playSound()` with standardized COFFEEPUB constants
- **Hook Management**: Replaced native FoundryVTT hooks with `BlacksmithHookManager.registerHook()` for better management
- **Utility Functions**: Replaced custom utilities with Blacksmith API equivalents (e.g., `trimString`)

### Breaking Changes
- **Required Dependency**: Coffee Pub Blacksmith is now a required library dependency
- **Version Compatibility**: No longer compatible with FoundryVTT v13 (downgraded to v12)
- **API Changes**: All utility functions now accessed through Blacksmith API global objects
- **Settings Access**: Settings now use safe access patterns with default values
- **Hook Registration**: Hooks must be registered through Blacksmith Hook Manager

### Technical Details
- **Module Manifest**: Updated `module.json` with new structure and dependencies
- **Download Links**: Updated to use latest release pattern for automatic updates
- **Relationship Structure**: Reorganized module relationships for better dependency management
- **Code Architecture**: Complete migration from custom `global.js` to standardized Blacksmith API
- **File Structure**: Removed `scripts/global.js` as all functionality now provided by Blacksmith

### Migration Notes
- **Backward Compatibility**: Maintained through Blacksmith's API design
- **Performance**: No performance regressions expected
- **Testing**: Comprehensive API integration testing completed
- **Documentation**: Updated to reflect new Blacksmith API usage patterns

## [1.12.2] - 2024-01-XX

### Added
- Initial release of Coffee Pub Scribe module
- Journal toolbar functionality with narration, handout, export, and copy buttons
- Chat message illustration button integration
- Journal export functionality with HTML formatting
- UUID and Embed reference resolution for exported content
- Theme system with multiple CSS options
- Sound effects for user interactions

### Changed
- Various bug fixes and improvements

### Fixed
- Bug fixes and stability improvements
