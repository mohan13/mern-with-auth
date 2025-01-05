import { Navbar } from "./components/navlinks/navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<>Loading....</>}>
      <div className="mx-10 my-5">
        <Navbar />

        <Outlet />
      </div>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
