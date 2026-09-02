# Exporting and Printing

**Audience:** Someone running a game with Coffee Pub Scribe.

Getting journal content out of Foundry. There are three routes, they produce different things, and
their on-screen names do not distinguish them well.

## Which button is which

| What you click | What you get |
|---|---|
| **Copy** on the blockquote toolbar | The passage's HTML on your clipboard |
| **Export** on the blockquote toolbar | An HTML file downloaded to your computer |
| The button in the journal's **title bar** | The whole journal opened in a new browser tab |

The names are confusing and it is worth knowing why before you pick one. The title bar button's
tooltip reads Export Journal, but the setting that controls it is called **Print Button**. So the
word Export names two different buttons, and the setting for the third says Print. This is a known
labelling defect rather than something you are misreading.

## Copy a passage

Click **Copy**. The passage's HTML goes to your clipboard with the toolbar stripped out, ready to
paste into another journal page. A notification confirms it.

Use this to reuse a scene somewhere else in your world.

## Export a page as a file

Click **Export** on the toolbar. You are asked for a filename, and the file is downloaded to your
browser's usual download location as `yourname.html`.

**Two things change on the way out.** Images are removed, and links to other documents are flattened
into plain bold text rather than staying links. References to other Foundry documents are looked up
and their contents written into the file, so the export stands on its own without Foundry.

The result is a readable text document rather than a faithful copy of the page.

## Open a whole journal for printing

Click the button in the **journal window's title bar**, next to the close control. The entire
journal -- every page, in order, each starting on a new sheet -- opens in a new browser tab, styled
for reading. From there use your browser's print command to print it or save it as a PDF.

Unlike the toolbar Export, this keeps images and page structure. References to other documents are
resolved and included here too.

**Allow pop-ups for your Foundry site**, or the browser will block the tab. Foundry tells you if that
happens.

## Who can do each

The blockquote toolbar, and therefore Copy and Export, is **GM only**.

The title bar button is available to a GM, an assistant GM, a trusted player, and any player with at
least limited permission on that journal. It can be turned off for everyone with the **Print Button**
setting.
