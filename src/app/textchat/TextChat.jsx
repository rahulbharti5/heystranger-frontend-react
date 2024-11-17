import { useEffect, useRef, useState } from "react";
import Navbar from "../common/navbar/Navbar";
import ChatInfo from "./ChatInfo";
import ChatBox from "./ChatBox.jsx";
import ChatBottom from "./ChatBottom.jsx";
import styles from "./styles/TextChat.module.css";
import useWebRTC from "../store/useWebRTC.jsx";

const TextChat = () => {
  const x = useRef(null),
    y = useRef(null);
  // Get Hight Logic
  useEffect(() => {
    const height = window.innerHeight + "px";
    x.current.style.height = y.current.style.height = height;
  }, []);

  const [interests, setInterests] = useState([]);
  const [chat, setChat] = useState([]);
  const [status, setStatus] = useState("stable"); // connection : stable,connecting ,connected

  useEffect(() => {
    const sender = setInterval(() => {
      if (status === "connected") {
        setChat((pre) => [
          { text: "You are Connected With [User Name]", sender: "user2" },
          ...pre,
        ]);
      }
    }, 2000);
    return () => {
      clearInterval(sender);
    };
  }, [status]);

  // WEBRTC LOGIC
  // const { connection, remoteStream, startCall, connect, error } = useWebRTC(
  //   "http://localhost:3000"
  // );
  // console.log(connection);
  // connect();
  return (
    <div className={styles.outerWrapper} ref={y}>
      <div className={styles.innerWrapper} ref={x}>
        <Navbar />
        <ChatInfo
          interests={interests}
          addInterests={setInterests}
          status={status}
        />
        {/* <button onClick={connect}>Start Call</button> */}
        <ChatBox chat={chat} status={status} />
        <ChatBottom setChat={setChat} status={status} setStatus={setStatus} />
      </div>
    </div>
  );
};

export default TextChat;
