import styles from "./styles/ChatInfo.module.css";
// eslint-disable-next-line react/prop-types
const ChatInfo = ({interests=[]}) => {
  const connected = true;
  return (
    <div className={styles.chatInfoWrapper}>
      {interests && interests.length > 0 ? (
        <div className={styles.interestBox}>
          {interests.map((interest, index) => (
            <div key={index} className={styles.interest}>
              <span className={styles.interestText}>{interest}</span>
              <img
                className={styles.closeIcon}
                src={"material-symbols_close.svg"}
                alt="cross"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noInterestBox}>
          <span className={styles.noInterest}>No Interests</span>
        </div>
      )}
      {connected ? (
        <p className={styles.connectedMessage}>
          You are Connected With [User Name]
        </p>
      ) : (
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="Type Your message Here......"
          />
          <button className={styles.inputIcon}>
            <img src={"Plus.svg"} alt="search" />
          </button>
        </div>
      )}
    </div>
  );
};
export default ChatInfo;
