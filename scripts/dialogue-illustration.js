// ================================================================== 
// ===== IMPORTS ====================================================
// ================================================================== 

import {SCRIBE} from './const.js';

// ================================================================== 
// ===== EXPORTS ====================================================
// ================================================================== 

export class ImageFormApplication extends FormApplication {
  constructor(object, options = {}) {
    super(object, options);
  }

  /** Defaults options of the form application. */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "image-form",
      title: "Narrative Illustration",
      template: SCRIBE.DIALOGUE_ILLUSTRATION_TEMPLATE,
      width: 400,
      height: "auto",
      closeOnSubmit: true,
      classes: ["window-app", "scribe-dialogue"]
    });
  }

  async getData() {
    const data = super.getData();
    const imageUrl = this.object.src;
    data.strIllustration = imageUrl;
    return data;
  }

  /** Override the render function to do some action after render if needed. */
  async _render(force, options = {}) {
    await super._render(force, options);
    // Do some stuff after render if needed.
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
      width: Math.min(this.naturalWidth, window.innerWidth * 0.7),
      height: Math.min(this.naturalHeight, window.innerHeight * 0.7),
      resizable: true
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
      AudioHelper.play({ src: strSoundPath, volume: strVolume, autoplay: true, loop: false }, true);
  }
}
