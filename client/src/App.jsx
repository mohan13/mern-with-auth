import { Navbar } from "./components/navlinks/navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <div className="mx-10 my-5">
        <Navbar />

        {/* {token ? <Outlet /> : <Login />} */}

        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
