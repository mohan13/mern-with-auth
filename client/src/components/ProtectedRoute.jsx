import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.api.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login", { replace: true });
    }
    setLoader(false);
  }, [navigate, token]);
  return loader ? <h1>Loading....</h1> : <>{children}</>;
};
