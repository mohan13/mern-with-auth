const BASE_URL = String(import.meta.env.VITE_BASE_URL);
const SIGN_UP = String(import.meta.env.VITE_SIGNUP_ENDPOINT);
const LOGIN = String(import.meta.env.VITE_LOGIN_ENDPOINT);
const LOGOUT = String(import.meta.env.VITE_LOGOUT_ENDPOINT);
const BLOGS_ENDPOINT = String(import.meta.env.VITE_BLOGS_ENDPOINT);

export { BASE_URL, SIGN_UP, LOGIN, LOGOUT, BLOGS_ENDPOINT };
