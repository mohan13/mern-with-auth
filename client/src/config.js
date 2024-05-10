const BASE_URL = String(import.meta.env.VITE_BASE_URL);
const SIGN_UP = String(import.meta.env.VITE_SIGNUP_ENDPOINT);
const LOGIN = String(import.meta.env.VITE_LOGIN_ENDPOINT);
const LOGOUT = String(import.meta.env.VITE_LOGOUT_ENDPOINT);
const ADDBLOG = String(import.meta.env.VITE_ADDBLOG_ENDPOINT);
const VIEW_ALL_BLOGS = String(import.meta.env.VITE_VIEWBLOGS_ENDPOINT);
const VIEW_DETAILS_BLOGS = String(import.meta.env.VITE_VIEWDETAILS_ENDPOINT);
const DELETE_BLOG = String(import.meta.env.VITE_DELETE_BLOG_ENDPOINT);

export {
  BASE_URL,
  SIGN_UP,
  LOGIN,
  LOGOUT,
  ADDBLOG,
  VIEW_ALL_BLOGS,
  DELETE_BLOG,
  VIEW_DETAILS_BLOGS,
};
