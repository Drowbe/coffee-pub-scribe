# Font Awesome Icon Fix Instructions

## Problem
Icons are missing/broken because CSS codepoints may not match FoundryVTT v13's Font Awesome 6 subset.

## Solution Steps

### Step 1: Find Foundry's Exact Font-Family Name

1. Open FoundryVTT v13 in your browser
2. Open Developer Tools (F12)
3. Inspect any existing Font Awesome icon in Foundry's UI
4. Look at the computed styles and find the `font-family` value
5. It might be something like:
   - `"Font Awesome 6 Free"`
   - `"Font Awesome 6 Pro"`
   - Or a custom Foundry-specific name

### Step 2: Verify/Update Font-Family in CSS

Once you know the exact font-family name, update these files:

- `styles/journals.css` - Lines 48, 138, 180
- `styles/cards.css` - Lines 45, 131, 173
- `styles/dialogues.css` - Line 22

Replace the font-family with the exact name you found.

### Step 3: Verify Codepoints

The current codepoints may need updating for FA6. Here's what we're using:

| Location | Current Codepoint | Icon Purpose | Needs Verification |
|----------|------------------|--------------|-------------------|
| `journals.css` line 50 | `\f02e` | Bookmark (h4::before) | Yes |
| `journals.css` line 140 | `\f086` | Comments/Speech (h6 strong::before) | Yes |
| `journals.css` line 182 | `\f4ad` | Brain/Thought (h6 em::before) | Yes |
| `cards.css` line 48 | `\f630` | Masks/Theater (h4::before) | Yes |
| `cards.css` line 133 | `\f086` | Comments/Speech (h6 strong::before) | Yes |
| `cards.css` line 175 | `\f4ad` | Brain/Thought (h6 em::before) | Yes |
| `dialogues.css` line 24 | `\f24d` | Brush/Paintbrush | Yes |

**To verify codepoints:**

1. Create a test HTML element with the icon class: `<i class="fa-solid fa-bookmark"></i>`
2. Inspect it in DevTools
3. Check the `::before` pseudo-element's `content` value
4. Use that codepoint in your CSS

### Step 4: Alternative Approach - Use Icon Classes Instead

If codepoints continue to cause issues, consider modifying the HTML to use icon classes directly:

Instead of CSS:
```css
.journal-page-content blockquote h4::before {
    content: "\f02e";
}
```

Use HTML:
```html
<h4><i class="fa-solid fa-bookmark"></i> Title</h4>
```

This would require updating the JavaScript that generates the HTML in `scripts/scribe.js`.

## Quick Test

To quickly test if the font-family is the issue:

1. Temporarily add this to your CSS:
```css
.journal-page-content blockquote h4::before {
    font-family: "Font Awesome 6 Free", "Font Awesome 6 Pro", Arial !important;
    content: "\f02e";
}
```

2. If icons appear with Arial fallback, the font-family name is wrong
3. If icons don't appear, the codepoint is wrong

