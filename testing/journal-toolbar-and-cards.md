# Journal Toolbar and Chat Cards

**Audience:** Whoever is discharging Scribe's verification backlog.

Verification owed on code that has shipped. Passing means deleting the item, not ticking it. When
this file is empty, delete it.

## What is proven, and what is not

The v13 journal toolbar has been run in a world: the toolbar appears, its buttons work, the export
dialog uses Foundry's Dialog class, and no observer errors are raised. Those items have been removed
from this file rather than ticked.

**Nothing in version 13.1.0 has been run in Foundry.** That release rebuilt all three chat cards as
Blacksmith part compositions, replaced the seven stylesheets with one, and changed what the card
theme setting holds. Every item below is unproven.

## Chat cards, 13.1.0

- [ ] A narration card posts, and its parts render: the passage's Heading 4 as the card's title bar,
      paragraphs as body text, an image with its Heading 5 as the caption, a horizontal rule as a
      divider.
- [ ] A Heading 6 with a bold name renders as a line of speech with a speaker icon; one with an
      italic name renders as an inner voice with a thought icon.
- [ ] A conversation of six or more spoken lines is legible rather than a stack of heavy boxes. This
      is the judgement call behind the open question of whether dialogue needs its own Blacksmith
      part.
- [ ] Bold, italics and `@UUID` document links written in the journal survive into the posted card.
- [ ] A passage title containing an asterisk or `@UUID[...]` renders those characters rather than
      being obeyed.
- [ ] An illustration card posts, and its View Illustration button opens the image at full size.
- [ ] That button still works after a browser reload, and on a second client that did not post it.
- [ ] A pre-13.1.0 illustration card already in the chat log still opens its image.
- [ ] The handout notice posts, its journal link opens the entry, and the full journal title is shown
      rather than truncated at 75 characters.
- [ ] A blockquote with no Heading 4, and one with no content at all, are handled without error.

## Stylesheet consolidation, 13.1.0

- [ ] After a Foundry server restart, the journal toolbar is styled correctly. A browser reload alone
      is not sufficient, because `module.json` names the stylesheet and the server caches the
      manifest.
- [ ] No Scribe CSS reaches the chat log. Another module's chat cards containing a blockquote are
      unaffected by Scribe being enabled.

## Card theme, 13.1.0

- [ ] The Card Style dropdown lists Blacksmith's card themes.
- [ ] A world upgraded from an earlier Scribe, whose stored value is a stylesheet name, posts cards in
      the world default rather than in Tan, and logs nothing per post.
- [ ] Choosing a theme changes cards posted afterwards without requiring a reload.

## Multiple clients and windows

- [ ] Two journal windows open at once both get toolbars.
- [ ] A popped-out journal gets its toolbar.
- [ ] A player sees no toolbar, and sees the posted cards.
