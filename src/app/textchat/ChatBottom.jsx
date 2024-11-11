import styles from "./styles/ChatBottom.module.css";
const ChatBottom = () => {
  return (
    <div className={styles.bottomWrapper}>
      <div className={styles.infoButton}>
        <span className={styles.infoText}>Stranger is typing...</span>
        <button className={styles.connectButton}>
          <img src={"raphael_connect.svg"} alt="search" />
        </button>
      </div>
      <div className={styles.InputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type Your message Here......"
        />
        <button className={styles.inputIcon}>
          <img src={"Send.svg"} alt="search" />
        </button>
      </div>
    </div>
  );
};

export default ChatBottom;
