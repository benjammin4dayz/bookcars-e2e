import { FRONTEND_URL, BACKEND_URL } from '../env.config';

/** @param {string} route */
export const getFrontendURL = route => new URL(route, FRONTEND_URL).href;

/** @param {string} route */
export const getBackendURL = route => new URL(route, BACKEND_URL).href;
