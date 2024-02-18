import {isbot} from "isbot";

const isBrowser = typeof window !== "undefined" && !("Deno" in window);

const isBot = isBrowser && isbot(window.navigator.userAgent);
const prefersReducedMotion =
  isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const intersectionObserverSupported =
  isBrowser && "IntersectionObserver" in window;

export const reduceMotion =
  isBrowser &&
  (isBot || prefersReducedMotion || !intersectionObserverSupported);
