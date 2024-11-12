import styles from "./styles/ChatInfo.module.css";
import {useRef, useState} from "react";
// eslint-disable-next-line react/prop-types
const ChatInfo = ({interests,addInterests}) => {
  const [conected, setConected] = useState(false);
  const inputRef = useRef(null);
  const [interest, setInterest] = useState("");
  return (
    <div className={styles.chatInfoWrapper}>
      {/* eslint-disable-next-line react/prop-types */}
      {interests && interests.length > 0 ? (
        <div className={styles.interestBox}>
          {/* eslint-disable-next-line react/prop-types */}
          {interests.map((interest, index) => (
            <div key={index} className={styles.interest}>
              <span className={styles.interestText}>{interest}</span>
              <img
                className={styles.closeIcon}
                src={"material-symbols_close.svg"}
                alt="cross"
                onClick={() => {
                  // eslint-disable-next-line react/prop-types
                  const updatedInterests = interests.filter((_, i) => i !== index);
                  addInterests(updatedInterests);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noInterestBox}>
          <span className={styles.noInterest}>No Interests</span>
        </div>
      )}
      {conected ? (
          <p className={styles.connectedMessage}>
            You are Connected With [User Name]
          </p>
      ) : (
          // eslint-disable-next-line react/prop-types
          interests && interests.length < 5 && ( // Corrected 'intrests' typo to 'interests'
              <div className={styles.inputWrapper}>
                <input
                    ref={inputRef}
                    type="text"
                    value={interest}
                    onChange={(e) => setInterest(e.currentTarget.value)}
                    className={styles.input}
                    placeholder="Type Your interest Here......"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && interest ) {
                        e.preventDefault();
                        addInterests((prev) => [...prev, interest]);
                        setInterest("");
                      }
                    }}
                />
                <button className={styles.inputIcon} onClick={() => {
                  if(interest) {
                    addInterests((prev) => [...prev, interest]);
                    setInterest("");
                    inputRef.current.focus();
                  }
                }}>
                  <img src={"Plus.svg"} alt="search" />
                </button>
              </div>
          )
      )}

    </div>
  );
};
export default ChatInfo;
