import axios from "axios";
import { clearToken, saveToken } from "./utils";

const BASE_URL = "http://localhost:4000";

export const login = (formData) => {
  return async (dispatch) => {
    try {
      await axios
        .post(`${BASE_URL}/login`, formData, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          const user = res.data;

          saveToken(user);

          console.log("userIfo", user);
          dispatch({ type: "USER_INFO", payload: user.user.username });
          dispatch({ type: "SET_TOKEN", payload: user.token });
          // if (token) {
          //   window.location.href = "http://localhost:5173/home";
          // }
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
      // Get the token from the storage
      axios
        .post("http://localhost:4000/logout", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            //add headers when data is not accepted by backend
          },
        })
        .then(() => {
          clearToken();
          dispatch({ type: "SET_TOKEN", payload: null });
          window.location.href = "http://localhost:5173/";
        });
    } catch (error) {
      // Handle any errors that occur during the logout process
      console.error("An error occurred during logout:", error);
    }
  };
};
