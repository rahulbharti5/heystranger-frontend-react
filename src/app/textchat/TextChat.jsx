import { useEffect, useRef } from "react";
import Navbar from "../common/navbar/Navbar";
import ChatInfo from "./ChatInfo";
import ChatBottom from "./ChatBottom.jsx";
import styles from "./styles/TextChat.module.css";
import ChatBox from "./ChatBox.jsx";

const interests = ["React", "Node", "Express"];
const TextChat = () => {
  const x = useRef(null);
  const y = useRef(null);
  useEffect(() => {
    x.current.style.height = window.innerHeight + "px";
    y.current.style.height = window.innerHeight + "px";
  });
  return (
    <div className={styles.outerWrapper} ref={y}>
      <div className={styles.innerWrapper} ref={x}>
        <Navbar />
        <ChatInfo interests={interests} />
        <ChatBox />
        <ChatBottom />
      </div>
    </div>
  );
};
export default TextChat;
