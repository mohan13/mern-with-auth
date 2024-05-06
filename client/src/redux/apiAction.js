import axios from "axios";
import { clearToken, saveToken } from "./utils";
import {
  BASE_URL,
  ADDBLOG,
  LOGIN,
  LOGOUT,
  VIEW_ALL_BLOGS,
  DELETE_BLOG,
  VIEW_DETAILS_BLOGS,
} from "../config";
// const BASE_URL = "http://localhost:4000/api";

export const fetchBlogs = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      await axios.get(`${BASE_URL}/${VIEW_ALL_BLOGS}`).then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.data });
      });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/${DELETE_BLOG}/${id}`).then(() => {
        dispatch({
          type: "SUCCESS_MESSAGE",
          payload: "Successfully deleted !",
        });

        location.reload();
      });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: "something wrong here" });
    }
  };
};

export const viewDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      await axios.get(`${BASE_URL}/${VIEW_DETAILS_BLOGS}/${id}`).then((res) => {
        dispatch({
          type: "BLOG_DETAILS",
          payload: res.data.details,
        });
        // dispatch({ type: "FETCH_SUCCESS", payload: res.data.details });
      });
    } catch (error) {
      dispatch({
        type: "FAILED_MESSAGE",
        payload: "Details fetching failed !",
      });
    }
  };
};

export const updateBlogs = (id, formData) => {
  return async (dispatch) => {
    try {
      console.log("formdata", id, formData);
      await axios
        .patch(`${BASE_URL}/${VIEW_DETAILS_BLOGS}/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch({ type: "SUCCESS_MESSAGE", payload: res.data.msg });
        });
    } catch (error) {
      dispatch({
        type: "FAILED_MESSAGE",
        payload: "Details fetching failed !",
      });
    }
  };
};

export const writeBlog = (formData) => {
  return async (dispatch) => {
    console.log(formData);
    try {
      await axios
        .post(`${BASE_URL}/${ADDBLOG}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch({
            type: "SUCCESS_MESSAGE",
            payload: res.data.msg,
          });
        });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: "Blog post failed !" });
    }
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${BASE_URL}/${LOGIN}`, formData, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          const user = res.data;
          const token = user.token;

          saveToken(token);

          dispatch({ type: "SET_TOKEN", payload: token });
          if (token) {
            dispatch({ type: "USER_INFO", payload: user.user.username });

            window.location.href = "http://localhost:5173/home";
          }
          return res.data;
        });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    console.log(getState().token);
    try {
      axios
        .post(`${BASE_URL}/${LOGOUT}`, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then(() => {
          clearToken();
          dispatch({ type: "SET_TOKEN", payload: null });
          dispatch({ type: "USER_INFO", payload: null });
          window.location.href = "http://localhost:5173/login";
        });
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
};
