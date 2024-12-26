import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.contents}>
        <h2>
          Order Your Favorite Meals and Get Them Delivered Fast, Fresh, and Hot!
        </h2>
        <p>
          Welcome to <strong>भोजन यात्रा (BhojanYatra)</strong>, where we bring
          the finest meals from your favorite restaurants directly to your
          doorstep. Experience the joy of discovering new tastes, all with just
          a few clicks!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};
export default Header;
