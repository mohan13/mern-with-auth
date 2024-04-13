export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const loadToken = () => {
  try {
    const tokenString = localStorage.getItem("token");
    if (tokenString === null) {
      return null;
    }
    const token = JSON.parse(tokenString);
    const now = new Date();
    if (now > new Date(token.expiration)) {
      // TODO : if token present make an request and update
      localStorage.removeItem("token"); // Remove the token if it's expired
      return null;
    }
    return token;
  } catch (error) {
    return null;
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem("token");
    return null;
  } catch (error) {
    return null;
  }
};
