import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Provider } from "react-redux";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import store from "./redux/store.js";
import ContactPage from "./pages/Contact-Us/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
