import styles from "./styles/ChatBottom.module.css";
import {useRef, useState} from "react";

// eslint-disable-next-line react/prop-types
const ChatBottom = ({setChat}) => {
    const [message,setMessage] = useState("");
    const input = useRef(null);
    const sendMessage = ()=>{
        if(setChat && message){
            setChat((prevChat) => [
                ...prevChat,
                {
                    text: message,
                    sender: "user1", // Replace with the sender dynamically if needed
                },
            ]);
        }
        setMessage("");
        input.current.focus();

    }
  return (
    <div className={styles.bottomWrapper}>
      <div className={styles.infoButton}>
        <span className={styles.infoText}>Stranger is typing...</span>
        <button className={styles.connectButton} >
          <img src={"raphael_connect.svg"} alt="search" />
        </button>
      </div>
      <div className={styles.InputWrapper}>
        <input
            ref={input}
            type="text"
            className={styles.input}
            value={message}
            placeholder="Type Your message Here......"
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={(e)=>{
                if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                }}
            }
        />
        <button className={styles.inputIcon} onClick={sendMessage}>
          <img src={"Send.svg"} alt="search" />
        </button>
      </div>
    </div>
  );
};

export default ChatBottom;
