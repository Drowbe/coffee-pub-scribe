# Coffee Pub Scribe - Blacksmith API Migration Plan

## **Overview**
This document outlines the comprehensive migration plan for integrating Coffee Pub Scribe with the Coffee Pub Blacksmith API. The goal is to replace custom implementations with standardized Blacksmith utilities while preserving unique module functionality. See the updated API docs for details and capabilities: [Blacksmith API Documentation](https://github.com/Drowbe/coffee-pub-blacksmith/wiki/Blacksmith-API).

## **Current State Analysis**

### **What's Already Working**
✅ **Blacksmith API Integration**: Quick Start steps completed  
✅ **Module Registration**: Successfully registered with Blacksmith  
✅ **API Testing**: Comprehensive test suite in place and working  
✅ **Dependencies**: Properly configured in module.json  

### **What Needs Migration**
🔄 **Console/Notification System**: Replace custom `postConsoleAndNotification`  
🔄 **Settings Management**: Integrate with Blacksmith's safe settings system  
🔄 **Constants & Assets**: Adopt `BlacksmithConstants` and the new Asset Lookup Tool for themes, sounds, images; keep `COFFEEPUB` only for backward compatibility  
🔄 **Sound System**: Update sound playback to use Blacksmith utilities and asset constants  
🔄 **Hook Management**: Replace custom hooks with `BlacksmithHookManager`  
🔄 **Utility Functions**: Audit and replace with Blacksmith equivalents  

## **Migration Phases**

### **Phase 1: Settings & Configuration (Low Risk)**
**Goal**: Replace all settings management with Blacksmith's safe settings system

**Changes Required**:
- Replace `game.settings.get()` calls with `BlacksmithUtils.getSettingSafely()`
- Replace `game.settings.set()` calls with `BlacksmithUtils.setSettingSafely()`
- Update settings registration to use Blacksmith patterns
- Integrate theme choices with `BlacksmithConstants.arrThemeChoices` (or via Asset Lookup Tool-provided choices)

**Files Affected**:
- `scripts/settings.js` - Settings registration and management
- `scripts/scribe.js` - Settings access throughout the code
- `scripts/global.js` - Settings-related utility functions

**Risk Level**: 🟢 **LOW** - Settings are straightforward to migrate

---

### **Phase 2: Console & Logging System (Low Risk)**
**Goal**: Replace custom console system with Blacksmith's standardized logging

**Changes Required**:
- Replace all `postConsoleAndNotification()` calls with `BlacksmithUtils.postConsoleAndNotification()`
- Update function signatures to match Blacksmith API
- Remove custom console styling and formatting logic
- Integrate with Blacksmith's debug and notification systems

**Files Affected**:
- `scripts/global.js` - Remove custom console implementation
- `scripts/scribe.js` - Update all logging calls
- `scripts/settings.js` - Update logging calls

**Risk Level**: 🟢 **LOW** - Direct function replacement

---

### **Phase 3: Constants, Asset Lookup & Theme System (Low Risk)**
**Goal**: Migrate from custom constants to Blacksmith's centralized constants and Asset Lookup Tool

**Changes Required**:
- Replace `COFFEEPUB.arrTHEMECHOICES` with `BlacksmithConstants.arrThemeChoices` (backed by new id/value/path data)
- Replace `COFFEEPUB.arrSOUNDCHOICES` with `BlacksmithConstants.arrSoundChoices`
- Use the Asset Lookup Tool to fetch assets by type/tags for dynamic needs (sounds, images, themes)
- Maintain backward compatibility by tolerating existing `COFFEEPUB` references where necessary
- Preserve custom theme CSS files (they're working well)

**Files Affected**:
- `scripts/global.js` - Constants definitions and Blacksmith hook updates
- `scripts/settings.js` - Theme choice arrays
- `scripts/scribe.js` - Theme switching logic

**Risk Level**: 🟢 **LOW** - Constants migration is completed in Blacksmith

---

### **Phase 4: Sound & Media System (Low Risk)**
**Goal**: Replace custom sound functions with Blacksmith utilities

**Changes Required**:
- Replace custom `playSound()` with `BlacksmithUtils.playSound()`
- Update sound/image references to use Blacksmith constants or Asset Lookup Tool results
- Remove custom volume clamping and error handling
- Integrate with Blacksmith's sound management

**Files Affected**:
- `scripts/global.js` - Remove custom sound implementation
- `scripts/scribe.js` - Update sound function calls

**Risk Level**: 🟢 **LOW** - Direct function replacement

---

### **Phase 5: Hook Management (Medium Risk)**
**Goal**: Replace custom hook registration with Blacksmith's hook manager

**Changes Required**:
- Replace `Hooks.on()` calls with `BlacksmithHookManager.registerHook()`
- Implement proper context-based cleanup
- Add priority and description parameters
- Use Blacksmith's hook lifecycle management

**Files Affected**:
- `scripts/scribe.js` - All hook registrations
- `scripts/global.js` - Blacksmith update hooks

**Risk Level**: 🟡 **MEDIUM** - Need to ensure hooks continue firing correctly

---

### **Phase 6: Utility Functions Audit (Variable Risk)**
**Goal**: Identify and replace utility functions with Blacksmith equivalents

**Process**:
- Audit each utility function in `global.js`
- Check against BlacksmithUtils availability
- Replace where equivalents exist
- Keep unique functions that don't have Blacksmith equivalents
- Identify functions that could be contributed to Blacksmith

**Functions to Audit**:
- `convertSecondsToString()` - Time formatting utility
- `objectToString()` / `stringToObject()` - Serialization utilities
- `toSentenceCase()` - Text formatting utility
- `getActorId()` - Actor lookup utility
- `getTokenImage()` / `getPortraitImage()` - Image utilities
- `getTokenId()` - Token lookup utility
- `trimString()` - Text truncation utility
- `generateFormattedDate()` - Date formatting utility
- `rollCoffeePubDice()` - Dice rolling utility

**Risk Level**: 🟡 **MEDIUM** - Need to verify each function individually

---

### **Phase 7: Cleanup & Optimization (Low Risk)**
**Goal**: Remove unused code and optimize performance

**Changes Required**:
- Remove unused OpenAI integration code
- Clean up unused imports and dependencies
- Remove custom COFFEEPUB variable system
- Optimize Blacksmith integration patterns
- Update documentation

**Files Affected**:
- `scripts/global.js` - Major cleanup
- `scripts/scribe.js` - Import cleanup
- `scripts/settings.js` - Import cleanup

**Risk Level**: 🟢 **LOW** - Removing unused code

---

### **Phase 8: Testing & Validation (Critical)**
**Goal**: Ensure all functionality works after migration

**Testing Requirements**:
- Test all theme switching functionality
- Verify sound playback works correctly
- Test settings persistence and loading
- Verify hook functionality
- Test console logging and notifications
- Validate export functionality
- Test all utility functions

**Risk Level**: 🔴 **HIGH** - Critical for production readiness

## **Risk Assessment Summary**

| Phase | Risk Level | Impact | Effort |
|-------|------------|---------|---------|
| Settings | 🟢 LOW | Medium | Low |
| Console | 🟢 LOW | High | Low |
| Constants | 🟢 LOW | Medium | Low |
| Sound | 🟢 LOW | Low | Low |
| Hooks | 🟡 MEDIUM | High | Medium |
| Utilities | 🟡 MEDIUM | Medium | High |
| Cleanup | 🟢 LOW | Low | Low |
| Testing | 🔴 HIGH | Critical | High |

## **Success Criteria**

### **Phase Completion Criteria**
- [ ] All settings use Blacksmith safe settings
- [ ] All console calls use Blacksmith logging
- [ ] All constants use Blacksmith constants
- [ ] All sound calls use Blacksmith utilities
- [ ] All hooks use Blacksmith hook manager
- [ ] All utility functions audited and migrated
- [ ] Unused code removed
- [ ] All functionality tested and working

### **Quality Gates**
- [ ] No console errors in browser
- [ ] All settings persist correctly
- [ ] All themes switch properly
- [ ] All sounds play correctly
- [ ] All hooks fire as expected
- [ ] Export functionality works
- [ ] Performance maintained or improved

## **Contribution Opportunities**

### **Functions to Evaluate for Blacksmith Contribution**
Based on initial analysis, these functions may be valuable to the broader ecosystem:

1. **`convertSecondsToString()`** - Time formatting utility
2. **`objectToString()` / `stringToObject()`** - Serialization utilities
3. **`toSentenceCase()`** - Text formatting utility
4. **`trimString()`** - Text truncation utility
5. **`generateFormattedDate()`** - Date formatting utility

### **Contribution Process**
1. Audit each function for uniqueness and value
2. Check if similar functionality exists in Blacksmith
3. Prepare functions for contribution (documentation, tests)
4. Submit to Blacksmith team for review

## **Timeline Estimate**

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Settings | 1-2 days | None |
| Console | 1-2 days | None |
| Constants | 2-3 days | Settings phase |
| Sound | 1 day | None |
| Hooks | 2-3 days | None |
| Utilities | 3-5 days | None |
| Cleanup | 1-2 days | All previous phases |
| Testing | 2-4 days | All previous phases |

**Total Estimated Duration**: 11-22 days

## **Next Steps**

1. **Complete utility function audit** to identify Blacksmith equivalents
2. **Begin Phase 1 (Settings)** implementation
3. **Set up testing framework** for each phase
4. **Establish rollback procedures** for each phase
5. **Begin phased migration** following this plan

---

## Notes from Updated API Documentation

- The constants migration is complete: all sound, image, theme, and volume constants are now exposed via `BlacksmithConstants`, with backward compatibility for `COFFEEPUB` where applicable. An Asset Lookup Tool is available to query assets by type and tags and to retrieve UI-ready choices. See: [Blacksmith API Documentation](https://github.com/Drowbe/coffee-pub-blacksmith/wiki/Blacksmith-API).

---

**Document Version**: 1.0  
**Last Updated**: Current session  
**Status**: Planning phase - Ready for implementation  
**Next Milestone**: Complete utility function audit
