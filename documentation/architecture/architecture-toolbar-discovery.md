# Toolbar Discovery

**Audience:** Someone changing Coffee Pub Scribe.

How Scribe finds journal blockquotes and journal headers in Foundry v13, and why it looks for them
four different ways. The narration format those toolbars act on is described in
[architecture-narration-format.md](architecture-narration-format.md).

## What gets attached, and where

Scribe attaches two things to an open journal.

A **blockquote toolbar** is appended inside every blockquote on a journal page, for a GM, when
`toolbarEnabled` is on. It carries up to five buttons -- Export, Copy, Handout, Illustration and
Narration -- each behind its own setting, and it is removed entirely if every one of them is off.
`addToolbarToBlockquotes` in `scripts/scribe.js:689` builds it. One Illustration button is created per
`img` in the blockquote, so a passage with three pictures gets three.

An **export button** is inserted into the journal window header, before the close control.
`addExportButtonToJournal` in `scripts/scribe.js:418` builds it. It is gated on `toolbarButtonPrint`
rather than on `toolbarEnabled`, so the two toolbars turn on and off independently.

## Four discovery paths, deliberately overlapping

Under v13 a journal sheet does not reliably announce itself to a module at a point where its content
exists. `renderJournalPageSheet` may not fire, may fire before the page body is in the DOM, or may
fire again on a re-render that discards whatever was attached. Rather than pick one signal, Scribe
runs four and lets them race:

1. **Blacksmith HookManager registrations** for `renderChatMessage`, `renderJournalPageSheet` and
   `renderJournalSheet` (`scripts/scribe.js:313`, `:339`, `:505`).
2. **A direct Foundry `Hooks.on('renderJournalPageSheet')`** at `scripts/scribe.js:547`, registered
   alongside the HookManager one and running the same work, as a fallback for the case where the
   manager itself does not deliver.
3. **Per-sheet MutationObservers**, created inside the page hooks at `scripts/scribe.js:402` and
   `:596`, watching that sheet for content that arrives after the hook has returned. Both are
   debounced at 100ms, because journal rendering produces mutation storms.
4. **Two document-level MutationObservers plus a poll.** `journalSheetObserver`
   (`scripts/scribe.js:494`) watches `document.body` for journal sheets needing the header button;
   `globalJournalObserver` (`scripts/scribe.js:619`) watches it for blockquotes needing a toolbar;
   and `setInterval(checkJournalSheets, 2000)` at `scripts/scribe.js:675` sweeps every two seconds
   for sheets that were already open when the observers started.

**Idempotence is what makes this safe, and it is the load-bearing property.** Every path converges on
the same two functions, and each refuses to act twice: `addToolbarToBlockquotes` returns early when
the blockquote already holds a `.scribe-journal-buttons-wrapper` (`scripts/scribe.js:762`),
`addExportButtonToJournal` returns early when the header already holds a
`.scribe-journal-export-button` (`scripts/scribe.js:423`), and the periodic sweep filters to
blockquotes with no wrapper before calling anything. Any change that adds a fifth path, or that
alters what either function attaches, has to preserve those guards -- without them four paths mean
four toolbars.

The cost is a permanent two-second timer and two document-wide observers for the life of the session.
That is the price of the sheet-lifecycle behaviour above, not a temporary measure.

## Edit mode

A journal page being edited contains a `.editor` element, and every path checks for it before
attaching. A toolbar inserted into a live editor becomes part of the page's saved HTML. The page
hooks instead bind a `dblclick` handler on the editor that forwards to Foundry's own image control,
so double-clicking an image while editing opens the file picker.

## jQuery detection

Every hook callback begins by normalising its `html` argument: if it looks like a jQuery object it is
unwrapped, otherwise it is used as-is. v13 passes native elements, but the same hooks are reached
through Blacksmith's manager and through Foundry directly, and the guard costs one comparison. It is
defensive rather than required, and it can go once every call site is confirmed to deliver native DOM.

## Blockquotes are claimed globally

Scribe treats every blockquote in a journal page as its own -- the toolbar selector is
`.journal-page-content blockquote, blockquote`. A GM who uses a blockquote for an ordinary pull quote
gets a Scribe toolbar on it. This is the documented behaviour of the narration format rather than an
oversight, and it is the reason the format is opt-in by markup rather than by a wrapper class.
