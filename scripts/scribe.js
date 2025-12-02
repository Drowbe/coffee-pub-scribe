// ================================================================== 
// ===== IMPORTS ====================================================
// ================================================================== 

// -- Import MODULE variables --
import { MODULE, SCRIBE, SCRIBE_HTML_EXPORT_CSS } from './const.js';
// -- Import special page variables --
// Register settings so they can be loaded below.
import { registerSettings } from './settings.js';
// -- Forms and Windows --
import {ImageFormApplication, showDialogueFromImageButton} from './dialogue-illustration.js';

// ================================================================== 
// ===== BEGIN: REGISTER BLACKSMITH API =============================
// ================================================================== 
import { BlacksmithAPI } from '/modules/coffee-pub-blacksmith/api/blacksmith-api.js';
// Register your module with Blacksmith (use 'ready' instead of 'init')
Hooks.once('ready', async () => {
    try {
        // Get the module manager
        const moduleManager = BlacksmithModuleManager;
        // Register your module
        moduleManager.registerModule(MODULE.ID, {
            name: MODULE.NAME,
            version: MODULE.VERSION
        });
        // Log success
        console.log('✅ Module ' + MODULE.NAME + ' registered with Blacksmith successfully');
    } catch (error) {
        console.error('❌ Failed to register ' + MODULE.NAME + ' with Blacksmith:', error);
    }
});
// ================================================================== 
// ===== END: REGISTER BLACKSMITH API ===============================
// ================================================================== 


// ================================================================== 
// ===== REGISTER COMMON ============================================
// ================================================================== 

// Blacksmith hook registration is handled automatically by the API
// Ensure the settings are registered before anything else
registerSettings();

// ================================================================== 
// ===== HOOKS ======================================================
// ================================================================== 

// ************************************
// ** INIT **
// ************************************
Hooks.once('init', async () => {
    await $(document).ready(() => {

    });

});
// ************************************
// ** READY **
// ************************************
Hooks.on("ready", () => {
    // Do these things after the client has loaded
    const cardTheme = BlacksmithUtils.getSettingSafely(MODULE.ID, 'cardTheme', 'theme-dark');
    changeCSS(cardTheme);
    BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, "SCRIBE: Setting Card theme...", "", false, false);

    // Register Blacksmith hooks
    const hookManager = BlacksmithHookManager;

    // Register chat message hook
    const chatHookId = hookManager.registerHook({
        name: 'renderChatMessage',
        description: 'SCRIBE: Handle chat message illustration buttons',
        context: 'scribe-chat-message',
        priority: 5,
        callback: (message, html) => {
            // Hook into the chat message rendering
            // Find the image button in the chat message
            const imageButton = html.find('button.scribe-cards-illustration-button');
            // Attach a click event listener to the image button
            imageButton.click((event) => {
                event.preventDefault();
                showDialogueFromImageButton(event.currentTarget);
            });
        }
    });

    // Register journal page sheet hook
    const journalPageHookId = hookManager.registerHook({
        name: 'renderJournalPageSheet',
        description: 'SCRIBE: Add toolbar to journal page blockquotes',
        context: 'scribe-journal-toolbar',
        priority: 5,
        callback: (journalPageSheet, html, data) => {
            // Check if the toolbarEnabled setting is true
            const toolbarEnabled = BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarEnabled', true);
            // If the toolbar isn't enabled, don't do anything
            if (!toolbarEnabled) return;
            
            // Check if we're in edit mode - don't add toolbar if editing
            const isEditMode = html.find('.editor').length > 0;
            if (isEditMode) {
                // Add double-click handler to images in the editor
                const editor = html.find('.editor');
                editor.on('dblclick', 'img', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    // Find the Insert Image button in the same sheet
                    const insertImageButton = html.find('button[data-action="image"]:visible').first();
                    if (insertImageButton.length) {
                        insertImageButton[0].click();
                    }
                });
                return;
            }

            // If the user is a GM, process the blockquotes and add the toolbar
            if (game.user.hasRole("GAMEMASTER")) {
                BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, "SCRIBE: Is a GM", "", true, false);
                // Process existing blockquotes and add the toolbar
                addToolbarToBlockquotes(html);
                
                // Debounce function to limit how often addToolbarToBlockquotes is called
                function debounce(func, wait) {
                    let timeout;
                    return function(...args) {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => func.apply(this, args), wait);
                    };
                }
                
                // Set up the MutationObserver with debounced callback
                observer = new MutationObserver(debounce((mutations, observer) => {
                    // Check if we're in edit mode before processing mutations
                    const isCurrentlyEditing = html.find('.editor').length > 0;
                    if (!isCurrentlyEditing) {
                        addToolbarToBlockquotes(html);
                    }
                }, 100));
                
                // Observe the target node for changes
                observer.observe(html[0], { childList: true, subtree: true });
            }
            // Make the HTML available everywhere.
            window.exportNarrationToHTML = exportNarrationToHTML;
        }
    });

    // Register journal sheet hook
    const journalSheetHookId = hookManager.registerHook({
        name: 'renderJournalSheet',
        description: 'SCRIBE: Add export button to journal titlebar',
        context: 'scribe-journal-export',
        priority: 5,
        callback: (journalSheet, html, data) => {
            // Check if the export button is enabled
            const exportButtonEnabled = BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarButtonPrint', true);
            if (!exportButtonEnabled) return;
            
            // Check if the user can view the journal (GM, Assistant GM, Trusted Players, or Players with permission)
            if (!game.user.hasRole("GAMEMASTER") && !game.user.hasRole("ASSISTANT") && !game.user.hasRole("TRUSTED")) {
                // For regular players, check if they have permission to view this specific journal
                if (!journalSheet.object.testUserPermission(game.user, "LIMITED")) return;
            }
            
            // Find the window header
            const windowHeader = html.find('.window-header');
            if (windowHeader.length === 0) return;
            
            // Check if the export button already exists
            if (windowHeader.find('.scribe-journal-export-button').length > 0) return;
            
            // Create the export button as a DOM <a> element for compatibility
            const exportButton = document.createElement('a');
            exportButton.className = 'header-button control scribe-journal-export-button';
            exportButton.href = '#';
            exportButton.title = 'Export Journal';
            exportButton.setAttribute('data-journal-id', journalSheet.object.id);
            exportButton.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Export';
            // Insert before the close button
            const closeButton = windowHeader.find('.close');
            if (closeButton.length > 0) {
                closeButton.before(exportButton);
            } else {
                windowHeader.append(exportButton);
            }
            // Defensive: re-assign after a short delay to catch any Foundry re-renders
            setTimeout(() => {
                try {
                    const btn = windowHeader.find('.scribe-journal-export-button')[0];
                    if (btn) {
                        btn.onclick = (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            openJournalForPrinting(journalSheet.object);
                        };
                    }
                } catch (e) {
                    // Fail silently if button is not present
                }
            }, 50);
        }
    });

    BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, "SCRIBE: Hooks registered successfully", { 
        chat: chatHookId, 
        journalPage: journalPageHookId, 
        journalSheet: journalSheetHookId 
    }, false, false);
});
// Define the observer variable at the top level
let observer;

// ================================================================== 
// ===== FUNCTIONS ==================================================
// ================================================================== 

// ************************************
// ** TOOLBAR: ADD TOOLBAR
// ************************************

function addToolbarToBlockquotes(html) {
    BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, "SCRIBE: in addToolbarToBlockquotes and looking for blockquotes", "", true, false);
    html.find("blockquote").each(function () {
        BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, "SCRIBE: in found the blockqupte and am adding the toolbar...", "", true, false);
        const blockquote = $(this);
        if (blockquote.find('.scribe-journal-buttons-wrapper').length) {
            BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, "SCRIBE: toolbar already exists, skipping...", "", true, false);
            return;
        }
        var buttonHTMLOpen = '<div class="scribe-journal-buttons-wrapper"><div class="scribe-journal-buttons-container">';
        var buttonHTMLClose = '</div></div>';
        var buttonHTMLNarration = '<button class="scribe-journal-narration-button-normal" type="button" title="Narration"><i class="fa-solid fa-masks-theater"></i></button>';
        var buttonHTMLHandout = '<button class="scribe-journal-save-button-normal" type="button" title="Handout"><i class="fa-solid fa-book-open"></i></button>';
        var buttonHTMLExport = '<button class="scribe-journal-export-button-normal" type="button" title="Export" onclick="exportNarrationToHTML()"><i class="fa-solid fa-cloud-arrow-down"></i></button>';
        var buttonHTMLCopy = '<button class="scribe-journal-copy-button-normal" type="button" title="Copy" onclick="copyNarrationToClipboard(this.closest(\'blockquote\'))"><i class="fa-solid fa-clone"></i></button>';
        var strChatCardTitle = "Handout Created";
        var toolbarEnabled = false; // Flag to check if any button is enabled

        // Check if toolbarButtonLabelEnabled is true
        const toolbarButtonLabelEnabled = BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarButtonLabelEnabled', true);




        
        blockquote.append(buttonHTMLOpen);
        const buttonsContainer = blockquote.find('.scribe-journal-buttons-container');

        // Check settings and append buttons accordingly
        if (BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarButtonExport', true)) {
            if (toolbarButtonLabelEnabled) {
                buttonHTMLExport = '<button class="scribe-journal-export-button-normal" type="button" title="Export" onclick="exportNarrationToHTML()"><i class="fa-solid fa-cloud-arrow-down"></i> Export</button>';
            }
            buttonsContainer.append(buttonHTMLExport);
            toolbarEnabled = true;
        }
        if (BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarButtonCopy', true)) {
            if (toolbarButtonLabelEnabled) {
                buttonHTMLCopy = '<button class="scribe-journal-copy-button-normal" type="button" title="Copy" onclick="copyNarrationToClipboard(this.closest(\'blockquote\'))"><i class="fa-solid fa-clone"></i> Copy</button>';
            }
            buttonsContainer.append(buttonHTMLCopy);
            toolbarEnabled = true;
        }
        if (BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarButtonHandout', true)) {
            if (toolbarButtonLabelEnabled) {
                buttonHTMLHandout = '<button class="scribe-journal-save-button-normal" type="button" title="Handout"><i class="fa-solid fa-book-open"></i> Handout</button>';
            }
            buttonsContainer.append(buttonHTMLHandout);
            toolbarEnabled = true;
        }

        // Look for images and create buttons for them   
        blockquote.find('img').each(function () {
            const imgTag = $(this);
            const imgSrc = imgTag.attr('src');
            let buttonHTMLIllustration = `<button image-url="${imgSrc}" class="scribe-journal-illustration-button-normal" type="button" title="Illustration"><i class="fa-solid fa-paintbrush"></i></button>`;
            if (BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarButtonIllustration', true)) {
                if (toolbarButtonLabelEnabled) {
                    buttonHTMLIllustration = `<button image-url="${imgSrc}" class="scribe-journal-illustration-button-normal" type="button" title="Illustration"><i class="fa-solid fa-paintbrush"></i> Illustration</button>`;
                }
                const $buttonHTMLIllustration = $(buttonHTMLIllustration);
                buttonsContainer.append($buttonHTMLIllustration);
                $buttonHTMLIllustration.click(() => {
                    if (imgSrc) {
                        const strCardTitle = $buttonHTMLIllustration[0].textContent;
                        const chatImgData = {
                            user: game.user.id,
                            content: `<span style='visibility: hidden'>coffeepub-hide-header</span><blockquote id="scribe-card-illustration-wrapper"><h4>${strCardTitle}</h4><img src="${imgSrc}" alt="View Narrative Illustration"><button class="scribe-cards-illustration-button" data-image-url="${imgSrc}"><i class="fa-solid fa-clone"></i>View Illustration</button></blockquote>`,
                        };
                        BlacksmithUtils.playSound(COFFEEPUB.SOUNDEFFECTBOOK03, COFFEEPUB.SOUNDVOLUMENORMAL);
                        ChatMessage.create(chatImgData, {});
                    }
                });
                toolbarEnabled = true;
            }
        });

        // Append the narration button if the setting is enabled
        if (BlacksmithUtils.getSettingSafely(MODULE.ID, 'toolbarButtonNarration', true)) {
            if (toolbarButtonLabelEnabled) {
                buttonHTMLNarration = `<button class="scribe-journal-narration-button-normal" type="button" title="Narration"><i class="fa-solid fa-masks-theater"></i> Narration</button>`;
            }
            buttonsContainer.append(buttonHTMLNarration);
            toolbarEnabled = true;
        }

        // After appending buttons, check if any buttons were added
        if (!toolbarEnabled) {
            // If no buttons are enabled, remove the entire toolbar wrapper
            blockquote.find('.scribe-journal-buttons-wrapper').remove();
            return;
        }

        // If buttons were added, ensure the toolbar is properly structured
        buttonsContainer.append(buttonHTMLClose);

        // Send the Narration to the Chat
        const $sendButton = blockquote.find('.scribe-journal-narration-button-normal');
        $sendButton.click(() => {
            var cloneWithoutButtons = blockquote.clone().children().remove('.scribe-journal-buttons-wrapper').end();
            // Build the content
            // Add the code that we look for to hide the header button
            var content = "<span style='visibility: hidden'>coffeepub-hide-header</span><blockquote>" + cloneWithoutButtons.html() + "</blockquote>";
            const chatData = {
                user: game.user.id,
                content: content,
            };
            ChatMessage.create(chatData, {});
            BlacksmithUtils.playSound(COFFEEPUB.SOUNDEFFECTBOOK01, COFFEEPUB.SOUNDVOLUMENORMAL);
            observer.disconnect(); // Ensure observer is accessible here
        });

        // Save the Handout from the Journal from CHAT
        const $saveButton = blockquote.find('.scribe-journal-save-button-normal');
        $saveButton.click(() => {
            var cloneWithoutButtons = blockquote.clone().children().remove('.scribe-journal-buttons-wrapper').end();
            var content = "<blockquote>" + cloneWithoutButtons.html() + "</blockquote>";
            saveNarrationToJournal(content);
            BlacksmithUtils.playSound(COFFEEPUB.SOUNDEFFECTBOOK04, COFFEEPUB.SOUNDVOLUMENORMAL);
            observer.disconnect(); // Ensure observer is accessible here
        });


        BlacksmithUtils.postConsoleAndNotification(MODULE.NAME, "SCRIBE: toolbar added.", "", true, false);

    });
}

// ************************************
// ** JOURNAL PRINT: RESOLVE REFERENCES
// ************************************
async function resolveContentReferences(content) {
    if (!content) return content;
    // Patterns to match @UUID and @Embed references
    // Updated to handle both with and without display text
    const uuidPattern = /@UUID\[([^\]]+)\](?:\{([^}]+)\})?/g;
    const embedPattern = /@Embed\[([^\]]+)\](?:\{([^}]+)\})?/g;
    let resolvedContent = content;
    // Function to resolve a single reference
    async function resolveReference(uuid) {
        try {
            // Parse the UUID to get document type and ID
            const parts = uuid.split('.');
            if (parts.length < 3) return null;
            const documentType = parts[parts.length - 2]; // e.g., "Item", "JournalEntry"
            const documentId = parts[parts.length - 1];   // e.g., "tcoeFeatArtifice"
            // Handle different document types
            switch (documentType) {
                case 'Item':
                    // Try to get from compendium first, then from game
                    let item = null;
                    if (uuid.startsWith('Compendium.')) {
                        const compendium = game.packs.get(uuid.split('.')[1] + '.' + uuid.split('.')[2]);
                        if (compendium) {
                            const index = await compendium.getIndex();
                            const entry = index.find(e => e._id === documentId);
                            if (entry) {
                                item = await compendium.getDocument(entry._id);
                            }
                        }
                    } else {
                        item = game.items.get(documentId);
                    }
                    if (item) {
                        return `
                            <div class="resolved-item">
                                <h4>${item.name}</h4>
                                <div class="item-description">${item.system?.description?.value || item.description || 'No description available.'}</div>
                            </div>
                        `;
                    }
                    break;
                case 'JournalEntry':
                    // Try to get from compendium first, then from game
                    let journal = null;
                    if (uuid.startsWith('Compendium.')) {
                        const compendium = game.packs.get(uuid.split('.')[1] + '.' + uuid.split('.')[2]);
                        if (compendium) {
                            const index = await compendium.getIndex();
                            const entry = index.find(e => e._id === documentId);
                            if (entry) {
                                journal = await compendium.getDocument(entry._id);
                            }
                        }
                    } else {
                        journal = game.journal.get(documentId);
                    }
                    if (journal) {
                        let journalContent = `<div class="resolved-journal"><h4>${journal.name}</h4>`;
                        // If it's a specific page reference
                        if (parts.length > 3 && parts[parts.length - 3] === 'JournalEntryPage') {
                            const pageId = parts[parts.length - 1];
                            const page = journal.pages.get(pageId);
                            if (page) {
                                journalContent += `<div class="journal-page-content">${page.text.content}</div>`;
                            }
                        } else {
                            // Include all pages
                            journal.pages.forEach(page => {
                                journalContent += `<div class="journal-page-content"><h5>${page.name}</h5>${page.text.content}</div>`;
                            });
                        }
                        journalContent += '</div>';
                        return journalContent;
                    }
                    break;
                case 'Actor':
                    let actor = null;
                    if (uuid.startsWith('Compendium.')) {
                        const compendium = game.packs.get(uuid.split('.')[1] + '.' + uuid.split('.')[2]);
                        if (compendium) {
                            const index = await compendium.getIndex();
                            const entry = index.find(e => e._id === documentId);
                            if (entry) {
                                actor = await compendium.getDocument(entry._id);
                            }
                        }
                    } else {
                        actor = game.actors.get(documentId);
                    }
                    if (actor) {
                        return `
                            <div class="resolved-actor">
                                <h4>${actor.name}</h4>
                                <div class="actor-description">${actor.system?.description?.value || actor.description || 'No description available.'}</div>
                            </div>
                        `;
                    }
                    break;
                default:
                    // For other document types, try to get them generically
                    let document = null;
                    if (uuid.startsWith('Compendium.')) {
                        const compendium = game.packs.get(uuid.split('.')[1] + '.' + uuid.split('.')[2]);
                        if (compendium) {
                            const index = await compendium.getIndex();
                            const entry = index.find(e => e._id === documentId);
                            if (entry) {
                                document = await compendium.getDocument(entry._id);
                            }
                        }
                    } else {
                        // Try to get from game collections
                        const collection = game[documentType.toLowerCase() + 's'];
                        if (collection) {
                            document = collection.get(documentId);
                        }
                    }
                    if (document) {
                        return `
                            <div class="resolved-${documentType.toLowerCase()}">
                                <h4>${document.name}</h4>
                                <div class="${documentType.toLowerCase()}-description">${document.system?.description?.value || document.description || 'No description available.'}</div>
                            </div>
                        `;
                    }
                    break;
            }
        } catch (error) {
            console.warn(`Failed to resolve reference ${uuid}:`, error);
        }
        return null;
    }
    // Replace @UUID references
    const uuidMatches = [...content.matchAll(uuidPattern)];
    for (const match of uuidMatches) {
        const fullMatch = match[0];
        const uuid = match[1];
        const displayText = match[2]; // This will be undefined if no display text
        if (displayText) {
            // Has display text, format it as bold with color
            const formattedText = `<span class=\"uuid-link-text\">${displayText}</span>`;
            resolvedContent = resolvedContent.replace(fullMatch, formattedText);
        } else {
            // No display text, try to resolve the full content
            const resolved = await resolveReference(uuid);
            if (resolved) {
                resolvedContent = resolvedContent.replace(fullMatch, resolved);
            }
        }
    }
    // Replace @Embed references (same as @UUID but with different formatting)
    const embedMatches = [...content.matchAll(embedPattern)];
    for (const match of embedMatches) {
        const fullMatch = match[0];
        const uuid = match[1];
        const displayText = match[2]; // This will be undefined if no display text
        if (displayText) {
            // Has display text, format it as bold with color
            const formattedText = `<span class=\"uuid-link-text\">${displayText}</span>`;
            resolvedContent = resolvedContent.replace(fullMatch, formattedText);
        } else {
            // No display text, try to resolve the full content
            const resolved = await resolveReference(uuid);
            if (resolved) {
                resolvedContent = resolvedContent.replace(fullMatch, resolved);
            }
        }
    }
    return resolvedContent;
}

// ************************************
// ** RECURSIVE RESOLVER FOR REFERENCES
// ************************************
async function resolveAllReferences(content) {
    let previous;
    let current = content;
    do {
        previous = current;
        current = await resolveContentReferences(previous);
    } while (current !== previous);
    return current;
}

// ************************************
// ** TOOLBAR: EXPORT NARRATIVE TO HTML   
// ************************************
async function exportNarrationToHTML() {
    const filename = prompt("Enter the name for the HTML file to be created");
    if (!filename) return;

    let divContent = document.querySelector('.journal-entry-page.text.level1');
    let clonedContent = divContent.cloneNode(true);

    // Use setTimeout to break down the tasks
    setTimeout(async () => {
        // Call scrubHTML function to clean the HTML
        clonedContent = scrubHTML(clonedContent);
        
        // Recursively resolve UUID and Embed references
        let resolvedContent = await resolveAllReferences(clonedContent.innerHTML);
        
        let style = SCRIBE_HTML_EXPORT_CSS;

        let htmlContent = '<html>\n<head>\n<title>' + filename + '</title>\n<style>' + style + '</style>\n</head>\n<body>\n' + resolvedContent + '\n</body>\n</html>';
        ui.notifications.info(`The file '${filename}.html' was saved to your default download location.`);
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename + ".html";
        link.click();
    }, 0);
}


// ************************************
// ** TOOLBAR: COPY HTML TO CLIPBOARD   
// ************************************

function copyNarrationToClipboard(blockquote) {
    let $blockquote = $(blockquote); // Ensure blockquote is a jQuery object
    let blockquoteContent = $blockquote.clone().children().remove('.scribe-journal-buttons-wrapper').end();
    let tempInput = document.createElement("textarea"); 
    tempInput.style = "position: absolute; left: -1000px; top: -1000px"; 
    tempInput.value = `<blockquote>${blockquoteContent.html()}</blockquote>`; 
    document.body.appendChild(tempInput); 
    tempInput.select(); 
    navigator.clipboard.writeText(tempInput.value).then(() => {
        ui.notifications.info(`The text has been copied to the clipboard.`);
    }).catch(err => {
        ui.notifications.error(`Failed to copy text: ${err}`);
    });
    document.body.removeChild(tempInput); 
}
window.copyNarrationToClipboard = copyNarrationToClipboard;

// ************************************
// ** TOOLBAR: SAVE NARRATIVE TO JOURNAL
// ************************************

// ** Save the narrative to a journal **
async function saveNarrationToJournal(message) {

    // Set template for the TOC
    
    const sceneImage = "modules/coffee-pub-blacksmith/images/banners/banner-dragon.webp";
    const tocContent = `
        <img src="${sceneImage}" alt="Scene Image" width="100%">
        <h2>Introduction</h2>
        <p>This table of contents is to be used as a little brain-tickle to remind you of where and when you experienced something. Do not rely on it as a replacement for your robust notes. Do not edit this page or other pages as you will lose your changes if things get updated: use your own notes.</p>
        <h2>Handouts</h2>
        <ul id="handouts-list"></ul>
`;

    // Get the current Scene name and the viewed Scene name
    const currentScene = game.scenes.active.name;
    const viewedScene = game.scenes.viewed.name;

    // Check if the GM is viewing a different scene than the active one
    let entryName = currentScene !== viewedScene ? viewedScene : currentScene;
    if (currentScene !== viewedScene) {
        ui.notifications.warn(`You are viewing a different scene. The journal will be created for the viewed scene: ${viewedScene}`);
    }

    // Set the Folder info
    let folderName = BlacksmithUtils.getSettingSafely(MODULE.ID, 'handoutFolder', 'Party Handouts') || 'Party Handouts';
    let folderColor = BlacksmithUtils.getSettingSafely(MODULE.ID, 'folderColor', '#77274e') || '#77274e';
    let folder = game.folders.find(f => f.name === folderName);
    if (!folder) {
        folder = await Folder.create({ 
            name: folderName, 
            type: "JournalEntry", 
            color: folderColor,
            permission: { default: 3 } // Everyone
        });
        ui.notifications.info(`New handout folder '${folderName}' created successfully.`);
    }

    // Check if the journal entry exists
    let journalEntry = game.journal.find(entry => entry.name === entryName && entry.folder?.id === folder?.id);
    if (!journalEntry) {
        journalEntry = await JournalEntry.create({
            name: entryName,
            folder: folder.id,
            permission: { default: 3 } // Everyone
        });
        // Create the TOC page in the new journal
        await journalEntry.createEmbeddedDocuments("JournalEntryPage", [{
            name: "Table of Contents",
            type: "text",
            text: { content: tocContent, format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML }
        }]);
        // Refresh the journal entry to ensure pages are populated
        journalEntry = game.journal.get(journalEntry.id);
    }

    // Ensure journalEntry.pages is defined
    if (!journalEntry.pages) {
        console.error("Journal entry pages are not defined.");
        console.log(journalEntry);
        return;
    }

    // Ensure tocPage is defined before accessing its properties
    let tocPage = journalEntry.pages.find(page => page.name === "Table of Contents");
    if (!tocPage) {
        console.error("Table of Contents page not found.");
        console.log(journalEntry.pages);
        return;
    }

    let tocContentExisting = tocPage.text.content;
    // Extract the existing handouts list
    let handoutsListMatch = tocContentExisting.match(/<ul id="handouts-list">(.*?)<\/ul>/s);
    let handoutsList = handoutsListMatch ? handoutsListMatch[1] : "";

    // Extract h4 tag content or use 'Handout' if no h4 tag
    let h4Content = message.match(/<h4[^>]*>(.*?)<\/h4>/);
    h4Content = h4Content ? h4Content[1] : "Handout";
    const pageName = h4Content;

    // Check if the page exists
    let page = journalEntry.pages.find(page => page.name === pageName);
    if (page) {
        await page.update({
            name: pageName,
            type: "text",
            text: { content: message, format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML }
        });
        ui.notifications.info(`The page '${pageName}' has been updated in the journal '${entryName}'.`);
    } else {
        let createdPages = await journalEntry.createEmbeddedDocuments("JournalEntryPage", [{
            name: pageName,
            type: "text",
            text: { content: message, format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML }
        }]);
        page = createdPages[0];
    }

    if (!page) {
        console.error("Failed to create or retrieve the page.");
        return;
    }

    // Update the Handouts section
    const handoutLink = `@UUID[JournalEntry.${journalEntry.id}.JournalEntryPage.${page.id}]{${pageName}}`;
    const handoutItem = `<li>${handoutLink}</li>`;
    if (!handoutsList.includes(handoutLink)) {
        // Add new link
        handoutsList += handoutItem;
    }

    // Update the Table of Contents content
    const updatedTocContent = tocContentExisting.replace(/<ul id="handouts-list">.*?<\/ul>/s, `<ul id="handouts-list">${handoutsList}</ul>`);
    await tocPage.update({
        text: {
            content: updatedTocContent,
            format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML // Use the constant for the format
        }
    });

    // Create a chat message with the journal entry link
    const strHandoutChatTitle = currentScene;
    const strHandoutChatPageTitle = pageName;
    const strHandoutChatFolder = folderName;
    const strHandoutChatLink = "@UUID[JournalEntry." + journalEntry.id + "]{" + strHandoutChatPageTitle + "}";
    postUpdateToChat(strHandoutChatTitle, strHandoutChatPageTitle, strHandoutChatFolder, strHandoutChatLink);
}

// ***************************************************
// ** UTILITY Scrub HTML
// ***************************************************

function scrubHTML(clonedContent) {
    //remove toolbar instances
    let scribeToolbars = clonedContent.querySelectorAll('.scribe-journal-buttons-wrapper');
    scribeToolbars.forEach(toolbar => toolbar.remove());

    //remove unwanted attributes
    let unwantedAttributes = ['class', 'draggable', 'data-uuid', 'data-id', 'data-type', 'data-tooltip', 'data-anchor'];
    unwantedAttributes.forEach(attr => {
        clonedContent.querySelectorAll(`[${attr}]`).forEach(el => el.removeAttribute(attr));
    });

    //remove h5 elements
    clonedContent.querySelectorAll('img').forEach(el => {
        if (el.previousElementSibling && el.previousElementSibling.tagName === 'H5') {
            el.previousElementSibling.remove();
        }
        el.remove();
    });

    //remove hr tags
    clonedContent.querySelectorAll('hr').forEach(el => el.remove());

    //replace blockquote with table
    clonedContent.querySelectorAll('blockquote').forEach(el => {
        let newElement = document.createElement('table');
        newElement.innerHTML = el.innerHTML;
        el.parentNode.replaceChild(newElement, el);
    });

    //make 'a' links bolded text
    clonedContent.querySelectorAll('a').forEach(el => {
        let newElement = document.createElement('b');
        newElement.textContent = el.textContent;
        el.parentNode.replaceChild(newElement, el);
    });

    //remove certain tags, keep content
    ['header', 'section'].forEach(tag => {
        clonedContent.querySelectorAll(tag).forEach(el => {
            let parent = el.parentNode;
            while (el.firstChild) parent.insertBefore(el.firstChild, el);
            parent.removeChild(el);
        });
    });

    //remove empty divs (updated)
    clonedContent.querySelectorAll('div').forEach(el => {
        if (el.innerHTML.trim() == '') el.remove();
    });

    //remove extra spaces
    clonedContent.innerHTML = clonedContent.innerHTML.replace(/\s\s+/g, ' ');

    //ensure no unwanted addition at the end
    let unwantedAddition = clonedContent.querySelectorAll('p:empty, div b:empty');
    unwantedAddition.forEach(el => el.remove());

    return clonedContent;
}

// ***************************************************
// ** UTILITY Post to Chat
// ***************************************************
function postUpdateToChat(title, page, folder, link) {
    // create a chat message with the journal entry link
    const chatMessageContent = `<b style="text-transform: uppercase;">${BlacksmithUtils.trimString(title, 75)}</b><p>A new handout named <b>${page}</b> has been created in the <b>${folder}</b> folder.</p><p>${link}</p>`;
    const chatData = {
        user: game.user.id,
        content: chatMessageContent,
    };
    ChatMessage.create(chatData, {});
    ui.notifications.info(`New journal entry '${page}' created successfully in '${folder}' inside the '${title}' journal.`);

}

// ***************************************************
// ** UTILITY Change Css File
// ***************************************************
// DOES or SHOULD any other module use this?
function changeCSS(cssFile) {
    // OKay... this will work if we cn figure out the link index
    var strCSSThemeFile = "/modules/coffee-pub-scribe/styles/" + cssFile + ".css";
    var oldlink = "/modules/coffee-pub-scribe/styles/theme-default.css";
    if (!document.getElementById(oldlink)) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = oldlink;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = strCSSThemeFile;
        link.media = 'all';
        head.appendChild(link);
    } else {
        // Do nothing
    }
}

// ************************************
// ** JOURNAL PRINT: OPEN FOR PRINTING
// ************************************
async function openJournalForPrinting(journalEntry) {
    // Get all pages from the journal
    const pages = journalEntry.pages.contents;
    if (!pages || pages.length === 0) {
        ui.notifications.warn("This journal has no content to print.");
        return;
    }
    
    // Create HTML content for all pages
    let fullContent = '';
    let pageNumber = 1;
    
    for (const page of pages) {
        if (page.type === 'text' && page.text && page.text.content) {
            // Clone the content to avoid modifying the original
            let pageContent = page.text.content;
            
            // Remove any existing Scribe toolbars from the content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = pageContent;
            const toolbars = tempDiv.querySelectorAll('.scribe-journal-buttons-wrapper');
            toolbars.forEach(toolbar => toolbar.remove());
            pageContent = tempDiv.innerHTML;
            
            // Recursively resolve UUID and Embed references
            pageContent = await resolveAllReferences(pageContent);
            
            // Add page header
            fullContent += `
                <div class="journal-page" style="page-break-after: always;">
                    <h2>${page.name}</h2>
                    <div class="page-content">
                        ${pageContent}
                    </div>
                </div>
            `;
            pageNumber++;
        }
    }
    
    // Create the complete HTML document
    let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${journalEntry.name} - Print View</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="modules/coffee-pub-scribe/styles/export.css">
        </head>
        <body>
            <div class="coffee-pub-scribe-export">
                <h1>${journalEntry.name}</h1>
                ${fullContent}
            </div>
        </body>
        </html>
    `;

    // --- Number the first h2 in each .journal-page, starting from 0 ---
    const tempDoc = document.implementation.createHTMLDocument('');
    tempDoc.documentElement.innerHTML = htmlContent;
    const pageDivs = tempDoc.querySelectorAll('.journal-page');
    let pageNum = 0;
    pageDivs.forEach(pageDiv => {
        const firstH2 = pageDiv.querySelector('h2');
        if (firstH2) {
            firstH2.classList.add('scribe-export-title');
            firstH2.innerHTML = `<div class='scribe-export-number'>${pageNum}</div> ` + firstH2.innerHTML;
            pageNum++;
        }
    });
    htmlContent = tempDoc.documentElement.outerHTML;

    // Open in new window/tab
    const newWindow = window.open('', '_blank');
    newWindow.document.write(htmlContent);
    newWindow.document.close();
    
    // Play sound effect
    BlacksmithUtils.playSound(COFFEEPUB.SOUNDEFFECTBOOK03, COFFEEPUB.SOUNDVOLUMENORMAL);
    
    ui.notifications.info(`Journal "${journalEntry.name}" opened for printing in a new tab.`);
}
