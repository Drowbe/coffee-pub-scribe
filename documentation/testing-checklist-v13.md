# Coffee Pub Scribe - v13 Testing Checklist

## Journal Titlebar / Header

### Export Button in Journal Header
- [ ] **Export button appears in journal header** - Should see "Export" button with cloud-arrow-down icon in the titlebar
- [ ] **Export button is positioned correctly** - Should appear before the close (X) button
- [ ] **Export button is clickable** - Should respond to clicks
- [ ] **Export dialog appears** - Clicking should open a dialog asking for filename
- [ ] **Export functionality works** - Should export journal as HTML file
- [ ] **Export button respects permissions** - Only shows for users with journal access (GM/Assistant/Trusted/Players with permission)
- [ ] **Export button respects setting** - Should only show if `toolbarButtonPrint` setting is enabled
- [ ] **Export button persists** - Should remain after journal re-renders or page switches
- [ ] **Multiple journal windows** - Export button appears in each open journal window

## Journal Page Content Toolbars

### Blockquote Toolbars
- [ ] **Toolbar appears on blockquotes** - Should see toolbar at bottom of blockquotes in journal pages
- [ ] **Toolbar buttons are visible** - All enabled buttons should be visible (Narration, Handout, Copy, Export, Illustration)
- [ ] **Toolbar buttons are inline** - Buttons should be in a horizontal row, right-aligned
- [ ] **Toolbar appears after page load** - Should appear within 1-2 seconds of opening journal
- [ ] **Toolbar persists after page switch** - Should remain when switching between journal pages
- [ ] **Toolbar persists after journal re-render** - Should remain after journal content updates
- [ ] **Only shows for GMs** - Toolbar should only appear when logged in as GM
- [ ] **Respects toolbarEnabled setting** - Should only show if toolbar is enabled in settings

### Blockquote Toolbar Buttons

#### Narration Button
- [ ] **Button appears** - Should see Narration button (if enabled in settings)
- [ ] **Button is clickable** - Should respond to clicks
- [ ] **Sends to chat** - Clicking should send blockquote content to chat as a message
- [ ] **Content is formatted correctly** - Chat message should include the blockquote HTML
- [ ] **Hides header** - Chat message should include the coffeepub-hide-header span

#### Handout Button
- [ ] **Button appears** - Should see Handout button (if enabled in settings)
- [ ] **Button is clickable** - Should respond to clicks
- [ ] **Creates journal entry** - Clicking should create a new journal entry/handout
- [ ] **Correct folder** - Should create in the configured handout folder
- [ ] **Correct content** - Journal entry should contain the blockquote content

#### Copy Button
- [ ] **Button appears** - Should see Copy button (if enabled in settings)
- [ ] **Button is clickable** - Should respond to clicks
- [ ] **Copies to clipboard** - Clicking should copy blockquote HTML to clipboard
- [ ] **Notification appears** - Should show notification when copy succeeds
- [ ] **Content is correct** - Copied content should include blockquote tags but exclude toolbar

#### Export Button (in toolbar)
- [ ] **Button appears** - Should see Export button in toolbar (if enabled in settings)
- [ ] **Button is clickable** - Should respond to clicks
- [ ] **Export dialog appears** - Clicking should open export dialog
- [ ] **Exports correctly** - Should export journal page as HTML

#### Illustration Button
- [ ] **Button appears per image** - Should see one Illustration button per image in blockquote (if enabled)
- [ ] **Button is clickable** - Should respond to clicks
- [ ] **Opens image dialog** - Clicking should open the ImageFormApplication dialog
- [ ] **Correct image displayed** - Dialog should show the correct image from the blockquote

### Edit Mode Behavior
- [ ] **No toolbar in edit mode** - Toolbar should NOT appear when editing journal pages
- [ ] **Double-click image in editor** - Double-clicking images in editor should trigger image insert button (if applicable)

### Settings Integration
- [ ] **toolbarEnabled setting works** - Toggling should show/hide all blockquote toolbars
- [ ] **Individual button settings work** - Each button setting (Narration, Handout, Copy, Export, Illustration) should show/hide that button
- [ ] **toolbarButtonLabelEnabled setting works** - Should toggle button labels on/off
- [ ] **toolbarButtonPrint setting works** - Should show/hide the header export button
- [ ] **Settings don't require reload** - Changes should apply immediately (except cardTheme)

## Chat Cards

### Chat Message Blockquotes
- [ ] **Chat cards render correctly** - Blockquotes in chat should have proper styling
- [ ] **Theme colors apply** - Chat cards should use the selected theme colors
- [ ] **Borders and backgrounds** - Should have proper borders, backgrounds, and box-shadows
- [ ] **Title styling** - H4 titles should have proper background and styling
- [ ] **Icon appears** - Title should have the masks-theater icon (::before pseudo-element)
- [ ] **Images render correctly** - Images in chat cards should have proper styling
- [ ] **Dialogue quotes (h6)** - Should have proper styling with icons
- [ ] **Horizontal rules** - HR elements should have proper styling

### Illustration Buttons in Chat
- [ ] **Illustration button appears** - Should see "View Illustration" button in chat cards with images
- [ ] **Button is clickable** - Should respond to clicks
- [ ] **Opens image dialog** - Clicking should open ImageFormApplication dialog
- [ ] **Correct image displayed** - Dialog should show the correct image

## Font Awesome Icons

### Icon Rendering
- [ ] **All icons display correctly** - All FA6 icons should render properly
- [ ] **Icons use correct classes** - Should use `fa-solid` prefix, not `fas`
- [ ] **Pseudo-element icons work** - CSS ::before icons should display correctly
- [ ] **Icon names updated** - All icon names should be FA6 compatible (e.g., `fa-masks-theater` not `fa-theater-masks`)
- [ ] **Font family correct** - CSS should use "Font Awesome 6 Pro" font-family

## General Functionality

### Module Loading
- [ ] **Module loads without errors** - No console errors on module load
- [ ] **Settings register correctly** - All settings should be available in module settings
- [ ] **Hooks register successfully** - Should see hook registration messages in console
- [ ] **CSS themes load** - Selected theme should apply correctly

### Compatibility
- [ ] **Works with multiple journals open** - Should work correctly with 2+ journal windows open
- [ ] **Works with journal popouts** - Should work if journal is popped out to separate window
- [ ] **No conflicts with other modules** - Should not conflict with common modules
- [ ] **Performance** - No noticeable lag when opening journals or interacting with toolbars

### Error Handling
- [ ] **No console errors** - No JavaScript errors in console during normal operation
- [ ] **Graceful degradation** - Module should handle missing elements gracefully
- [ ] **Permission handling** - Should handle permission checks correctly

## Specific v13 Migration Tests

### jQuery Removal
- [ ] **No jQuery errors** - No "jQuery is not defined" errors
- [ ] **All DOM manipulation works** - All jQuery methods converted to native DOM
- [ ] **Event listeners work** - All addEventListener calls work correctly
- [ ] **Query selectors work** - All querySelector/querySelectorAll calls work

### Hook Behavior
- [ ] **Hooks fire reliably** - All hooks should fire when expected
- [ ] **Multiple hook strategies work** - Fallback hooks should work if primary hooks fail
- [ ] **MutationObserver works** - Content changes should be detected correctly
- [ ] **Delayed content renders** - Late-rendering content should still get toolbars

### Dialog Updates
- [ ] **Export dialog uses Dialog class** - Should use Foundry Dialog, not prompt()
- [ ] **Dialog is styled correctly** - Should match Foundry UI styling
- [ ] **Dialog input works** - Filename input should work correctly
- [ ] **Dialog validation works** - Should warn if filename is empty

## Edge Cases

- [ ] **Empty blockquotes** - Module should handle empty blockquotes gracefully
- [ ] **Blockquotes without images** - Should work without Illustration buttons
- [ ] **Blockquotes with multiple images** - Should show multiple Illustration buttons
- [ ] **Very long journal entries** - Should handle long content without performance issues
- [ ] **Special characters in content** - Should handle special characters correctly
- [ ] **Nested blockquotes** - Should handle nested blockquotes correctly (if applicable)

## Known Issues to Verify Fixed

- [x] Font Awesome icons display correctly (FA5 → FA6 migration)
- [x] Toolbar appears in journal entries (hook timing issues)
- [x] Toolbar buttons are inline and right-aligned (CSS layout)
- [x] Export dialog uses Dialog class (prompt() removed)
- [x] No observer.disconnect() errors
- [x] Chat cards render correctly with theme colors

