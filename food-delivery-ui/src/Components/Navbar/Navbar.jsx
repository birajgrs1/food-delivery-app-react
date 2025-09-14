import { useState, useContext, useEffect } from "react";
import styles from "./Navbar.module.css";
import { assets } from "../../assets/assets";
import { FaSearch, FaUser, FaTimes, FaBars } from "react-icons/fa";
import { GrBasket } from "react-icons/gr";
import { Link, useLocation } from 'react-router-dom';
import { StoreContext } from "../../Store/Contexts/StoreContext";

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getTotalCartAmount } = useContext(StoreContext);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navContainer}>
                <Link to='/' className={styles.logoLink}>
                    <img src={assets.logo} alt="Company Logo" className={styles.logo} />
                    <span className={styles.brandName}>Gourmet</span>
                </Link>

                {/* Desktop Navigation */}
                <ul className={styles.navbarMenu}>
                    <li>
                        <Link 
                            to="/" 
                            onClick={() => setMenu('home')} 
                            className={`${styles.navLink} ${menu === "home" ? styles.active : ""}`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <a 
                            href="#all-menus" 
                            onClick={() => setMenu('menu')} 
                            className={`${styles.navLink} ${menu === "menu" ? styles.active : ""}`}
                        >
                            Menu
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#app-download" 
                            onClick={() => setMenu('mobile-app')} 
                            className={`${styles.navLink} ${menu === "mobile-app" ? styles.active : ""}`}
                        >
                            Mobile App
                        </a>
                    </li>
                    <li>
                        <a 
                            href="#footer" 
                            onClick={() => setMenu('contact us')} 
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
                        <Link to='/cart' className={styles.cartLink}>
                            <GrBasket />
                            {getTotalCartAmount() > 0 && (
                                <span className={styles.cartBadge}>
                                    {getTotalCartAmount()}
                                </span>
                            )}
                        </Link>
                    </div>
                    
                    <button 
                        onClick={() => setShowLogin(true)} 
                        className={styles.signInBtn}
                    >
                        <FaUser className={styles.userIcon} />
                        Sign In
                    </button>

                    {/* Mobile menu toggle */}
                    <button 
                        className={styles.mobileMenuToggle}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                <Link 
                    to="/" 
                    onClick={() => setMenu('home')} 
                    className={`${styles.mobileNavLink} ${menu === "home" ? styles.active : ""}`}
                >
                    Home
                </Link>
                <a 
                    href="#all-menus" 
                    onClick={() => setMenu('menu')} 
                    className={`${styles.mobileNavLink} ${menu === "menu" ? styles.active : ""}`}
                >
                    Menu
                </a>
                <a 
                    href="#app-download" 
                    onClick={() => setMenu('mobile-app')} 
                    className={`${styles.mobileNavLink} ${menu === "mobile-app" ? styles.active : ""}`}
                >
                    Mobile App
                </a>
                <a 
                    href="#footer" 
                    onClick={() => setMenu('contact us')} 
                    className={`${styles.mobileNavLink} ${menu === "contact us" ? styles.active : ""}`}
                >
                    Contact Us
                </a>
                <button 
                    onClick={() => {
                        setShowLogin(true);
                        setMobileMenuOpen(false);
                    }} 
                    className={styles.mobileSignInBtn}
                >
                    Sign In
                </button>
            </div>
        </nav>
    );
};

export default Navbar;