import { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";

const useWebRTC = (socketUrl) => {
  const [socket, setSocket] = useState(null);
  const [connection, setConnection] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);
  const toSocketIdRef = useRef(null);

  // Initialize Socket Connection
  useEffect(() => {
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    return () => {
      console.warn("Disconnecting socket");
      if (dataChannel) dataChannel.close();
      if (connection) connection.close();
      newSocket.disconnect();
    };
  }, [socketUrl]);

  // Setup Data Channel
  const setupDataChannel = (channel) => {
    channel.onopen = () => console.log("Data channel opened");
    channel.onmessage = (e) => console.log("Message received:", e.data);
  };

  // Handle Matching and Signaling
  useEffect(() => {
    if (!socket) return;

    const handleMatch = async (data) => {
      console.log("Matched:", data);
      toSocketIdRef.current = data?.user?.id;

      if (data.type === "createAnOffer") {
        createOffer(data.user.id);
      }
    };

    const handleOffer = async (offer) => {
      console.log("Offer received", offer);
      await createAnswer(offer);
    };

    const handleAnswer = async (answer) => {
      console.log("Answer received", answer);
      await connection?.setRemoteDescription(new RTCSessionDescription(answer));
      console.log("Connection established");
    };

    const handleIceCandidate = (candidate) => {
      connection?.addIceCandidate(new RTCIceCandidate(candidate));
    };

    socket.on("match", handleMatch);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("iceCandidate", handleIceCandidate);

    return () => {
      socket.off("match", handleMatch);
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("iceCandidate", handleIceCandidate);
    };
  }, [socket, connection]);

  // Create PeerConnection on Connect
  const connect = async () => {
    if (!socket) return;

    const newPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    newPeerConnection.onicecandidate = ({ candidate }) => {
      if (candidate && toSocketIdRef.current) {
        socket.emit("iceCandidate", candidate, toSocketIdRef.current);
      }
    };

    newPeerConnection.ondatachannel = ({ channel }) => {
      setDataChannel(channel);
      //   setupDataChannel(channel);
    };

    setConnection(newPeerConnection);

    const userData = { interests: [], chatType: "text", username: "User" };
    socket.emit("match", userData);
    console.log("Emitting Match");
  };

  // Create an Offer
  const createOffer = async (toSocketId) => {
    if (connection) {
      const channel = connection.createDataChannel("chat");
      setDataChannel(channel);
      //   setupDataChannel(channel);

      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);

      socket.emit("offer", offer, toSocketId);
      console.log("Offer sent to server");
    }
  };

  // Create an Answer
  const createAnswer = useCallback(
    async (offer) => {
      if (connection) {
        await connection.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer);

        socket.emit("answer", answer, toSocketIdRef.current);
        console.log("Answer sent to server");
      }
    },
    [connection]
  );

  // Disconnect and cleanup
  const disconnect = () => {
    if (connection) {
      connection.close();
      setConnection(null);
      setDataChannel(null);
      toSocketIdRef.current = null;
      console.log("Disconnected");
    }
  };

  return { connect, disconnect, dataChannel };
};

export default useWebRTC;
