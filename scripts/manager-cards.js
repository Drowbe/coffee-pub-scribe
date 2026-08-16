// ==================================================================
// ===== CHAT CARDS =================================================
// ==================================================================
//
// Scribe does not write card HTML. A card is described as data — a
// composition of Blacksmith-owned parts — and Blacksmith renders it,
// themes it, and owns the message header.
// See documentation/api/api-chatcards.md in Blacksmith.
//
// This module owns access to that API and the one conversion Scribe's
// own data needs: turning a stored theme choice into something post()
// will accept.

import { MODULE } from './const.js';

/** Blacksmith's chat cards API, or null when it is unavailable. */
export function getChatCardsAPI() {
    return game.modules.get('coffee-pub-blacksmith')?.api?.chatCards ?? null;
}

/**
 * The card theme this world has chosen, or undefined to follow Blacksmith's
 * world default.
 *
 * The stored value is validated against the themes Blacksmith actually offers
 * rather than trusted. A world updated from an earlier Scribe holds one of the
 * old stylesheet names here ('theme-dark'), which is not a theme id — passing
 * it through would pin every card to Tan and log a warning per post, where
 * undefined lets the world default apply until the GM picks again.
 *
 * @returns {string|undefined}
 */
export function getCardTheme() {
    const chosen = BlacksmithUtils.getSettingSafely(MODULE.ID, 'cardTheme', '');
    if (!chosen) return undefined;
    const themes = getChatCardsAPI()?.getThemeChoices?.('card') ?? {};
    return chosen in themes ? chosen : undefined;
}

/**
 * Post one card.
 *
 * `moduleId` and `theme` are supplied here so no caller has to remember
 * either — the module id because every button's action is namespaced by
 * it, the theme because all three of Scribe's cards follow the one setting.
 *
 * @param {object} options - a chatCards.post() descriptor, minus moduleId
 * @returns {Promise<ChatMessage|null>} null when the card could not be posted
 */
export async function postCard(options = {}) {
    const chatCards = getChatCardsAPI();
    if (!chatCards) {
        // `typeof` rather than optional chaining: Blacksmith assigns this on
        // window, so a bare read throws in the one case this branch is for.
        if (typeof BlacksmithUtils !== 'undefined' && BlacksmithUtils?.postConsoleAndNotification) {
            BlacksmithUtils.postConsoleAndNotification(
                MODULE.NAME, 'SCRIBE: Chat cards API unavailable — card not posted', options?.type ?? '', false, false
            );
        }
        return null;
    }
    return chatCards.post({ moduleId: MODULE.ID, theme: getCardTheme(), ...options });
}
