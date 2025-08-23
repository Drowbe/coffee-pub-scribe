# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [12.1.0] - MAJOR UPDATE - Blacksmith API Migration

### Added
- **Blacksmith API Integration**: Complete migration to the new Coffee Pub Blacksmith API system
- **Enhanced Module Relationships**: Added comprehensive module recommendations including Coffee Pub Monarch, Squire, and other ecosystem modules
- **Improved Author Information**: Enhanced author profiles with Discord, GitHub, Patreon, and Reddit links for better community engagement
- **Bug Reporting Integration**: Added direct GitHub Issues link for streamlined bug reporting and feature requests

### Changed
- **Version Numbering**: Migrated from semantic versioning (1.12.2) to Foundry VTT version-based numbering (12.1.0)
- **Foundry Compatibility**: Updated compatibility to focus on Foundry VTT v12, removing v13 maximum compatibility
- **Module Dependencies**: Restructured module relationships with Coffee Pub Blacksmith as a required dependency
- **Author Structure**: Enhanced author information with comprehensive social media and contribution details
- **Library Configuration**: Updated library field to use array format for future extensibility

### Breaking Changes
- **Required Dependency**: Coffee Pub Blacksmith is now a required dependency for this module to function
- **Version Compatibility**: Module now requires Foundry VTT v12 specifically
- **API Changes**: Internal API changes to support the new Blacksmith system

### Technical Details
- **Module Manifest**: Updated to use latest release manifest URLs
- **Download Links**: Streamlined release and download URLs for better distribution
- **Relationship Structure**: Reorganized module relationships for improved dependency management

## [1.12.2] - Journal Export Enhancements

### Added
- Export now recursively resolves all `@UUID` and `@Embed` references, even nested or inline, in journal content.
- UUID links with display text (e.g., `@UUID[...]{text}`) are now rendered as bold, colored text instead of links.
- Export button is now visible to GMs, Assistant GMs, Trusted Players, and any player with permission to view the journal.
- Added and updated CSS for resolved content and UUID link text in both embedded and export stylesheets.

### Fixed
- Improved error handling for export button setup to prevent console errors if the button is missing.
- Refactored code for better reliability and maintainability.

### Known Issues
- A harmless console error from Foundry core may still appear if the export button is removed during re-render.

## [1.12.1] - Journal Export

### Added
- Export button added to the journal titlebar, styled to match other header controls, labeled "Export" with an export icon (fa-cloud-arrow-down).
- Exported journals open in a new browser tab as clean, print-optimized HTML.
- Each exported journal page is styled for clarity and print-friendliness, including page breaks and responsive design.
- Top-level section numbers are automatically prepended to the first <h2> of each exported journal page, starting from 0, to match map and navigation correlation.
- Export/print removes Scribe toolbars and extraneous UI for a clean output.
- All export/print CSS is now namespaced under `.coffee-pub-scribe-export` for style isolation and maintainability.
- Exported section numbers are now rendered as a styled <div> for improved appearance.
- The first <h2> in each exported page now receives a `.scribe-export-title` class for targeted styling.
- Export/print view uses improved fonts, layout, and color for better readability and aesthetics.

### Changed
- Improved UI integration for export functionality in the journal window.
- CSS for export button and print/export output refined for consistency and usability.
- Export button event handling is now robust and compatible with Foundry VTT's internal quirks (assigns `onclick` directly and defensively).

### Fixed
- Exported journal numbering now matches the order and structure of the in-app navigation and map references.
- Export/print CSS no longer conflicts with other modules or Foundry styles due to namespacing.

## [0.2.0] - 2024-03-19

### Added
- Journal toolbars for enhanced interaction
- Send journal images to chat functionality
- Send journal narration to chat functionality
- Clickable chat images for larger view
- Handouts functionality for narration blocks
- GitHub Actions automated release workflow
- Proper module dependencies and recommendations
- Complete module manifest URLs for Foundry VTT compatibility

### Changed
- Updated module compatibility for Foundry VTT v12-13
- Improved documentation and README structure
- Enhanced module relationships with other Coffee Pub modules

## [0.1.2] - 2024

### Changed
- Renamed module from "Journals" to "Scribe"
- Unified card themes for consistent appearance

### Added
- Settings panel for card customization
- Margin controls for fine-tuning card alignment in chat

## [0.1.1] - 2024

### Added
- Basic styling implementation
- Initial card formatting

## [0.1.0] - 2024

### Added
- Initial release
- Basic module structure
- Core functionality framework
