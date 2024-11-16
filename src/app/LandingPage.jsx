import { useRef } from "react";
import Features from "./components/Features";
import Footer from "./components/Footer";
import styles from "./LandingPage.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const x = useRef(null);
  useEffect(() => {
    x.current.style.height = window.innerHeight + "px";
    // console.log(x.current.style.height);
  });
  const handleMenuButton = () => {
    console.log("Menu Button Clicked");
    alert("Menu Button Clicked");
  };
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper} ref={x}>
        {/* NavBar TODO: Make A New Component, Dont forget to styles too.. */}
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}></div>
            <div className={styles.logoText}>Hey Stranger</div>
          </div>
          <button className={styles.menuButton} onClick={handleMenuButton}>
            <img src={"Menu.svg"} alt="menu Icon" />
          </button>
        </div>
        {/* Main Content */}
        <div className={styles.heroTextWrapper}>
          <div className={styles.heroText}>
            <h1 className={styles.mainText}>
              Meet New Faces, Make Real Connections
            </h1>
            <p className={styles.smallPara}>
              Instantly connect with college students across the world—one video
              chat at a time.
            </p>
            <div className={styles.buttonsWrapper}>
              <Link to="/chat" className={styles.chatButton}>
                <span className={styles.chatButtonText}>Chat</span>
                <img src={"fluent_chat-12-filled.svg"} alt="chat" />
              </Link>
              <Link to="./video" className={styles.videoButton}>
                <span className={styles.videoButtonText}>Video Chat</span>
                <img src={"fluent_chat-video-20-filled.svg"} alt="chat" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Features></Features>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
