# Toolbar Discovery

**Audience:** Someone changing Coffee Pub Scribe.

How Scribe finds journal blockquotes and journal headers in Foundry v13 and v14, and why it looks for
them four different ways. The narration format those toolbars act on is described in
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

## Four discovery paths, and why there are four

The four paths are not a considered design. They accreted around a hook that was never firing, and
the reason was a name rather than a lifecycle.

v13 renamed the journal sheet classes -- `JournalSheet` became `JournalEntrySheet` under
ApplicationV2 -- and renamed the render hooks with them. Scribe went on registering
`renderJournalSheet` and `renderJournalPageSheet`, which are the v12 names. Those registrations
succeeded, returned a hook id and logged success, and then never ran. Nothing reported an error,
because registering a hook name Foundry no longer calls is not an error. Each time a toolbar failed
to appear, another DOM-polling fallback was added, and because the fallbacks worked the dead hook was
never suspected. The comment that used to sit at `scripts/scribe.js:504` -- "may not fire in v13 due
to ApplicationV2" -- was the closest anyone came, and it treated a certainty as a possibility.

The hooks were renamed to `renderJournalEntryPageSheet` and `renderJournalEntrySheet` and now fire;
confirmed on Foundry 14.367 by instrumenting `Hooks.callAll` and watching a journal open. So the
paths below no longer race a hook that never arrives, and three of them are now redundant. They are
still in place: the hook path was landed first and the fallbacks left running, so that the rename
could be confirmed in a live world before anything was taken away.

1. **Blacksmith HookManager registrations** for `renderChatMessageHTML`,
   `renderJournalEntryPageSheet` and `renderJournalEntrySheet` (`scripts/scribe.js:313`, `:339`,
   `:505`).
2. **A direct Foundry `Hooks.on('renderJournalEntryPageSheet')`** at `scripts/scribe.js:547`,
   registered alongside the HookManager one and running the same work, as a fallback for the case
   where the manager itself does not deliver.
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

That guarantee was measured rather than assumed once the hooks began firing again: on 14.367, across
three page switches and three firings of the two-second sweep, the export button held at one and no
blockquote carried more than one toolbar. The hook path and the DOM paths coexist without stacking.

The cost is a permanent two-second timer and two document-wide observers for the life of the session
-- a full-document `querySelectorAll` sweep every two seconds, plus observer callbacks on every DOM
mutation anywhere in Foundry, to place one titlebar button. That is now a temporary measure, which it
was not before: it was the price of a hook that never fired, and the hook fires.

## Edit mode

A journal page being edited contains a `.editor` element, and every path checks for it before
attaching. A toolbar inserted into a live editor becomes part of the page's saved HTML. The page
hooks instead bind a `dblclick` handler on the editor that forwards to Foundry's own image control,
so double-clicking an image while editing opens the file picker.

## jQuery detection

Every hook callback begins by normalising its `html` argument: if it looks like a jQuery object it is
unwrapped, otherwise it is used as-is. v13 and v14 both pass native elements -- measured on 14.367,
where an ApplicationV2 render hook delivers an `HTMLElement` with no `.find()` method, so a jQuery
call would throw. The guard costs one comparison and it is what let the hook rename land without any
other change to the callbacks. It is defensive rather than required, and it can go once every call
site is confirmed to deliver native DOM.

## Blockquotes are claimed globally

Scribe treats every blockquote in a journal page as its own -- the toolbar selector is
`.journal-page-content blockquote, blockquote`. A GM who uses a blockquote for an ordinary pull quote
gets a Scribe toolbar on it. This is the documented behaviour of the narration format rather than an
oversight, and it is the reason the format is opt-in by markup rather than by a wrapper class.
