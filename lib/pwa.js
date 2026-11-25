/**
 * Whether the install guide should open by itself (not when the user asks for it).
 * - never when the app is already installed (standalone)
 * - never again once the user has seen/closed it, even if Android fires beforeinstallprompt
 * - never for copies that are only opened on demand (autoOpen = false)
 */
export function shouldAutoOpenInstallGuide({ isStandalone, hasSeen, autoOpen = true }) {
    return Boolean(autoOpen && !isStandalone && !hasSeen);
}
