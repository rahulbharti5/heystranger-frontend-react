import { useEffect, useRef, useState } from "react";
import Navbar from "../common/navbar/Navbar";
import ChatInfo from "./ChatInfo";
import ChatBox from "./ChatBox.jsx";
import ChatBottom from "./ChatBottom.jsx";
import styles from "./styles/TextChat.module.css";

const TextChat = () => {
  const x = useRef(null), y = useRef(null);
  useEffect(() => {
    const height = window.innerHeight + "px";
    x.current.style.height = y.current.style.height = height;
  }, []);

  const [interests, setInterests] = useState([]);
  const [chat, setChat] = useState([]);

  return (
      <div className={styles.outerWrapper} ref={y}>
        <div className={styles.innerWrapper} ref={x}>
          <Navbar />
          <ChatInfo interests={interests} addInterests={setInterests} />
          <ChatBox chat={chat} />
          <ChatBottom setChat={setChat} />
        </div>
      </div>
  );
};

export default TextChat;
