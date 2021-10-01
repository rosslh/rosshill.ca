import isbot from 'isbot';

export const tagLabels = {
  backbone: "Backbone.js",
  fastify: "Fastify / Node",
  gatsby: "Gatsby / React",
  gcp: "GCP",
  graphql: "GraphQL",
  javascript: "JavaScript",
  mongo: "MongoDB",
  net: ".NET / C#",
  node: "Node",
  nuxt: "NuxtJS / Vue",
  postgres: "PostgreSQL",
  prosemirror: "ProseMirror",
  rpi: "Raspberry Pi",
  svelte: "Svelte.js",
  tensorflow: "TensorFlow",
  typescript: "TypeScript",
  unity3d: "Unity 3D",
  wasm: "WebAssembly",
  wordpress: "WordPress",
};

export const tagParents = {
  "backbone": ["javascript"],
  "cypress": ["javascript"],
  "django": ["python"],
  "fastify": ["node", "javascript"],
  "flask": ["python"],
  "gatsby": ["graphql", "react", "javascript"],
  "node": ["javascript"],
  "nuxt": ["javascript"],
  "react": ["javascript"],
  "redux": ["javascript"],
  "svelte": ["javascript"],
  "typescript": ["javascript"],
};

const isBrowser = typeof window !== "undefined";

const isBot = isBrowser && isbot(window.navigator.userAgent);
const prefersReducedMotion = isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const intersectionObserverSupported = isBrowser && "IntersectionObserver" in window;

export const reduceMotion = isBrowser && (isBot || prefersReducedMotion || !intersectionObserverSupported);