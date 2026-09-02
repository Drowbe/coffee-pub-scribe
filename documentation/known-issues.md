# Known Issues

**Audience:** Anyone using Coffee Pub Scribe.

Defects that have not been fixed yet. Fixed items move to the CHANGELOG and leave this list.

## The journal title bar button's setting is named Print, and the button says Export

The setting is called Print Button and its hint describes a print button. The button it controls
carries the tooltip Export Journal and a download icon. It opens the journal in a new browser tab,
from which a reader can print or save a PDF, so both names describe part of what happens and neither
matches the other. No workaround is needed; the button works. A fix starts in `lang/en.json` and in
`addExportButtonToJournal` at `scripts/scribe.js:418`.

## Two different buttons are both called Export

Export on the blockquote toolbar saves the current journal page as an HTML file. The title bar
button, controlled by the Print Button setting, opens the whole journal in a browser tab. Their
on-screen names do not distinguish them.

## The blockquote toolbar claims every blockquote

Scribe adds its toolbar to every blockquote on a journal page, including ones written as ordinary
pull quotes rather than as narration. Turning off Toolbar Enabled removes it everywhere; there is no
way to exclude a single blockquote.

## A pop-up blocker stops the journal export

The title bar button opens a new browser tab. A blocker stops it, and Foundry reports that pop-ups
must be allowed. Allow pop-ups for your Foundry site.
