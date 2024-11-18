import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Navbar from "../common/navbar/Navbar";
import ChatInfo from "./ChatInfo";
import ChatBox from "./ChatBox.jsx";
import ChatBottom from "./ChatBottom.jsx";
import styles from "./styles/TextChat.module.css";
import useWebRTC from "../store/useWebRTC.jsx";
import { UserContext } from "../store/store.jsx";

const TextChat = () => {
  const x = useRef(null),
    y = useRef(null);
  // Get Hight Logic
  useEffect(() => {
    const height = window.innerHeight + "px";
    x.current.style.height = y.current.style.height = height;
  }, []);

  const { status, connect, disconnect, dataChannel } = useWebRTC(
    "http://localhost:3000"
  );
  const { interests } = useContext(UserContext);
  const [chat, setChat] = useState([]);

  // Listen for incoming messages
  useEffect(() => {
    if (dataChannel) {
      const handleMessage = (event) => {
        setChat((prevChat) => [
          {
            text: event.data,
            sender: "user2",
          },
          ...prevChat,
        ]);
      };
      dataChannel.onmessage = handleMessage;
      return () => {
        dataChannel.close();
        dataChannel.onopen = null; // Clean up listener
        dataChannel.onclose = null; // Clean up listener
        dataChannel.onclosing = null; // Clean up listener
        dataChannel.onerror = null; // Clean up listener
        dataChannel.onmessage = null; // Clean up listener
      };
    }
  }, [dataChannel]);

  const connectionHandeler = () => {
    if (status === "stable") {
      const userData = {
        username: "Rahul",
        type: "text",
        interests: interests, // Use the latest state here
      };
      console.log(userData);
      connect(userData);
    } else if (status === "connected") {
      disconnect();
    }
  };
  const sendMessage = (message) => {
    if (message && dataChannel && dataChannel.readyState === "open") {
      dataChannel.send(message);
      setChat((prevChat) => [
        {
          text: message,
          sender: "user1", // Replace with the sender dynamically if needed
        },
        ...prevChat,
      ]);
    } else {
      console.log("Data channel is not open");
    }
  };
  return (
    <div className={styles.outerWrapper} ref={y}>
      <div className={styles.innerWrapper} ref={x}>
        <Navbar />
        <ChatInfo interests={interests} status={status} />
        {/* <button onClick={connect}>Start Call</button> */}
        <ChatBox chat={chat} status={status} />
        <ChatBottom
          status={status}
          connectionHandeler={connectionHandeler}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default TextChat;
