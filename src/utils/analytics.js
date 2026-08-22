/**
 * Wrapper de GA4. Centraliza el tracking para que los componentes
 * no dependan directamente de window.gtag.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}