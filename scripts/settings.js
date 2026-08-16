// ================================================================== 
// ===== IMPORTS ====================================================
// ================================================================== 

// Grab the module data
import { MODULE, SCRIBE  } from './const.js';
import { BlacksmithAPI } from '/modules/coffee-pub-blacksmith/api/blacksmith-api.js';


// ================================================================== 
// ===== SETTINGS ===================================================
// ================================================================== 

/**
 * Card theme choices for the settings dropdown, keyed by Blacksmith theme id.
 *
 * The empty key is Scribe's own: it means "whatever the world default is",
 * which post() resolves at post time.
 */
async function getCardThemeChoices() {
	const fallback = { '': 'Blacksmith Default' };
	try {
		const blacksmith = await BlacksmithAPI.get();
		const chatCards = blacksmith?.chatCards;
		if (typeof chatCards?.getThemeChoices !== 'function') {
			console.warn(MODULE.ID + ': Blacksmith Chat Cards API not available, using fallback theme choices');
			return fallback;
		}
		return { ...fallback, ...chatCards.getThemeChoices('card') };
	} catch (error) {
		console.error(MODULE.ID + ': Error getting card theme choices from Blacksmith:', error);
		return fallback;
	}
}

export const registerSettings = () => {
	Hooks.once('ready', async() => {
    // -------------------------------------------------------------- 
    // Register settings...

	// ---------- TITLE SCRIBE----------
	game.settings.register(MODULE.ID, "headingH1Scribe", {
		name: MODULE.ID + '.headingH1Scribe-Label',
		hint: MODULE.ID + '.headingH1Scribe-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	// ---------- STYLE ----------
	game.settings.register(MODULE.ID, "headingH2Theme", {
		name: MODULE.ID + '.headingH2Theme-Label',
		hint: MODULE.ID + '.headingH2Theme-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	/**
	 * Which Blacksmith card theme Scribe's chat cards wear.
	 *
	 * Theme IDs, not stylesheet names: chatCards.post() takes an id, and there
	 * is no longer a file here to swap. The empty choice defers to whatever the
	 * world has set as its default, which is also where a world updated from an
	 * earlier Scribe lands — the value it stored ('theme-dark') is not an id,
	 * so manager-cards.js drops it until the GM picks again.
	 *
	 * No reload: the theme is read when a card is posted, not when the page loads.
	 */
	const themeChoices = await getCardThemeChoices();

	game.settings.register(MODULE.ID, 'cardTheme', {
		name: MODULE.ID + '.cardTheme-Label',
		hint: MODULE.ID + '.cardTheme-Hint',
		scope: 'world',
		config: true,
		requiresReload: false,
		type: String,
		default: '',
		choices: themeChoices
	});











	// ---------- TOOLBAR ----------
	game.settings.register(MODULE.ID, "headingH2Toolbar", {
		name: MODULE.ID + '.headingH2Toolbar-Label',
		hint: MODULE.ID + '.headingH2Toolbar-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	// -- TOOLBAR ENABLED --
	game.settings.register(MODULE.ID, 'toolbarEnabled', {
		name: MODULE.ID + '.toolbarEnabled-Label',
		hint: MODULE.ID + '.toolbarEnabled-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});

	// -- BUTTON LABELS ENABLED --
	game.settings.register(MODULE.ID, 'toolbarButtonLabelEnabled', {
		name: MODULE.ID + '.toolbarButtonLabelEnabled-Label',
		hint: MODULE.ID + '.toolbarButtonLabelEnabled-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});

	// -- NARRATION BUTTON --
	game.settings.register(MODULE.ID, 'toolbarButtonNarration', {
		name: MODULE.ID + '.toolbarButtonNarration-Label',
		hint: MODULE.ID + '.toolbarButtonNarration-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});
	// -- ILLUSTRATION BUTTON --
	game.settings.register(MODULE.ID, 'toolbarButtonIllustration', {
		name: MODULE.ID + '.toolbarButtonIllustration-Label',
		hint: MODULE.ID + '.toolbarButtonIllustration-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});
	// -- HANDOUT BUTTON --
	game.settings.register(MODULE.ID, 'toolbarButtonHandout', {
		name: MODULE.ID + '.toolbarButtonHandout-Label',
		hint: MODULE.ID + '.toolbarButtonHandout-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});
	// -- COPY BUTTON --
	game.settings.register(MODULE.ID, 'toolbarButtonCopy', {
		name: MODULE.ID + '.toolbarButtonCopy-Label',
		hint: MODULE.ID + '.toolbarButtonCopy-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
	default: true,
	});
	// -- COPY BUTTON --
	game.settings.register(MODULE.ID, 'toolbarButtonExport', {
		name: MODULE.ID + '.toolbarButtonExport-Label',
		hint: MODULE.ID + '.toolbarButtonExport-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
	default: true,
	});

	// -- PRINT BUTTON --
	game.settings.register(MODULE.ID, 'toolbarButtonPrint', {
		name: MODULE.ID + '.toolbarButtonPrint-Label',
		hint: MODULE.ID + '.toolbarButtonPrint-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});

	// ----------  HANDOUTS ----------
	game.settings.register(MODULE.ID, "headingH2Handouts", {
		name: MODULE.ID + '.headingH2Handouts-Label',
		hint: MODULE.ID + '.headingH2Handouts-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	// -- Handout Folder --
	game.settings.register(MODULE.ID,'handoutFolder', {
		name: MODULE.ID + '.handoutFolder-Label',
		hint: MODULE.ID + '.handoutFolder-Hint',
		scope: "world",
		config: true,
		requiresReload: false,
		type: String,
		default: 'Party Handouts'
	});

	// -- Folder Color --
	game.settings.register(MODULE.ID,'folderColor', {
		name: MODULE.ID + '.folderColor-Label',
		hint: MODULE.ID + '.folderColor-Hint',
		scope: "world",
		config: true,
		requiresReload: false,
		type: String,
		default: '#77274e'
	});

    // -------------------------------------------------------------- 
});
};