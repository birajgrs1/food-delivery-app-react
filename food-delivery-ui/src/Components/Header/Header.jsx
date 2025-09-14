import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById("all-menus");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.overlay}></div>
      
      <div className={`${styles.contents} ${isVisible ? styles.visible : ""}`}>
        <h2>
          Order Your Favorite Meals and Get Them Delivered Fast, Fresh, and Hot!
        </h2>
        <p>
          Welcome to <strong>भोजन यात्रा (BhojanYatra)</strong>, where we bring
          the finest meals from your favorite restaurants directly to your
          doorstep. Experience the joy of discovering new tastes, all with just
          a few clicks!
        </p>
        <div className={styles.ctaContainer}>
          <button onClick={scrollToMenu} className={styles.ctaButton}>
            <span>View Menu</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M5 12H19M19 12L12 5M19 12L12 19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.star}>&#9733;</span>
              ))}
            </div>
            <span className={styles.ratingText}>4.9/5 from 2,000+ reviews</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollAnimation}></div>
      </div>
    </div>
  );
};

export default Header;