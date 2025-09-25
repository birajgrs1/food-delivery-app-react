import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Verify from "./Pages/Verify/Verify";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {

  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin ? <Login setShowLogin={setShowLogin}/> : <></> }
      <div className="app">
        {/* Navbar */}
        <Navbar setShowLogin = {setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/myorders" element={<MyOrders />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
