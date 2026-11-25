/**
 * True if elements can use the native Fullscreen API.
 * iPhone Safari only allows fullscreen for <video>, so there we fall back to a CSS
 * "pseudo fullscreen" (the element is fixed over the whole screen).
 */
export function supportsNativeFullscreen(doc) {
    return Boolean(doc && (doc.fullscreenEnabled || doc.webkitFullscreenEnabled));
}
