import styles from "./styles/ChatBox.module.css";

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

const chat = [
  {
    text: "Hey! How's it going?",
    sender: "user1",
  },
  {
    text: "Pretty good, thanks! How about you?",
    sender: "user2",
  },
  {
    text: "Doing well! Working on some code.",
    sender: "user1",
  },
  {
    text: "Nice! Need any help?",
    sender: "user2",
  },
  {
    text: "Maybe later, just testing a layout for now.",
    sender: "user1",
  },
  {
    text: "Got it! Let me know if you need anything.",
    sender: "user2",
  },
];

const ChatBox = () => {
  return (
    <div className={styles.chatBoxWrapper}>
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
