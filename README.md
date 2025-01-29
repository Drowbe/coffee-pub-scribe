# Coffee Pub Scribe

![Foundry v12](https://img.shields.io/badge/foundry-v12-green)
![Latest Release](https://img.shields.io/github/v/release/Drowbe/coffee-pub-scribe)
![MIT License](https://img.shields.io/badge/license-MIT-blue)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Drowbe/coffee-pub-scribe/release.yml)
![GitHub all releases](https://img.shields.io/github/downloads/Drowbe/coffee-pub-scribe/total)

Introducing "Coffee Pub Scribe," the latest in the growing suite of Coffee Pub tools, designed to bring the warmth and camaraderie of a storyteller's coffee pub to your Foundry VTT gaming table. This module transforms the storytelling experience, turning journal entries into beautifully formatted narrative cards that invite players into the heart of your tale without ever leaving the chat window's embrace.

## Features of "Coffee Pub Scribe":

- **Part of Coffee Pub Tools:** Scribe joins a family of tools aimed at enriching your gaming experience with the charm of a coffee pub meet-up.
- **Stylized Text Cards:** Enliven your campaign narrative with text cards that are as visually appealing as they are captivating.
- **Chat Window Integration:** Merge your storytelling seamlessly into the game's chat, maintaining engagement and immersion.
- **Custom Design Options:** Customize the look of your narrative cards to fit the atmosphere and aesthetic of your campaign's world.
- **User-friendly Interface:** Intuitive design for quick learning and use, so you can focus more on the story and less on the setup.
- **Adaptive Text Formatting:** Auto-adjusting content for readability, ensuring that your story's presentation is always top-notch.
- **Journal Enhancements:** For GMs, view the formatted player cards directly within your journal entries, linking narration and gameplay together smoothly.
- **HTML Blockquote Integration:** Utilize simple HTML to elevate your storytelling. Wrap any text in blockquote tags, and Scribe will transform it into a beautifully formatted card, consistent with the Scribe style.
- **Narration Button:** Send the narration block to the chat window.
- **Image Button:** Send a journal image to the chat window.
- **Handout Creation:** Send any narrative block in the journal to a handout for your players.

Welcome "Coffee Pub Scribe" into your sessions, and let it infuse your campaign with the narrative depth and interactive storytelling reminiscent of a cozy evening at your local coffee pub.

## Narration  Format

To build a nicely formatted card, all you need to do is leverage the markup built right into foundry. Insideo fa normal hournal entry, anything you put within a "blockquote" tag will be formatted as a Scribe narration card. This DOES MEAN that if you plan to use blockquote for other reason, any of the content you put into it will be formatted as a Scribe Narration block.

<blockquote>
    <h4>Card Title</h4> 
    <p>Some narrative here.</p>
    <h5>Image Title</h5>
    <img src="link to image">
    <hr>
    <p>Optional additional narrative</p>
    <h6><strong>Name of Speaker</strong> "The words the speaker is saying."</h6>
    <h6><em>Inner Dialogue</em> "The text that the player is thinking"</h6>
</blockquote>

When scribe sees the blockquote, it will add a gm-only toolbar to it allowing the gm to send it to the chat window, send the image to the chat window, or create a handout for the players. As we add more layout elements to Scribe, we will update this simple framework as necessary.