import { useSelector } from "react-redux";
import { Navbar } from "./components/navlinks/navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = useSelector((state) => state.api.token);
  return (
    <div>
      <div className="mx-10 my-5">
        {token === null ? (
          <div className="mx-auto  flex max-w-7xl items-center justify-center bg-gray-200 px-4 py-2 sm:px-6 lg:px-8">
            <div className="inline-flex items-center space-x-2">
              <span className="font-bold">Mohan Blog</span>
            </div>
          </div>
        ) : (
          <Navbar />
        )}
        {/* {token ? <Outlet /> : <Login />} */}

        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
