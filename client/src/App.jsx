import { Navbar } from "./components/navlinks/navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { Footer } from "./components/navlinks/footer";

function App() {
  return (
    <Suspense fallback={<>Loading....</>}>
      <div>
        <Navbar />

        <Outlet />
      </div>
      <Footer />

      <ToastContainer />
    </Suspense>
  );
}

export default App;
