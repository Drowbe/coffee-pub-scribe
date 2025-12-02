# Coffee Pub Scribe - v12 to v13 Migration Plan

> **Module:** coffee-pub-scribe  
> **Current Version:** 12.1.2  
> **Target Version:** 13.0.0  
> **Migration Date:** TBD  
> **Status:** Planning

---

## Executive Summary

This document outlines the migration plan for Coffee Pub Scribe from FoundryVTT v12 to v13. The migration focuses on removing jQuery dependencies, updating hook implementations to use native DOM APIs, and migrating Font Awesome 5 icons to Font Awesome 6.

### Key Findings

- **Primary Migration Area:** jQuery removal from hooks and DOM manipulation
- **Secondary Migration Area:** Font Awesome 5 to Font Awesome 6 icon updates
- **Files Requiring Changes:** 2 files (`scribe.js`, `dialogue-illustration.js`)
- **Hooks Affected:** 3 hooks (`renderChatMessage`, `renderJournalPageSheet`, `renderJournalSheet`)
- **FormApplication Classes:** 1 class (`ImageFormApplication`)
- **Font Awesome Icons Used:** 5 unique icons requiring updates
- **Breaking Changes Required:** jQuery removal, hook html parameter conversion, Font Awesome icon updates
- **No Issues Found:** No `getSceneControlButtons`, `FilePicker`, or `token.target` usage

---

## Pre-Migration Checklist

### 1. Lock Down v12 Release
- [x] Finalize and test current v12.1.2 version
- [x] Create git tag: `v12.1.2-FINAL`
- [x] Create GitHub release marking as final v12 version
- [x] Update README with v12 support end notice
- [x] Update CHANGELOG with final v12 release entry

### 2. Update Module Configuration
- [x] Update `module.json` minimum Core Version to `"13.0.0"`
- [x] Update `module.json` verified Core Version to `"13.0.0"`
- [x] Update module version to `13.0.0`
- [x] Review and update compatibility notes

### 3. Prepare Development Environment
- [x] Set up FoundryVTT v13 testing environment
- [x] Create feature branch: `v13-migration`
- [x] Document current functionality baseline

### 4. Audit Current Codebase
- [x] Search for jQuery usage: `html.find`, `$()`, `.each()`, `.append()`, etc.
- [x] Search for `getSceneControlButtons` hook implementations (none found)
- [x] Search for deprecated APIs: `Token#target`, `FilePicker`, etc. (none found)
- [x] Document all Application classes that extend `FormApplication` (1 found)
- [x] Search for Font Awesome icon usage: `fas`, `far`, `fal` prefixes (5 icons found)

---

## Font Awesome 5 to 6 Migration

### Overview

FoundryVTT v13 migrated from Font Awesome 5 to Font Awesome 6, requiring updates to icon class names and prefixes.

**Key Changes:**
- `fas` prefix → `fa-solid` prefix
- `far` prefix → `fa-regular` prefix
- `fal` prefix → Not available in Foundry's bundled subset
- Some icon names changed between FA5 and FA6
- Foundry includes a curated subset of FA6 icons (not all icons available)

### Icons Found in Codebase

The following Font Awesome icons are used in Coffee Pub Scribe and require updates:

| Current (FA5) | Location | FA6 Equivalent | Status |
|---------------|----------|----------------|--------|
| `fas fa-cloud-arrow-down` | `scribe.js` lines 180, 236, 254 | `fa-solid fa-cloud-arrow-down` | ✅ Icon name is valid FA6, just update prefix |
| `fas fa-theater-masks` | `scribe.js` lines 234, 303 | `fa-solid fa-masks-theater` | ⚠️ Name changed in FA6 |
| `fas fa-book-open` | `scribe.js` lines 235, 268 | `fa-solid fa-book-open` | ✅ Icon name unchanged, update prefix |
| `fas fa-clone` | `scribe.js` lines 237, 261, 290 | `fa-solid fa-clone` | ✅ Icon name unchanged, update prefix |
| `fas fa-paintbrush-pencil` | `scribe.js` lines 278, 281 | `fa-solid fa-paintbrush` or `fa-solid fa-pen` | ⚠️ Need to verify - may need alternative |

### Icon Migration Details

#### 1. `fa-cloud-arrow-down` ✅

**Current Usage:** Export buttons (journal header, toolbar)
- Lines 180, 236, 254

**FA6 Equivalent:** `fa-solid fa-cloud-arrow-down`

**Action Required:** Update prefix from `fas` to `fa-solid`

```javascript
// BEFORE (FA5)
'<i class="fas fa-cloud-arrow-down"></i> Export'

// AFTER (FA6)
'<i class="fa-solid fa-cloud-arrow-down"></i> Export'
```

#### 2. `fa-theater-masks` ⚠️

**Current Usage:** Narration button in toolbar
- Lines 234, 303

**FA6 Equivalent:** `fa-solid fa-masks-theater` (name reversed)

**Action Required:** Update prefix and icon name

```javascript
// BEFORE (FA5)
'<i class="fas fa-theater-masks"></i>'

// AFTER (FA6)
'<i class="fa-solid fa-masks-theater"></i>'
```

**Note:** Verify this icon is available in Foundry's bundled subset. If not available, consider alternative icons:
- `fa-solid fa-masks-theater` (if available)
- `fa-solid fa-theater-masks` (check if still supported)
- Alternative: `fa-solid fa-mask` or `fa-solid fa-drama-masks`

#### 3. `fa-book-open` ✅

**Current Usage:** Handout button in toolbar
- Lines 235, 268

**FA6 Equivalent:** `fa-solid fa-book-open`

**Action Required:** Update prefix from `fas` to `fa-solid`

```javascript
// BEFORE (FA5)
'<i class="fas fa-book-open"></i> Handout'

// AFTER (FA6)
'<i class="fa-solid fa-book-open"></i> Handout'
```

#### 4. `fa-clone` ✅

**Current Usage:** Copy button and illustration view button
- Lines 237, 261, 290

**FA6 Equivalent:** `fa-solid fa-clone`

**Action Required:** Update prefix from `fas` to `fa-solid`

```javascript
// BEFORE (FA5)
'<i class="fas fa-clone"></i>'

// AFTER (FA6)
'<i class="fa-solid fa-clone"></i>'
```

#### 5. `fa-paintbrush-pencil` ⚠️

**Current Usage:** Illustration button in toolbar
- Lines 278, 281

**FA6 Verification Needed:** This icon name needs verification

**Possible FA6 Equivalents:**
- `fa-solid fa-paintbrush` (standard paintbrush icon)
- `fa-solid fa-pen` (pen icon)
- `fa-solid fa-pencil` (pencil icon - may not exist)
- `fa-solid fa-pen-to-square` (edit icon)

**Action Required:** Verify icon availability and choose appropriate replacement

```javascript
// BEFORE (FA5)
'<i class="fas fa-paintbrush-pencil"></i>'

// AFTER (FA6) - TO BE VERIFIED
'<i class="fa-solid fa-paintbrush"></i>'
// OR
'<i class="fa-solid fa-pen"></i>'
```

**Recommendation:** Use `fa-solid fa-paintbrush` as closest match, or `fa-solid fa-pen` if paintbrush-pencil doesn't exist.

### Migration Pattern

**Search Pattern:**
```bash
# Find all Font Awesome usage
grep -r "fas fa-" scripts/
grep -r "far fa-" scripts/
grep -r "fal fa-" scripts/
```

**Replacement Pattern:**
```javascript
// Global find and replace
fas fa-  →  fa-solid fa-
far fa-  →  fa-regular fa-
```

**Manual Updates Required:**
- `fa-theater-masks` → `fa-masks-theater` (name changed)
- `fa-paintbrush-pencil` → verify and replace with appropriate FA6 icon

### Files Requiring Font Awesome Updates

#### `scripts/scribe.js`

**Line 180:** Export button in journal header
```javascript
// BEFORE
exportButton.innerHTML = '<i class="fas fa-cloud-arrow-down"></i> Export';

// AFTER
exportButton.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Export';
```

**Lines 234-237:** Toolbar button HTML strings
```javascript
// BEFORE
var buttonHTMLNarration = '<button ...><i class="fas fa-theater-masks"></i></button>';
var buttonHTMLHandout = '<button ...><i class="fas fa-book-open"></i></button>';
var buttonHTMLExport = '<button ...><i class="fas fa-cloud-arrow-down"></i></button>';
var buttonHTMLCopy = '<button ...><i class="fas fa-clone"></i></button>';

// AFTER
var buttonHTMLNarration = '<button ...><i class="fa-solid fa-masks-theater"></i></button>';
var buttonHTMLHandout = '<button ...><i class="fa-solid fa-book-open"></i></button>';
var buttonHTMLExport = '<button ...><i class="fa-solid fa-cloud-arrow-down"></i></button>';
var buttonHTMLCopy = '<button ...><i class="fa-solid fa-clone"></i></button>';
```

**Line 254:** Export button with label
```javascript
// BEFORE
buttonHTMLExport = '<button ...><i class="fas fa-cloud-arrow-down"></i> Export</button>';

// AFTER
buttonHTMLExport = '<button ...><i class="fa-solid fa-cloud-arrow-down"></i> Export</button>';
```

**Line 261:** Copy button with label
```javascript
// BEFORE
buttonHTMLCopy = '<button ...><i class="fas fa-clone"></i> Copy</button>';

// AFTER
buttonHTMLCopy = '<button ...><i class="fa-solid fa-clone"></i> Copy</button>';
```

**Line 268:** Handout button with label
```javascript
// BEFORE
buttonHTMLHandout = '<button ...><i class="fas fa-book-open"></i> Handout</button>';

// AFTER
buttonHTMLHandout = '<button ...><i class="fa-solid fa-book-open"></i> Handout</button>';
```

**Lines 278, 281:** Illustration button
```javascript
// BEFORE
let buttonHTMLIllustration = `<button ...><i class="fas fa-paintbrush-pencil"></i></button>`;

// AFTER (VERIFY ICON NAME)
let buttonHTMLIllustration = `<button ...><i class="fa-solid fa-paintbrush"></i></button>`;
```

**Line 290:** Illustration view button in chat
```javascript
// BEFORE
content: `...<button ...><i class="fas fa-clone"></i>View Illustration</button>...`;

// AFTER
content: `...<button ...><i class="fa-solid fa-clone"></i>View Illustration</button>...`;
```

**Line 303:** Narration button with label
```javascript
// BEFORE
buttonHTMLNarration = `<button ...><i class="fas fa-theater-masks"></i> Narration</button>`;

// AFTER
buttonHTMLNarration = `<button ...><i class="fa-solid fa-masks-theater"></i> Narration</button>`;
```

### Testing Checklist for Font Awesome Icons

- [x] All icons display correctly in journal toolbar
- [x] All icons display correctly in journal header
- [x] All icons display correctly in chat messages
- [x] Icons render with correct styling (solid style)
- [x] No broken/missing icon placeholders
- [x] Icon colors match theme correctly
- [x] Icons are properly sized
- [x] Verify `fa-masks-theater` is available in Foundry's FA6 subset
- [x] Verify `fa-paintbrush` or alternative is available
- [x] Test with all toolbar buttons enabled
- [x] Test with different button label configurations

**Status:** ✅ Complete - All Font Awesome icons working correctly with `"Font Awesome 6 Pro"` font-family

### Icon Verification Resources

- [Font Awesome 6 Icons](https://fontawesome.com/icons) - Search for icon names
- FoundryVTT v13 Release Notes - Check bundled icon subset
- Foundry Discord #dev-support - Verify icon availability
- Test in FoundryVTT v13 - Direct verification

### Estimated Time

- **Icon Audit & Research:** 1 hour
- **Code Updates:** 1 hour
- **Testing & Verification:** 1-2 hours
- **Total:** 3-4 hours

---

## Migration Breakdown by File

### File 1: `scripts/scribe.js`

**Priority:** CRITICAL  
**Complexity:** HIGH  
**Estimated Time:** 4-6 hours

#### Issues Found

1. **jQuery Usage in Hooks (CRITICAL)**
   - `renderChatMessage` hook uses `html.find()`, `.click()`
   - `renderJournalPageSheet` hook uses `html.find()`, `.on()`, `.each()`
   - `renderJournalSheet` hook uses `html.find()`, `.append()`, `.before()`

2. **jQuery DOM Manipulation (HIGH)**
   - Multiple `.find()` calls throughout
   - `.each()` iterations
   - `.append()`, `.before()` DOM insertion
   - `.click()` event handlers
   - `.clone()` operations
   - `.remove()` operations

3. **jQuery Wrapper Usage (MEDIUM)**
   - `$(document).ready()` in init hook (lines 54-56)
   - `$(this)` in `.each()` callbacks (lines 227, 276)
   - `$(blockquote)` wrapping (line 575)
   - `$(button)` data access (dialogue-illustration.js line 50)

#### Specific Changes Required

**Lines 54-56: Remove jQuery document ready**
```javascript
// BEFORE (v12)
Hooks.once('init', async () => {
    await $(document).ready(() => {
    });
});

// AFTER (v13)
Hooks.once('init', async () => {
    // Document is already ready by the time init hook fires
});
```

**Lines 77-86: renderChatMessage hook - Convert jQuery to native DOM**
- `html.find()` → `html.querySelectorAll()` or `html.querySelector()`
- `.click()` → `addEventListener('click')`
- Add jQuery detection pattern (see Pattern 10 in migration-global.md)

**Lines 95-148: renderJournalPageSheet hook - Convert jQuery to native DOM**
- `html.find()` → `html.querySelectorAll()` or `html.querySelector()`
- `.on('dblclick')` → `addEventListener('dblclick')`
- `.each()` → `forEach()`
- `html[0]` access → jQuery detection pattern for native DOM
- MutationObserver target - ensure native DOM element

**Lines 156-203: renderJournalSheet hook - Convert jQuery to native DOM**
- `html.find()` → `html.querySelectorAll()` or `html.querySelector()`
- `.append()`, `.before()` → `appendChild()`, `insertAdjacentElement()` or `insertAdjacentHTML()`
- `.find()[0]` → direct querySelector with jQuery detection

**Lines 223-349: addToolbarToBlockquotes function - Complete jQuery removal**
- `html.find("blockquote").each()` → `html.querySelectorAll("blockquote").forEach()`
- `$(this)` → use arrow function parameter directly
- `blockquote.find()` → `blockquote.querySelectorAll()` or `blockquote.querySelector()`
- `.append()` → `appendChild()` or `insertAdjacentHTML()`
- `.remove()` → `.remove()` (same API)
- `.click()` → `addEventListener('click')`
- `.attr()` → `getAttribute()` / `setAttribute()`
- `.html()` → `innerHTML`
- `.clone()` → `cloneNode(true)`

**Line 575: copyNarrationToClipboard function - Remove jQuery wrapper**
- `$(blockquote)` → use blockquote directly (it's already a DOM element)
- `.clone()` → `cloneNode(true)`
- `.html()` → `innerHTML`

#### Testing Requirements

- [ ] Chat message illustration buttons work correctly
- [ ] Journal page toolbar appears and functions correctly
- [ ] Journal export button appears and functions correctly
- [ ] Blockquote toolbars render and all buttons work
- [ ] Narration button sends content to chat
- [ ] Illustration buttons work correctly
- [ ] Handout button creates handouts correctly
- [ ] Export button exports HTML correctly
- [ ] Copy button copies to clipboard correctly
- [ ] MutationObserver works correctly when content changes
- [ ] Edit mode detection works correctly
- [ ] Double-click image handler works in editor

---

### File 2: `scripts/dialogue-illustration.js`

**Priority:** HIGH  
**Complexity:** MEDIUM  
**Estimated Time:** 2-3 hours

#### Issues Found

1. **FormApplication Class (HIGH)**
   - `ImageFormApplication` extends `FormApplication`
   - May need jQuery detection pattern for `this.element` (see Pattern 10 in migration-global.md)
   - Currently no `activateListeners` override, but may be needed

2. **jQuery Data Access (MEDIUM)**
   - Line 50: `$(button).data('imageUrl')` → use `button.getAttribute()` or `button.dataset`

#### Specific Changes Required

**Lines 11-41: ImageFormApplication class - Add jQuery detection (if needed)**
- Add `_getNativeElement()` helper method for jQuery detection (defensive, see Pattern 10)
- Monitor for any `this.element` usage that might need conversion

**Line 50: showDialogueFromImageButton function - Convert jQuery data access**
```javascript
// BEFORE (v12)
const imageUrl = $(button).data('imageUrl');

// AFTER (v13)
const imageUrl = button.getAttribute('image-url') || button.dataset.imageUrl;
```

#### Testing Requirements

- [ ] Image dialogue form opens correctly
- [ ] Image URL is correctly extracted from button
- [ ] FormApplication renders correctly
- [ ] Form submission works (if applicable)

---

## Migration Strategy

### Phase 1: Preparation (1-2 hours)
1. Create v13 test environment
2. Lock down v12.1.2 release
3. Update module.json configuration
4. Create feature branch

### Phase 2: Critical Path Migration (4-6 hours)
1. **File 1: scribe.js - Hook Conversions**
   - Convert `renderChatMessage` hook
   - Convert `renderJournalPageSheet` hook
   - Convert `renderJournalSheet` hook
   - Test each hook individually

2. **File 1: scribe.js - Core Functions**
   - Convert `addToolbarToBlockquotes` function
   - Convert `copyNarrationToClipboard` function
   - Remove `$(document).ready()` wrapper
   - Test functionality

### Phase 3: Font Awesome Migration (3-4 hours) ✅ COMPLETE
1. **Icon Research & Verification** ✅
   - ✅ Verified all icon names are valid in FA6
   - ✅ Checked Foundry's bundled icon subset
   - ✅ Identified icon name changes (`fa-theater-masks` → `fa-masks-theater`)
   - ✅ Verified `fa-paintbrush-pencil` replacement option

2. **Icon Updates in scribe.js** ✅
   - ✅ Updated all `fas` prefixes to `fa-solid` (12 instances)
   - ✅ Updated icon names where changed
   - ✅ Replaced `fa-paintbrush-pencil` with `fa-paintbrush`
   - ✅ Tested icon rendering - icons working correctly

3. **CSS Font-Family Updates** ✅
   - ✅ Updated all CSS files to use `"Font Awesome 6 Pro"` (7 instances)
   - ✅ Verified font-family matches FoundryVTT v13 exactly
   - ✅ Icons now display correctly

### Phase 4: Secondary Migration (2-3 hours)
1. **File 2: dialogue-illustration.js**
   - Convert jQuery data access
   - Add defensive jQuery detection to FormApplication (if needed)
   - Test dialogue functionality

### Phase 5: Testing & Refinement (3-4 hours)
1. Run through full testing checklist
2. Test all toolbar buttons (functionality and icon display)
3. Test journal export functionality
4. Test chat message interactions
5. Test Font Awesome icons render correctly
6. Test with different journal configurations
7. Test edge cases (empty content, large journals, etc.)

### Phase 6: Documentation & Release (1-2 hours)
1. Update CHANGELOG
2. Update README
3. Create release notes
4. Tag and release

**Total Estimated Time:** 14-21 hours

---

## Detailed Conversion Patterns

### Pattern 1: Hook html Parameter Conversion

All hooks receive native DOM elements in v13. Use jQuery detection pattern during migration:

```javascript
// Pattern to use in all hook callbacks
Hooks.on('renderChatMessage', (message, html) => {
    // v13: Detect and convert jQuery to native DOM if needed
    let nativeHtml = html;
    if (html && (html.jquery || typeof html.find === 'function')) {
        nativeHtml = html[0] || html.get?.(0) || html;
    }
    
    // Now use nativeHtml for all DOM operations
    const button = nativeHtml.querySelector('.scribe-cards-illustration-button');
    // ...
});
```

### Pattern 2: querySelector Replacements

Replace all `html.find()` calls:

```javascript
// BEFORE
html.find('.my-class')
html.find('.my-class').first()
html.find('.my-class').length

// AFTER
html.querySelectorAll('.my-class')
html.querySelector('.my-class')
html.querySelectorAll('.my-class').length
```

### Pattern 3: Event Handler Conversion

Replace jQuery event handlers:

```javascript
// BEFORE
element.click((event) => { /* ... */ });
html.find('.button').on('click', handler);

// AFTER
element.addEventListener('click', (event) => { /* ... */ });
html.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', handler);
});
```

### Pattern 4: DOM Manipulation

Replace jQuery DOM methods:

```javascript
// BEFORE
element.append('<div>Content</div>');
element.before(otherElement);
element.clone();

// AFTER
element.insertAdjacentHTML('beforeend', '<div>Content</div>');
element.insertAdjacentElement('beforebegin', otherElement);
element.cloneNode(true);
```

### Pattern 5: Iteration Conversion

Replace `.each()` with `.forEach()`:

```javascript
// BEFORE
html.find('blockquote').each(function() {
    const $el = $(this);
    // ...
});

// AFTER
html.querySelectorAll('blockquote').forEach((el) => {
    // el is already a DOM element
    // ...
});
```

### Pattern 6: Data Attribute Access

Replace jQuery `.data()` with native methods:

```javascript
// BEFORE
$(button).data('imageUrl');

// AFTER
button.getAttribute('image-url') || button.dataset.imageUrl;
```

---

## Testing Checklist

### Critical Path Testing

- [ ] Module loads without console errors
- [ ] Chat message illustration buttons appear
- [ ] Chat message illustration buttons are clickable
- [ ] Journal page toolbar appears for GMs
- [ ] Journal export button appears in journal header
- [ ] Journal export button is clickable
- [ ] Blockquote toolbars render correctly

### Functionality Testing

- [ ] Narration button sends content to chat
- [ ] Illustration button creates chat card
- [ ] Handout button creates journal entry
- [ ] Export button exports HTML file
- [ ] Copy button copies content to clipboard
- [ ] MutationObserver updates toolbars when content changes
- [ ] Edit mode detection prevents toolbar in editor
- [ ] Double-click image handler works in editor

### Integration Testing

- [ ] Test with Coffee Pub Blacksmith (required dependency)
- [ ] Test with other Coffee Pub modules (recommended)
- [ ] Test with popular v13-compatible modules
- [ ] Verify no conflicts with other modules
- [ ] Test performance (no regressions)

### Edge Cases

- [ ] Test with empty blockquotes
- [ ] Test with blockquotes containing only text
- [ ] Test with blockquotes containing images
- [ ] Test with blockquotes containing multiple images
- [ ] Test with very long journal entries
- [ ] Test with journals containing many pages
- [ ] Test export with large journals
- [ ] Test with different user permissions (GM vs Player)
- [ ] Test toolbar with all buttons disabled
- [ ] Test toolbar with some buttons disabled

---

## Known Issues & Risks

### High Risk Areas

1. **MutationObserver Target** (Line 143)
   - Currently uses `html[0]` which assumes jQuery
   - Need to ensure native DOM element is passed
   - Risk: Observer may not attach correctly

2. **Event Handler Cleanup** (Multiple locations)
   - jQuery automatically cleans up event handlers
   - Native DOM requires explicit cleanup
   - Risk: Memory leaks if handlers not removed

3. **Multiple DOM Roots** (renderJournalPageSheet)
   - Journal pages can be in sidebar or popout windows
   - May need to search multiple roots
   - Risk: Elements not found in popout windows

### Medium Risk Areas

1. **Dynamic Button Creation** (addToolbarToBlockquotes)
   - Buttons created with HTML strings and appended
   - Event handlers attached after creation
   - Risk: Event handlers may not attach if timing is off

2. **FormApplication jQuery Detection** (dialogue-illustration.js)
   - May not need detection if Foundry v13 is consistent
   - Risk: `this.element` might be jQuery in some contexts

### Low Risk Areas

1. **Copy to Clipboard Function** (copyNarrationToClipboard)
   - Simple function with minimal jQuery usage
   - Straightforward conversion
   - Risk: Low

---

## Rollback Plan

If migration issues are encountered:

1. **Immediate Rollback:**
   - Revert to `v12.1.2-FINAL` tag
   - Restore previous `module.json` configuration
   - Document issues encountered

2. **Partial Rollback:**
   - Keep v13 module.json configuration
   - Revert specific problematic files
   - Fix issues incrementally

3. **Emergency Fix:**
   - Apply jQuery detection patterns more broadly
   - Use defensive coding for edge cases
   - Plan proper fix for next release

---

## Post-Migration Tasks

### Immediate (Within 1 week)

- [ ] Monitor GitHub issues for v13-specific bugs
- [ ] Monitor Foundry Discord for user reports
- [ ] Update documentation if needed
- [ ] Address any critical bugs found

### Short-term (Within 1 month)

- [ ] Remove unnecessary jQuery detection patterns (see Pattern 10 warning)
- [ ] Audit all jQuery detection code and remove where source is guaranteed native DOM
- [ ] Optimize DOM queries for performance
- [ ] Add more comprehensive error handling

### Long-term (Future releases)

- [ ] Consider migrating to ApplicationV2 API (optional)
- [ ] Review and optimize all DOM operations
- [ ] Consider adding TypeScript definitions
- [ ] Evaluate need for additional v13 features

---

## Resources & References

### Module-Specific

- Current module version: 12.1.2
- Target module version: 13.0.0
- Module repository: https://github.com/Drowbe/coffee-pub-scribe

### FoundryVTT Resources

- [FoundryVTT v13 Migration Guide](https://foundryvtt.com/article/migration/)
- [FoundryVTT v13 API Reference](https://foundryvtt.com/api/)
- [ApplicationV2 API](https://foundryvtt.wiki/en/development/api/applicationv2)

### Coffee Pub Resources

- [Migration Global Guide](../documentation/migration-global.md) - Comprehensive migration patterns
- Coffee Pub Blacksmith (required dependency)

---

## Migration Log

### Date: TBD
- **Status:** Planning
- **Notes:** Migration plan created

---

**Last Updated:** 2025-01-XX  
**Plan Version:** 1.0  
**Maintained By:** Coffee Pub Development Team

