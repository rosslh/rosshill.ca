import isbot from "isbot";

export const tagLabels = {
  backbonedotjs: "Backbone.js",
  // fastify: "Fastify / Node",
  // gatsby: "Gatsby / React",
  googlecloud: "GCP",
  graphql: "GraphQL",
  javascript: "JavaScript",
  mongodb: "MongoDB",
  dotnet: ".NET / C#",
  nodedotjs: "Node",
  nuxtdotjs: "NuxtJS / Vue",
  postgresql: "PostgreSQL",
  prosemirror: "ProseMirror",
  raspberrypi: "Raspberry Pi",
  // svelte: "Svelte.js",
  tensorflow: "TensorFlow",
  typescript: "TypeScript",
  unity: "Unity 3D",
  webassembly: "WebAssembly",
  wordpress: "WordPress",
};

export const tagParents = {
  "backbonedotjs": ["javascript"],
  "cypress": ["javascript"],
  "django": ["python"],
  "fastify": ["nodedotjs", "javascript"],
  "flask": ["python"],
  "gatsby": ["graphql", "react", "javascript"],
  "nodedotjs": ["javascript"],
  "nuxtdotjs": ["javascript"],
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