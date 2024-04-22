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
import Homepage from "./pages/Home.jsx";

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
        element: <Homepage />,
      },
      {
        path: "/dashboard",
        element: <Dasbhoardpage />,
      },
      {
        path: "/addpost",
        element: <AddPost/>,
      },
      {
        path: "/editpost",
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
