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

- `userguide-journal-toolbar.md` -- that the toolbar reappears by itself after a page switch. The
  button order is confirmed by `assets/scribe-illustration.webp`.
- `userguide-writing-a-scene.md` -- that a Heading 4 below the first becomes a section break, and
  that a Heading 5 with no image beneath it does the same. Both come from reading the composer, not
  from looking at a card. The caption position is confirmed by `assets/scribe-product.webp`.
- `userguide-sharing-to-chat.md` -- everything about what a player sees, which was never observed
  from a player's client. Specifically that the View Illustration button works for a player and
  survives their browser reload.
- `userguide-handouts.md` -- that a player without permission on the new entry cannot open it. The
  code creates the entry and posts the link without setting permissions, so this follows, but it has
  not been seen.
- `userguide-export.md` -- that the toolbar Export strips images and flattens links. That is what
  `scrubHTML` does to the cloned content; the resulting file has not been opened.
- `userguide-settings.md` -- that no setting other than Card Style needs a reload.

**Capture the two screenshots still missing.** `assets/scribe-product.webp` and
`assets/scribe-illustration.webp` cover the journal block, the toolbar, a narration card, a handout
notice and an illustration card. Still wanted: the settings pane, for `userguide-settings.md`, and a
passage carrying six or more consecutive dialogue lines, for the question below. WebP, in
`documentation/assets/`, linked relatively. Save as WebP in `documentation/assets/` and link them relatively. Verified when the
images render in the repository and on the wiki.

**Confirm the 13.1.0 chat cards in a live world.** The parts compositions have not been rendered in
Foundry. Steps are in `testing/journal-toolbar-and-cards.md`.

## Medium priority

**Decide whether a conversation needs its own Blacksmith part.** Dialogue lines map to Blacksmith's
`panel` part, which writes a colon between the speaker and the line. A single line renders as a light
tinted inset rather than the heavy dark box this entry originally feared -- see
`assets/scribe-illustration.webp` -- so the question is now only whether six or more in a row read as
a conversation or as a stack. If they stack, ask Blacksmith for a dialogue part rather than adding a
local class. Touches `composeDialoguePart` at `scripts/scribe.js:149`.

**Verify the Font Awesome 6 codepoint in `styles/journals.css`.** The bookmark glyph `\f02e` was
carried over from Font Awesome 5 and carries a comment saying it needs checking. Verified when the
intended icon renders in v13.

**Retire the journal DOM fallbacks now that the hooks fire again.** The three registrations at
`scripts/scribe.js:340`, `:506` and `:547` carried v12 hook names and had not fired since v13 renamed
the sheet classes; they have now been renamed to `renderJournalEntryPageSheet` and
`renderJournalEntrySheet`, which Blacksmith verified firing on 14.367 by instrumenting
`Hooks.callAll`. While they were dead, three unconditional DOM fallbacks did the work instead and are
still in place: a `MutationObserver` on `document.body` at `:481`, a second at `:610`, and
`setInterval(checkJournalSheets, 2000)` at `:675`. That is a full-document `querySelectorAll` sweep
every two seconds for the whole session, plus observer callbacks on every DOM mutation anywhere in
Foundry, to place one titlebar button. The overlap is now measured rather than assumed safe: on
14.367, across three page switches and three firings of the interval, the export button held at one
and no blockquote carried more than one toolbar, so the idempotence guards at `:423` and `:764` do
cover the hook path. Nothing is urgent; this is cost, not correctness. Remove them one at a time,
starting with the two-second interval, which is the only one that runs when no journal is open.
Verified when the export button and the blockquote toolbar still appear with all three deleted.

**Namespace the remaining deprecated `CONST` globals before they are removed.** `CONST` still
resolves on Foundry 14.364, so nothing is broken today, but it is on its way out and will fail with
no further warning when it goes. Suite-wide this is 62 `CONST` sites across eight modules, so it
wants doing together rather than per-module. When it happens, do the sites that carry a fallback
first: patterns like `CONST?.X ?? {}` and `CONST.X ?? {}` read as already-migrated defensive code and
are not -- neither `?.` nor `??` guards an undeclared identifier, only `typeof` does, so those throw
exactly like a bare `CONST.X`. There are fifteen such sites in the suite and they are the ones an
eyeball audit skips. Verified by grep, not by reading. (Scribe's one `new Dialog({...})` at
`scripts/scribe.js:1115` is now `DialogV2` -- see CHANGELOG.)

**Remove the jQuery detection guards.** Every hook callback unwraps its `html` argument in case it is
a jQuery object. Foundry v13 passes native elements, so once every call site is confirmed the guards
can go. Touches `scripts/scribe.js`. Verified when the toolbar and the export button still appear
with the guards removed.

## Low priority

**Allow the toolbar icons to be configured.** Currently fixed in `scripts/scribe.js`.

**Add a way to insert a narration template into a journal page.** A GM writing a scene builds the
blockquote by hand every time.

## Deferred

**Opening the export pop-up fails from the Foundry desktop client.** The browser version works. Not
investigated.
