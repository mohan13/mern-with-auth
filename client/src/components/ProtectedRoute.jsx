import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("login", { replace: true });
    }
  }, [navigate, token]);
  return children;
};