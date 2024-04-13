const initialState = {
  isLoading: false,
  error: null,
  token: null,
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_INFO":
      if (action.payload === null) {
        return { ...state, isLoading: false, userInfo: null };
      } else {
        return {
          ...state,
          isLoading: false,
          userInfo: action.payload,
        };
      }

    case "SET_TOKEN":
      return { ...state, token: action.payload };

    case "FAILED_MESSAGE":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default apiReducer;
