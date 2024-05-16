import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.api.token, shallowEqual);
  const navigate = useNavigate();
  console.log("pro", token);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);
  return children;
};
