import axios from "axios";
import { clearToken, saveToken } from "./utils";
const BASE_URL = "http://localhost:4000/api";

export const fetchBlogs = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      await axios.get(`${BASE_URL}/blogs/posted-blogs`).then((res) => {
        console.log("blogs", res);
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.data });
      });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
    }
  };
};

export const writeBlog = (formData) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${BASE_URL}/blogs/blogpost`, formData, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          dispatch({
            type: "SUCCESS_MESSAGE",
            payload: { type: "success", message: "Blog posted successfully !" },
          });
          console.log(res.response.data.msg);
        });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
      console.log(error.response.data.msg);
    }
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${BASE_URL}/auth/login`, formData, {
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
        .post("http://localhost:4000/logout", {
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
      // Handle any errors that occur during the logout process
      console.error("An error occurred during logout:", error);
    }
  };
};
