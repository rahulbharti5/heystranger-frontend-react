import styles from "./styles/ChatBox.module.css";
import { useEffect, useRef } from "react";
import { Box, CircularProgress } from "@mui/material";

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
const ChatBox = ({ chat, status }) => {
  const chatBox = useRef(null);
  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [chat]);
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
      {status === "matching" && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <CircularProgress
            sx={{
              color: "#e1e8f0", // Custom color (e.g., Tomato red)
            }}
            size="5rem"
          />
          <h2 style={{ color: "#e1e8f0" }}>matching ...</h2>
        </Box>
      )}
    </div>
  );
};
export default ChatBox;
