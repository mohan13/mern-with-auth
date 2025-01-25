import axios from "axios";
import { clearToken, saveToken } from "./utils";
import { BASE_URL, LOGIN, LOGOUT, SIGN_UP, BLOGS_ENDPOINT } from "../config";
import { toast } from "react-toastify";

export const fetchBlogs = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const res = await axios.get(`${BASE_URL}/${BLOGS_ENDPOINT}`);
      if (res.status === 200) {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data.data });
      }
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
    }
  };
};

export const getMyBlogs = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      await axios
        .get(`${BASE_URL}/blogs/get/my-post`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("hello", res.data.myPost);
          dispatch({ type: "MY_BLOG_SUCCESS", payload: res.data.myPost });
        });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await axios
        .delete(`${BASE_URL}/blogs/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(() => {
          toast.success("Post deleted successfully!");
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
      const res = await axios.get(`${BASE_URL}/${BLOGS_ENDPOINT}/${id}`);
      console.log("res details", res.data.details);
      if (res.status === 200) {
        dispatch({
          type: "BLOG_DETAILS",
          payload: res.data.details,
        });
      }
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
      const res = await axios.patch(
        `${BASE_URL}/${BLOGS_ENDPOINT}/${id}`,
        formData,
        {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",

            Authorization: localStorage.getItem("token"),
          },
        },
      );
      if (res.status === 200 && res.data) {
        console.log("edit post", formData);
        dispatch({ type: "SUCCESS_MESSAGE" });
        toast.success("Post updated successfully!");
        return res.data;
      }
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
    try {
      const res = await axios.post(`${BASE_URL}/${BLOGS_ENDPOINT}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (res.status === 200 && res.data) {
        toast.success("Post uploaded successfully!");
      }
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: "Blog post failed !" });
    }
  };
};

export const signup = (formData) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${BASE_URL}/${SIGN_UP}`, formData, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          toast.success(res.data.msg);
        });
    } catch (error) {
      toast.error(error.response.data.msg);
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
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
          dispatch({ type: "SET_TOKEN", payload: token });
          toast.success(user.msg);
          saveToken(token);
          if (token) {
            dispatch({ type: "USER_INFO", payload: user.user.username });
          }
        });
    } catch (error) {
      dispatch({ type: "FAILED_MESSAGE", payload: error.response.data.msg });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${BASE_URL}/${LOGOUT}`, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then(() => {
          clearToken();
          dispatch({ type: "SET_TOKEN", payload: null });
          dispatch({ type: "USER_INFO", payload: null });
          window.location.pathname = "/login";
        });
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
};
