// Empty by default: requests stay same-origin, relying on Vite's dev proxy
// (see vite.config.js) to reach the local API. Set VITE_API_BASE_URL when the
// frontend and backend are deployed to different origins (e.g. a Vercel-hosted
// frontend calling a tunneled/remote backend).
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
