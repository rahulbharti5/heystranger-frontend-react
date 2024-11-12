import styles from "./styles/ChatBox.module.css";
import {useEffect, useRef} from "react";

// eslint-disable-next-line react/prop-types
const Sender = ({ message }) => {
  return (
    <div className={styles.sender}>
      <div className={styles.senderText}>
        <p className={styles.senderMessage}>{message}</p>
      </div>
      {/* <img src="Avatar.png" alt="receiver" /> */}
    </div>
  );
};
// eslint-disable-next-line react/prop-types
const Receiver = ({ message }) => {
  return (
    <div className={styles.receiver}>
      {/* <img src="Avatar.png" alt="receiver" /> */}
      <div className={styles.receiverText}>
        <p className={styles.receiverMessage}>{message}</p>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ChatBox = ({chat}) => {
  const chatBox = useRef(null);
  useEffect(()=>{
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  },[chat]);
  return (
    <div className={styles.chatBoxWrapper} ref={chatBox}>
      {/* eslint-disable-next-line react/prop-types */}
      {chat.map((message, index) =>
        message.sender === "user1" ? (
          <Sender key={index} message={message.text} />
        ) : (
          <Receiver key={index} message={message.text} />
        )
      )}
    </div>
  );
};
export default ChatBox;
