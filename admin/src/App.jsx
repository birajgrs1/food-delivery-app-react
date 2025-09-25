import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";

const App = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  return (
    <>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        {/* All Routes */}
        <Routes>
          <Route path="/add" element={<Add url={backendUrl} />} />
          <Route path="/list" element={<List url={backendUrl} />} />
          <Route path="/orders" element={<Orders url={backendUrl} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
