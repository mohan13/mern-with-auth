const initialState = {
  blogs: {},
  isLoading: false,
  error: null,
  success: null,
  token: null,
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, blogs: action.payload, isLoading: false };
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

    case "SUCCESS_MESSAGE":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default apiReducer;
