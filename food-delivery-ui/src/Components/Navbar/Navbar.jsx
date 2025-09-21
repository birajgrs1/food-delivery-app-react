import { useState, useContext, useEffect } from "react";
import styles from "./Navbar.module.css";
import { assets } from "../../assets/assets";
import { FaSearch, FaUser, FaTimes, FaBars } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../Store/Contexts/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { getTotalCartAmount, token, user, logout } = useContext(StoreContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoLink}>
          <img src={assets.logo} alt="Company Logo" className={styles.logo} />
          <span className={styles.brandName}>BhojanYatra</span>
        </Link>

        <ul className={styles.navbarMenu}>
          <li>
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={`${styles.navLink} ${menu === "home" ? styles.active : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#all-menus"
              onClick={() => setMenu("menu")}
              className={`${styles.navLink} ${menu === "menu" ? styles.active : ""}`}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#app-download"
              onClick={() => setMenu("mobile-app")}
              className={`${styles.navLink} ${menu === "mobile-app" ? styles.active : ""}`}
            >
              Mobile App
            </a>
          </li>
          <li>
            <a
              href="#footer"
              onClick={() => setMenu("contact us")}
              className={`${styles.navLink} ${menu === "contact us" ? styles.active : ""}`}
            >
              Contact Us
            </a>
          </li>
        </ul>

        <div className={styles.rightSide}>
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>

          <div className={styles.cartIcon}>
            <Link to="/cart" className={styles.cartLink}>
              <GrBasket />
              {getTotalCartAmount() > 0 && (
                <span className={styles.cartBadge}>
                  {getTotalCartAmount()}
                </span>
              )}
            </Link>
          </div>

          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className={styles.signInBtn}
            >
              <FaUser className={styles.userIcon} />
              <span>Sign In</span>
            </button>
          ) : (
            <div 
              className={styles.profileContainer}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className={styles.profileTrigger}>
                <img src={assets.profile_icon} alt="Profile" />
                <span>{user?.name?.split(' ')[0]}</span>
              </div>
              {showDropdown && (
                <div className={styles.profileDropdown}>
                  <div className={styles.dropdownHeader}>
                    <p>Hello, {user?.name}</p>
                  </div>
                  <ul>
                    <li>
                      <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                    </li>
                    <hr />
                    <li onClick={handleLogout}>
                      <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <button
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}>
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`${styles.mobileNavLink} ${menu === "home" ? styles.active : ""}`}
        >
          Home
        </Link>
        <a
          href="#all-menus"
          onClick={() => setMenu("menu")}
          className={`${styles.mobileNavLink} ${menu === "menu" ? styles.active : ""}`}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={`${styles.mobileNavLink} ${menu === "mobile-app" ? styles.active : ""}`}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={`${styles.mobileNavLink} ${menu === "contact us" ? styles.active : ""}`}
        >
          Contact Us
        </a>

        {!token ? (
          <button
            onClick={() => {
              setShowLogin(true);
              setMobileMenuOpen(false);
            }}
            className={styles.mobileSignInBtn}
          >
            Sign In
          </button>
        ) : (
          <div className={styles.mobileProfile}>
            <p>Hello, {user?.name}</p>
            <div className={styles.mobileProfileActions}>
              <button className={styles.mobileProfileBtn}>
                <img src={assets.bag_icon} alt="" /> Orders
              </button>
              <button onClick={handleLogout} className={styles.mobileProfileBtn}>
                <img src={assets.logout_icon} alt="" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;