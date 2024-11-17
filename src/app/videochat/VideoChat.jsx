import { useEffect, useState } from "react";
import useWebRTC from "../store/useWebRTC";
// import useWebRTC from "./useWebRTC";

const WebRTCComponent = () => {
  const socketUrl = "http://localhost:3000"; // Replace with your server URL
  const { connect, disconnect, dataChannel } = useWebRTC(socketUrl);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  // Send a message through the data channel
  const sendMessage = () => {
    if (dataChannel && dataChannel.readyState === "open") {
      dataChannel.send(message);
      setChatLog((prev) => [...prev, { sender: "You", message }]);
      setMessage("");
    } else {
      console.log("Data channel is not open");
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (dataChannel) {
      console.log(dataChannel);
      const handleMessage = (event) => {
        setChatLog((prev) => [
          ...prev,
          { sender: "Peer", message: event.data },
        ]);
      };
      dataChannel.onopen = () => {
        console.log("Data channel opened");
        setChatLog(() => []);
      };
      dataChannel.onclose = () => {
        console.log("Data channel closed");
      };
      dataChannel.onclosing = () => {
        console.log("Data channel is closing");
      };
      dataChannel.onerror = () => {
        console.log("Data channel error:");
        disconnect();
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>WebRTC Chat</h1>
      <div>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Chat</h2>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            height: "200px",
            overflowY: "scroll",
            marginBottom: "10px",
          }}
        >
          {chatLog.map((entry, index) => (
            <p key={index}>
              <strong>{entry.sender}:</strong> {entry.message}
            </p>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{ width: "80%", marginRight: "10px" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WebRTCComponent;
