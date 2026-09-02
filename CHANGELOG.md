# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [13.1.1]

### Changed
- **Documentation adopts the suite-wide standard.** `documentation/` now carries `home.md`, `known-issues.md`, `TODO.md`, `architecture/`, `userguides/` and `assets/`, and the verification backlog moved to `testing/` at the repository root where the publisher cannot reach it. Two architecture documents were written from the code: `architecture-toolbar-discovery.md` covers the four overlapping discovery paths and the idempotence guards that keep them from stacking toolbars, and `architecture-narration-format.md` covers the blockquote grammar and its mapping to Blacksmith card parts. Seven user guides were written from `lang/en.json` and the source -- getting started, the journal toolbar, writing a scene, sharing to chat, handouts, exporting and printing, and settings -- covering every feature a user would name. None has been walked in a running world; `TODO.md` records which claims in each are unverified. Verified with `node tools/check-docs-structure.mjs`, which reports one expected failure described below and nothing else.
- **README rewritten as a product page** and now carries the suite's AI-assistance disclosure between its canonical markers.

### Known
- **The documentation checker exits non-zero, and the cause is upstream rather than here.** It flags
  `documentation/userguides/userguide-export.md:39`, the heading `## Open a whole journal for
  printing`, as a work-shaped section heading. It is not one. The check matches the word "Open" as
  the adjective in "Open work" and catches the verb, so it fires on exactly the task-shaped headings
  the user-guide rules require. Blacksmith has fixed this; the fix is not committed yet, so Scribe
  carries the last committed version of the checker. Scribe passes against the fixed version with no
  change to this repository. The heading is deliberately not reworded, because rewording it to satisfy
  a known upstream bug would produce a worse heading. Re-copy `tools/check-docs-structure.mjs` from
  Blacksmith once the fix lands and this clears itself.

### Added
- **Wiki publishing.** The five publisher files were copied from Blacksmith unaltered, `.gitattributes` first. Verified by comparing staged blobs against the hub's `HEAD`; all five are byte-identical. `sync-wiki.yml` triggers on `[main, master]`, so Scribe's `main` is covered.

### Removed
- **Five documents that were not a kind.** `migration-global.md` was a fork of a suite-wide guide that the hub does not itself carry, and had drifted to 1242 lines against Monarch's 762. `migration-to-13-plan.md` and `migration-verification-report.md` described a completed migration, which is history and belongs here. `journal-toolbar-v13-migration.md` was a generic how-to for other modules; its durable content was rewritten against the current code as `architecture-toolbar-discovery.md`. `ROADMAP.md` was forward-looking work, which is `TODO.md`.

## [13.1.0] - Chat cards on the Blacksmith parts system

### Changed
- **Chat cards are compositions, not HTML.** All three of Scribe's chat outputs — the narration card, the illustration card, and the handout notice — are now described as data and posted through Blacksmith's `chatCards.post()`. Blacksmith owns the card wrapper, the theme, and the message header; Scribe names the parts and supplies their content.
- **The narration blockquote is read, not forwarded.** Its conventions are Scribe's own — `h4` is the card title, `h5` titles the image beneath it, `hr` divides, and an `h6` is a line of conversation whose `<strong>` names the speaker and whose `<em>` marks an inner voice. Each is now mapped to the part that means the same thing (`header`, `image` with a caption, `section`, `panel` with a speech or thought icon) instead of being passed through as markup only Scribe could interpret. Runs of ordinary paragraphs still travel as `richtext`, which keeps the author's bold, italics and `@UUID` content links exactly as written.
- **Card style setting now names a Blacksmith theme.** `cardTheme` holds a Blacksmith card theme id rather than one of Scribe's stylesheet names, and no longer requires a reload — the theme is read when a card is posted. A world updated from an earlier Scribe holds a stylesheet name here, which is not a valid id; those cards follow the world default until the GM picks again.
- **Handout notice keeps the full journal title.** It is no longer trimmed to 75 characters on the way in. A card measures its own overflow and ellipsises with a tooltip carrying the whole text, which truncating first threw away.
- **Handout notice links the journal as a document row** rather than interpolating `@UUID` syntax into a paragraph.

### Fixed
- **Theme switching no longer stacks stylesheets.** `changeCSS()` built a `<link>` whose id was one file path and tested for another, so the guard never matched and the sheet `module.json` had already declared was never removed. Any card style other than Dark and Stormy left two live at once, the later one winning. The whole mechanism is gone rather than repaired — cards take their theme from Blacksmith now.
- **The illustration button survives a browser reload.** Its image URL travels as the card action's value and is handled by a handler registered at startup on every client, replacing the `data-image-url` attribute and the inline listener that only existed on the posting client's page. Buttons on messages posted before this version keep working.

### Removed
- **Seven stylesheets.** `cards.css` and the six `theme-*.css` files are gone, replaced by a single always-loaded `styles/default.css` — the same entry point Blacksmith, Bibliosoph and Squire use — carrying the journal, dialogue and common rules they all shared. **Foundry must be restarted, not just reloaded:** the `styles` entry in `module.json` is read when the server builds its module manifest, so a browser refresh still asks for the deleted `theme-dark.css` and leaves the journal toolbar unstyled. The six themes differed from one another in nothing but the colours of one chat button, which no longer exists.
- **The `coffeepub-hide-header` sentinel.** A card that wants no header simply does not compose one.

## [13.0.1] - Blacksmith bootstrap compatibility

### Fixed
- **Blacksmith registration:** Register via `coffee-pub-blacksmith` `module.api` (`registerModule` or `ModuleManager.registerModule`) instead of the `BlacksmithModuleManager` global at `ready`, avoiding `Cannot read properties of null (reading 'registerModule')` when Scribe’s `ready` ran before Blacksmith finished consumer setup.
- **Blacksmith globals at `ready`:** Main and observer `ready` handlers now `await BlacksmithAPI.waitForReady()` when Blacksmith is active before using `BlacksmithUtils` or `BlacksmithHookManager`, matching Blacksmith’s documented bootstrap order.

### Technical
- **Fallback registration:** If `api` registration is unavailable, the module waits for Blacksmith readiness and retries `api`, then falls back to `BlacksmithModuleManager` for older builds.


## [13.0.0] - v13 Migration

### Important Notice
- **v13 MIGRATION COMPLETE:** This version fully supports FoundryVTT v13
- **Breaking Changes:** This version requires FoundryVTT v13.0.0 or later
- **v12 Support Ended:** v12.1.3-FINAL was the last version supporting FoundryVTT v12

### Changed
- **Minimum Core Version:** Updated to require FoundryVTT v13.0.0
- **Module Version:** Bumped to 13.0.0 to align with FoundryVTT v13
- **Compatibility:** Module now exclusively supports FoundryVTT v13

### Fixed
- **Journal Export Button Icon:** Fixed Font Awesome icon structure to use `<i>` element inside button (v13 compatibility)
- **Journal Export Button Click Handler:** Fixed click event registration and journal ID extraction from form element
- **Journal Export Window Opening:** Fixed popup blocker issues by opening window synchronously during user interaction
- **Font Awesome Icons:** All icons now use FA6 `fa-solid` prefix for proper v13 compatibility

### Technical
- **jQuery Removal:** All DOM manipulation migrated to native JavaScript APIs
- **Hook Updates:** Updated hook implementations to work with v13 ApplicationV2 framework
- **MutationObserver Implementation:** Added MutationObserver as fallback for dynamic content rendering in v13
- **Font Awesome 6 Migration:** All Font Awesome icons migrated from FA5 to FA6 format

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
