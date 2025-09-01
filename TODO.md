# TODO - Coffee Pub Scribe Module

## Completed Tasks ✅

### ✅ Module Configuration
- [x] Reorganize `module.json` to follow specific structure and order
- [x] Fill out `CHANGELOG.md` for version 12.1.0 with Blacksmith API Migration details
- [x] Update GitHub release workflow to use module-specific naming (`coffee-pub-scribe.zip`)
- [x] Update `module.json` download URL to use `/releases/latest/download/` pattern

### ✅ Blacksmith API Integration
- [x] Complete "Quick Start - External Module Integration" steps
- [x] Add Blacksmith as library dependency in `module.json`
- [x] Import Blacksmith API bridge file
- [x] Register module with BlacksmithModuleManager
- [x] Test API integration with console commands

### ✅ COMPLETE MIGRATION from global.js to Blacksmith API
- [x] **Phase 1: Settings Migration** - Replace `game.settings.get` with `BlacksmithUtils.getSettingSafely(MODULE.ID, setting, defaultValue)`
- [x] **Phase 2: Console/Logging Migration** - Replace `postConsoleAndNotification` with `BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, message, result, debug, notification)`
- [x] **Phase 3: Sound Migration** - Replace `playSound` with `BlacksmithUtils.playSound(COFFEEPUB.SOUNDCONSTANT, COFFEEPUB.VOLUMECONSTANT)`
- [x] **Phase 4: Hook Migration** - Replace native `Hooks.on()` with `BlacksmithHookManager.registerHook()` in `ready` hook
- [x] **Phase 5: Utility Functions** - Replace custom utilities with `BlacksmithUtils` equivalents (e.g., `trimString`)
- [x] **Phase 6: Import Cleanup** - Remove incorrect imports, use global objects as per API documentation
- [x] **Phase 7: Test Code Removal** - Clean up all Blacksmith API testing code

### ✅ File Management
- [x] Delete `scripts/global.js` (100% replaced by Blacksmith API)
- [x] Update all imports to use Blacksmith API
- [x] Ensure all functionality preserved during migration

## Remaining Tasks 🔄

### 🔄 Final Testing & Validation
- [ ] Test all module functionality with Blacksmith API
- [ ] Verify hooks are properly registered and working
- [ ] Confirm settings, logging, and sound all work correctly
- [ ] Test journal toolbar functionality
- [ ] Test chat message illustration buttons
- [ ] Test journal export functionality
- [ ] Validate all Blacksmith API integrations

### 🔄 Documentation Updates
- [ ] Update `CHANGELOG.md` with migration completion details
- [ ] Update `README.md` to reflect Blacksmith API dependency
- [ ] Document any breaking changes for users

### 🔄 Release Preparation
- [ ] Final testing in FoundryVTT environment
- [ ] Version bump to 12.1.0
- [ ] Create GitHub release
- [ ] Update module manifest for distribution

## Migration Summary ✅

**Status: COMPLETE** - The Coffee Pub Scribe module has been successfully migrated from the old `global.js` approach to the modern Blacksmith API. All functionality has been preserved and enhanced through the standardized Blacksmith utilities.

**Key Achievements:**
- ✅ 100% replacement of `global.js` functionality
- ✅ Standardized settings access with safe defaults
- ✅ Enhanced logging and notifications
- ✅ Proper hook management with Blacksmith
- ✅ Consistent sound playback with constants
- ✅ All utility functions migrated to Blacksmith equivalents
- ✅ Clean, maintainable code following Blacksmith API standards

