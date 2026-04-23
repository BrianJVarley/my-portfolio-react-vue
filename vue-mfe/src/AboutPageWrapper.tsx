/**
 * AboutPageWrapper.ts
 *
 * The shell imports this file as 'vueMfe/AboutPage' via Module Federation.
 * Because the shell is a React app, we can't return a Vue SFC directly.
 *
 * Strategy: wrap the Vue component as a Custom Element (Web Component).
 * The shell renders <about-page /> as a native DOM element — no React/Vue
 * interop library needed. Vue 3 has first-class support for this via
 * defineCustomElement().
 *
 * Usage in shell (already wired in App.tsx):
 *   const AboutPage = lazy(() => import('vueMfe/AboutPage'))
 *   <AboutPage />  ← React renders the Web Component transparently
 */

import { defineCustomElement } from 'vue'
import AboutPageVue from './AboutPage.vue'
import { createPinia } from 'pinia'
// Convert Vue SFC → Custom Element
const AboutPageElement = defineCustomElement(AboutPageVue, {
  configureApp(app) {
    app.use(createPinia());
  },
  shadowRoot: true, // enable Shadow DOM encapsulation
});


// Register once (guard against HMR double-registration)
if (!customElements.get('about-page')) {
  customElements.define('about-page', AboutPageElement)
}

/**
 * React-compatible default export.
 * Returns a thin function component that renders the custom element.
 * The shell's lazy() + Suspense wraps this seamlessly.
 */
export default function AboutPage() {
  // @ts-expect-error — JSX doesn't know about custom elements by default
  return <about-page />
}

// Required: tell the bundler this module has side effects (CE registration)
// so it isn't tree-shaken in production builds.
export const __mfe_side_effects__ = true
