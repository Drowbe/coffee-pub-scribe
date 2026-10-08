// ==================================================================
// ===== IMPORTS ====================================================
// ==================================================================

import {SCRIBE} from './const.js';
import { BlacksmithWindowBaseV2 } from '/modules/coffee-pub-blacksmith/api/blacksmith-api.js';

// ==================================================================
// ===== EXPORTS ====================================================
// ==================================================================

export class ImageFormApplication extends BlacksmithWindowBaseV2 {
  constructor(object, options = {}) {
    super(options);
    this.object = object;
  }

  // Foundry already merges DEFAULT_OPTIONS across the whole prototype chain; copying
  // super.DEFAULT_OPTIONS here would duplicate array entries such as window.controls.
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(
    {},
    {
      id: "image-form",
      classes: ["scribe-dialogue"],
      position: { width: 400, height: "auto" },
      window: { title: "Narrative Illustration", resizable: true }
    }
  );

  static PARTS = {
    body: { template: 'modules/coffee-pub-blacksmith/templates/window-template.hbs' }
  };

  async getData() {
    const bodyContent = await foundry.applications.handlebars.renderTemplate(
      SCRIBE.DIALOGUE_ILLUSTRATION_TEMPLATE,
      { strIllustration: this.object.src }
    );
    return {
      appId: this.id,
      showOptionBar: false,
      showHeader: false,
      showTools: false,
      showActionBar: false,
      bodyContent
    };
  }
}

// ================================================================== 
// ===== FUNCTIONS ==================================================
// ================================================================== 

// ** Illustration Popup **

/**
 * Open an illustration at its own size.
 *
 * Takes the URL rather than an element: the chat card delivers it as an
 * action value, which survives a browser reload where an inline listener
 * on a button does not.
 *
 * @param {string} imageUrl
 */
export function showIllustration(imageUrl) {
  if (!imageUrl) return;

  let img = new Image();
  img.onload = async function () {
    let options = {
      position: {
        width: Math.min(this.naturalWidth, window.innerWidth * 0.7),
        height: Math.min(this.naturalHeight, window.innerHeight * 0.7)
      },
      window: { resizable: true }
    };

    const form = new ImageFormApplication(img, options);
    playSound("book-open-02");
    form.render(true);
  };
  img.src = imageUrl;
}

/**
 * The same popup, reached from a raw button.
 *
 * Only pre-migration chat messages still carry one of these — cards posted
 * now use the registered action instead.
 *
 * @param {HTMLElement} button
 */
export function showDialogueFromImageButton(button) {
  showIllustration(button.getAttribute('image-url') || button.dataset.imageUrl);
}

// ** Play Sounds **

function playSound(strSound) {  
  const strSoundPath = SCRIBE.PATH_SOUND + strSound + ".mp3";
  const strVolume = "0.7"
  if (strSoundPath) {
      foundry.audio.AudioHelper.play({ src: strSoundPath, volume: strVolume, autoplay: true, loop: false }, true);
  }
}
