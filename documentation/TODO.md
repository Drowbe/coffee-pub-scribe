# TODO - Coffee Pub Scribe

Work we intend to do. An entry says what, why, which file it touches, and how it will be verified.
Finished entries are deleted and live on in the CHANGELOG.

## High priority

**Re-copy `tools/check-docs-structure.mjs` from Blacksmith once its "Open" fix is committed.** The
checker currently exits non-zero on `userguide-export.md:39`, `## Open a whole journal for printing`,
because it matches the adjective in "Open work" and catches the verb. Blacksmith has fixed it but the
fix is uncommitted, so Scribe holds the last committed version rather than a working-tree copy that
could not be verified against Blacksmith's HEAD. Verified when `node tools/check-docs-structure.mjs`
exits clean and the five publisher files still compare byte-identical to Blacksmith's HEAD.

**Walk the seven user guides in a running world.** All were written from source and from
`lang/en.json`, not from a live session, so no claim in any of them has been performed. Read each
section with Foundry open and correct what does not match. Verified when every instruction in all
seven has been followed once. The specific claims most likely to be wrong, by guide:

- `userguide-journal-toolbar.md` -- the left-to-right button order (Export, Copy, Handout,
  Illustration, Narration) is the order the code appends them, which is not proof of the order they
  render in. Also the claim that the toolbar reappears by itself after a page switch.
- `userguide-writing-a-scene.md` -- that an image caption renders below the picture, that a Heading 4
  below the first becomes a section break, and that a Heading 5 with no image beneath it does the
  same. All three come from reading the composer, not from looking at a card.
- `userguide-sharing-to-chat.md` -- everything about what a player sees, which was never observed
  from a player's client. Specifically that the View Illustration button works for a player and
  survives their browser reload.
- `userguide-handouts.md` -- that a player without permission on the new entry cannot open it. The
  code creates the entry and posts the link without setting permissions, so this follows, but it has
  not been seen.
- `userguide-export.md` -- that the toolbar Export strips images and flattens links. That is what
  `scrubHTML` does to the cloned content; the resulting file has not been opened.
- `userguide-settings.md` -- that no setting other than Card Style needs a reload.

**Capture screenshots for the user guides and the README.** There are none, and no image is better
than a stale one. Wanted: a journal blockquote showing the toolbar, a narration card in chat showing
a title, an image caption and both kinds of dialogue line, an illustration card with its View
Illustration button, and the settings pane. Save as WebP in `documentation/assets/` and link them relatively. Verified when the
images render in the repository and on the wiki.

**Confirm the 13.1.0 chat cards in a live world.** The parts compositions have not been rendered in
Foundry. Steps are in `testing/journal-toolbar-and-cards.md`.

## Medium priority

**Decide whether a conversation needs its own Blacksmith part.** Dialogue lines map to Blacksmith's
`panel` part, which renders each as a dark box and writes a colon between the speaker and the line.
A long conversation becomes a stack of dark boxes. Look at a real multi-line passage and, if it reads
badly, ask Blacksmith for a dialogue part rather than adding a local class. Touches
`composeDialoguePart` at `scripts/scribe.js:149`. Verified by eye on a passage with six or more
spoken lines.

**Verify the Font Awesome 6 codepoint in `styles/journals.css`.** The bookmark glyph `\f02e` was
carried over from Font Awesome 5 and carries a comment saying it needs checking. Verified when the
intended icon renders in v13.

**Remove the jQuery detection guards.** Every hook callback unwraps its `html` argument in case it is
a jQuery object. Foundry v13 passes native elements, so once every call site is confirmed the guards
can go. Touches `scripts/scribe.js`. Verified when the toolbar and the export button still appear
with the guards removed.

## Low priority

**Allow the toolbar icons to be configured.** Currently fixed in `scripts/scribe.js`.

**Add a way to insert a narration template into a journal page.** A GM writing a scene builds the
blockquote by hand every time.

**Consider ApplicationV2 for `ImageFormApplication`.** It extends `FormApplication`, which still
works in v13. Optional, not required. Touches `scripts/dialogue-illustration.js`.

## Deferred

**Opening the export pop-up fails from the Foundry desktop client.** The browser version works. Not
investigated.
