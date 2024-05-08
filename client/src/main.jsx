import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { store, persistor } from "./redux/store.js";
// import ContactPage from "./pages/Contact-Us/index.jsx";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Dasbhoardpage from "./pages/Dasbhoard.jsx";

import BlogDetails from "./pages/BlogDetails.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

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
        path: "/update-password",
        element: <ForgotPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dasbhoardpage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addpost",
        element: (
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/details/:id",
        element: <BlogDetails />,
      },
      {
        path: "/editpost/:id",
        element: <EditPost />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
