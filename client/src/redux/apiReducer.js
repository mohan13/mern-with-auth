const initialState = {
  blogs: [],
  myBlogs: [],
  blogDetails: {},
  isLoading: false,
  error: null,
  success: false,
  token: null,
  userInfo: null,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BLOG_DETAILS":
      return { ...state, blogDetails: action.payload, isLoading: false };

    case "FETCH_REQUEST":
      return { ...state, isLoading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, blogs: action.payload, isLoading: false };

    case "MY_BLOG_SUCCESS":
      return { ...state, myBlogs: action.payload, isLoading: false };

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
      return { ...state, token: action.payload, success: true };

    case "FAILED_MESSAGE":
      return { ...state, error: action.payload, isLoading: false };

    case "SUCCESS_MESSAGE":
      return { ...state, success: true };

    default:
      return state;
  }
};

export default apiReducer;
