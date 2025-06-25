// ================================================================== 
// ===== IMPORTS ====================================================
// ================================================================== 

// Grab the module data
import { MODULE_TITLE, MODULE_ID, SCRIBE  } from './const.js';
// -- Import the shared GLOBAL variables --
import { COFFEEPUB, MODULE_AUTHOR } from './global.js';
// -- Load the shared GLOBAL functions --
import { registerBlacksmithUpdatedHook, postConsoleAndNotification, getActorId, resetModuleSettings} from './global.js';
// -- Import special page variables --
// None.

// ================================================================== 
// ===== EXPORTS ====================================================
// ================================================================== 

// ================================================================== 
// ===== FUNCTIONS ==================================================
// ================================================================== 

// ================================================================== 
// ===== SETTINGS ===================================================
// ================================================================== 

export const registerSettings = () => {
	Hooks.once('ready', async() => {
    // -------------------------------------------------------------- 
    // Register settings...

	// ---------- TITLE SCRIBE----------
	game.settings.register(MODULE_ID, "headingH1Scribe", {
		name: MODULE_ID + '.headingH1Scribe-Label',
		hint: MODULE_ID + '.headingH1Scribe-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	// ---------- STYLE ----------
	game.settings.register(MODULE_ID, "headingH2Theme", {
		name: MODULE_ID + '.headingH2Theme-Label',
		hint: MODULE_ID + '.headingH2Theme-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	game.settings.register(MODULE_ID, 'cardTheme', {
		name: MODULE_ID + '.cardTheme-Label',
		hint: MODULE_ID + '.cardTheme-Hint',
		scope: 'world',
		config: true,
		requiresReload: true,
		type: String,
		default: 'theme-dark',
		choices: {
			'theme-none': 'None',
			'theme-earth': 'Brown Earth',
			'theme-dark': 'Dark and Stormy',
			'theme-red': 'Red Wine',
			'theme-blue': 'Blue Velvet',
			'theme-green': 'Green Moss',
		}
	});











	// ---------- TOOLBAR ----------
	game.settings.register(MODULE_ID, "headingH2Toolbar", {
		name: MODULE_ID + '.headingH2Toolbar-Label',
		hint: MODULE_ID + '.headingH2Toolbar-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	// -- TOOLBAR ENABLED --
	game.settings.register(MODULE_ID, 'toolbarEnabled', {
		name: MODULE_ID + '.toolbarEnabled-Label',
		hint: MODULE_ID + '.toolbarEnabled-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});

	// -- BUTTON LABELS ENABLED --
	game.settings.register(MODULE_ID, 'toolbarButtonLabelEnabled', {
		name: MODULE_ID + '.toolbarButtonLabelEnabled-Label',
		hint: MODULE_ID + '.toolbarButtonLabelEnabled-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});

	// -- NARRATION BUTTON --
	game.settings.register(MODULE_ID, 'toolbarButtonNarration', {
		name: MODULE_ID + '.toolbarButtonNarration-Label',
		hint: MODULE_ID + '.toolbarButtonNarration-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});
	// -- ILLUSTRATION BUTTON --
	game.settings.register(MODULE_ID, 'toolbarButtonIllustration', {
		name: MODULE_ID + '.toolbarButtonIllustration-Label',
		hint: MODULE_ID + '.toolbarButtonIllustration-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});
	// -- HANDOUT BUTTON --
	game.settings.register(MODULE_ID, 'toolbarButtonHandout', {
		name: MODULE_ID + '.toolbarButtonHandout-Label',
		hint: MODULE_ID + '.toolbarButtonHandout-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});
	// -- COPY BUTTON --
	game.settings.register(MODULE_ID, 'toolbarButtonCopy', {
		name: MODULE_ID + '.toolbarButtonCopy-Label',
		hint: MODULE_ID + '.toolbarButtonCopy-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
	default: true,
	});
	// -- COPY BUTTON --
	game.settings.register(MODULE_ID, 'toolbarButtonExport', {
		name: MODULE_ID + '.toolbarButtonExport-Label',
		hint: MODULE_ID + '.toolbarButtonExport-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
	default: true,
	});

	// -- PRINT BUTTON --
	game.settings.register(MODULE_ID, 'toolbarButtonPrint', {
		name: MODULE_ID + '.toolbarButtonPrint-Label',
		hint: MODULE_ID + '.toolbarButtonPrint-Hint',
		type: Boolean,
		config: true,
		requiresReload: false,
		scope: 'world',
		default: true,
	});

	// ----------  HANDOUTS ----------
	game.settings.register(MODULE_ID, "headingH2Handouts", {
		name: MODULE_ID + '.headingH2Handouts-Label',
		hint: MODULE_ID + '.headingH2Handouts-Hint',
		scope: "world",
		config: true,
		default: "",
		type: String,
	});
	// -------------------------------------

	// -- Handout Folder --
	game.settings.register(MODULE_ID,'handoutFolder', {
		name: MODULE_ID + '.handoutFolder-Label',
		hint: MODULE_ID + '.handoutFolder-Hint',
		scope: "world",
		config: true,
		requiresReload: false,
		type: String,
		default: 'Party Handouts'
	});

	// -- Folder Color --
	game.settings.register(MODULE_ID,'folderColor', {
		name: MODULE_ID + '.folderColor-Label',
		hint: MODULE_ID + '.folderColor-Hint',
		scope: "world",
		config: true,
		requiresReload: false,
		type: String,
		default: '#77274e'
	});

    // -------------------------------------------------------------- 
});
};