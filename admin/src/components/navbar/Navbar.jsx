import "./Navbar.css";
import logo from "../../../../food-delivery-ui/src/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="navbar-right">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
          alt="profile"
          className="profile"
        />
      </div>
    </nav>
  );
};

export default Navbar;
