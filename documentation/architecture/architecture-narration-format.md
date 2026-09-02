# Narration Format

**Audience:** Someone changing Coffee Pub Scribe.

The small markup grammar a GM writes inside a journal blockquote, and how Scribe turns it into a
Blacksmith chat card. The machinery that puts the toolbar on the blockquote in the first place is in
[architecture-toolbar-discovery.md](architecture-toolbar-discovery.md).

## The grammar

A narration passage is an ordinary HTML blockquote in a journal page. Its child elements carry
meaning that only Scribe knows about:

| Element | Means |
|---|---|
| first `h4` | the card's title |
| later `h4` | a heading partway down the passage |
| `h5` | the title of the image that follows it |
| `img` | an illustration |
| `hr` | a divider |
| `h6` containing `strong` | a line of speech; the `strong` names the speaker |
| `h6` containing `em` | an inner voice; the `em` names who is thinking |
| `h6` with neither | an unattributed quote |
| anything else | ordinary narrative prose |

The grammar is authored, not generated. A GM types it, so every string reaching a card came from a
person and none of it is trusted input.

## Composition, not markup

Scribe does not write chat card HTML. Blacksmith's chat cards API takes a composition -- an ordered
list of parts -- and renders, themes and headers the card itself. `scripts/manager-cards.js` owns
access to that API; the compositions are built in `scripts/scribe.js`.

`composeNarrationParts` at `scripts/scribe.js:186` walks the blockquote's child nodes and emits one
part per convention above: `header` for the title, `image` with a caption for an `h5`/`img` pair,
`section` for a divider or a later heading, and `panel` for a line of dialogue.
`composeDialoguePart` at `scripts/scribe.js:149` splits an `h6` into the speaker and what they said.

**Runs of ordinary prose are buffered and emitted as a single `richtext` part.** This is the one
place Scribe passes HTML rather than structure, and it is deliberate: that markup was authored by a
person in a Foundry document and carries their bold, their italics and their `@UUID` content links.
Blacksmith's `prose` blocks accept only two inline marks and enricher syntax, so reproducing a
paragraph through them would mean inverting the enricher and dropping whatever did not survive. A
journal page is exactly the document-sourced content `richtext` exists for.

**Every other string is passed as a literal.** A part field given `{ literal: value }` is escaped and
never read as marks or as enricher syntax, so a passage titled with an asterisk or a `@UUID[...]`
renders those characters instead of obeying them. Where a name needs emphasis it carries a `mark`
rather than being wrapped in asterisks, because Blacksmith emits the tags around text it has already
escaped.

The other two cards follow the same rule. The illustration card is a `header`, an `image` and an
`actions` part; the handout notice is a `header`, a `prose` paragraph interpolating literals, and a
`rows` item whose `uuid` makes the journal link a real document link rather than an enricher string.

## Buttons survive a reload

The illustration card's button carries an action name and a value, not a listener. The handler is
registered once per client at `ready` by `registerCardActions` (`scripts/scribe.js:99`), and
Blacksmith dispatches to it whenever the card renders. A chat message is data on every client, so a
handler cannot travel with the card; this is why registration belongs at startup rather than beside
the post, and why the button still works after a browser refresh.

Messages posted before version 13.1.0 carry a raw button with a `data-image-url` attribute instead.
The `renderChatMessage` hook at `scripts/scribe.js:313` binds those, and exists only for them.

## Theme

Cards take their colour from Blacksmith. The `cardTheme` setting holds a Blacksmith card theme id,
and `getCardTheme` in `scripts/manager-cards.js` validates it against the themes Blacksmith actually
offers before passing it on, returning nothing when it does not match so the world default applies.
Scribe ships one stylesheet, `styles/default.css`, and it styles journals and dialogues only -- no
Scribe CSS reaches the chat log.
