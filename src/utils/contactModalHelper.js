/**
 * contactModalHelper:
 * Global dispatcher to trigger the official in-web direct email modal from anywhere.
 */
export function openContactModal(initialSubject = '') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-contact-modal', {
        detail: { subject: initialSubject },
      })
    )
  }
}
