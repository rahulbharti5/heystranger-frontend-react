import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const handleMenuButton = () => {
    console.log("Menu button clicked");
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.backButton}>
          <img src={"Back.svg"} alt={"Back"}/>
        </Link>
        <div className={styles.logoIcon}></div>
        <div className={styles.logoText}>Hey Stranger</div>
      </div>
      <button className={styles.menuButton} onClick={handleMenuButton}>
        <img src={"Menu.svg"}  alt={"Menu"}/>
      </button>
    </div>
  );
};
export default Navbar;
