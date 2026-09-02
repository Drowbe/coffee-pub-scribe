# Coffee Pub Scribe

**Audience:** Anyone using or working on Coffee Pub Scribe.

Scribe turns a passage written in a Foundry journal into something you can put in front of your
players: a formatted card in the chat log, a handout they can open later, or an HTML file you can
keep. You write the scene in a blockquote, and Scribe adds a toolbar to it.

It is part of the Coffee Pub suite and requires
[Coffee Pub Blacksmith](https://github.com/Drowbe/coffee-pub-blacksmith), which supplies the chat
card styling.

## For players and GMs

- [Getting started](userguides/userguide-getting-started.md) -- what changes when you enable it, and
  how to share your first passage.
- [The journal toolbar](userguides/userguide-journal-toolbar.md) -- when the toolbar appears, who
  sees it, and what each button does.
- [Writing a scene](userguides/userguide-writing-a-scene.md) -- headings, images and dialogue inside
  a blockquote, and what each becomes.
- [Sharing to chat](userguides/userguide-sharing-to-chat.md) -- narration cards and illustrations,
  and what the table sees.
- [Handouts](userguides/userguide-handouts.md) -- giving players a passage they can re-read.
- [Exporting and printing](userguides/userguide-export.md) -- the three routes out of Foundry, and
  which button is which.
- [Settings](userguides/userguide-settings.md) -- every setting by its on-screen name.

## For developers

- [Toolbar discovery](architecture/architecture-toolbar-discovery.md) -- how Scribe finds journal
  blockquotes and headers, and why it looks four different ways.
- [Narration format](architecture/architecture-narration-format.md) -- the blockquote grammar and how
  it becomes a Blacksmith chat card.

Scribe exposes no API and publishes no design tokens. Nothing outside it calls into it.

## Known issues

- [Known issues](known-issues.md) -- defects not yet fixed.
