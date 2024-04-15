import { Navbar } from "./components/navlinks/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="mx-10 my-5">
        {/* <div>
          <Sidebar />
        </div> */}

        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
