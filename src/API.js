import axios from "axios";

// Local development talks to the Express server on port 3000. In production the
// frontend and backend are deployed as separate Vercel projects, so fall back to
// the live API when VITE_API_URL was not set at build time.
const DEFAULT_API_URL = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://postgre-sql-back.vercel.app";

const configuredUrl = (import.meta.env.VITE_API_URL || "").trim();
const pointsToLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(configuredUrl);

// Never ship a production bundle that calls the visitor's localhost.
const baseURL = (
    configuredUrl && !(import.meta.env.PROD && pointsToLocalhost)
        ? configuredUrl
        : DEFAULT_API_URL
).replace(/\/+$/, "");

const API = axios.create({
    baseURL,
    timeout: 20000,
});

export default API;
