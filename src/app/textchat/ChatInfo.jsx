import { UserContext } from "../store/store";
import styles from "./styles/ChatInfo.module.css";
import { useContext, useRef, useState } from "react";
// eslint-disable-next-line react/prop-types
const ChatInfo = ({ status }) => {
  const inputRef = useRef(null);
  const [interest, setInterest] = useState("");
  // const interests1 = useContext(UserContext);
  // console.log(interests1);
  const { interests, dispatch } = useContext(UserContext);
  // console.log(interests);
  return (
    <div className={styles.chatInfoWrapper}>
      {/* eslint-disable-next-line react/prop-types */}
      {interests && interests.length > 0 ? (
        <>
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
                    // const updatedInterests = interests.filter(
                    //   (_, i) => i !== index
                    // );
                    // addInterests(updatedInterests);
                    dispatch({ type: "remove", payload: interest });
                  }}
                />
              </div>
            ))}
          </div>
          {/* eslint-disable-next-line react/prop-types */}
          {interests.length >= 5 && status === "stable" && (
            <p className={styles.connectedMessage}>
              You Can add upto 5 interests.
            </p>
          )}
        </>
      ) : (
        status !== "connected" && (
          <div className={styles.noInterestBox}>
            <span className={styles.noInterest}>No Interests</span>
          </div>
        )
      )}
      {status === "connected" ? (
        <p className={styles.connectedMessage}>
          You are Connected With [User Name]
        </p>
      ) : (
        // eslint-disable-next-line react/prop-types
        status === "stable" &&
        interests.length < 5 && (
          <div className={styles.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              value={interest}
              onChange={(e) => setInterest(e.currentTarget.value)}
              className={styles.input}
              placeholder="Type Your interest Here......"
              onKeyDown={(e) => {
                if (e.key === "Enter" && interest) {
                  e.preventDefault();
                  // addInterests((prev) => [...prev, interest]);
                  dispatch({ type: "add", payload: interest });
                  setInterest("");
                }
              }}
            />
            <button
              className={styles.inputIcon}
              onClick={() => {
                if (interest) {
                  // addInterests((prev) => [...prev, interest]);
                  dispatch({ type: "add", payload: interest });
                  setInterest("");
                  inputRef.current.focus();
                }
              }}
            >
              <img src={"Plus.svg"} alt="add" />
            </button>
          </div>
        )
      )}
    </div>
  );
};
export default ChatInfo;
