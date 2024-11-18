import { useState, useEffect, useCallback, useRef } from "react";
import { io } from "socket.io-client";

const useWebRTC = (socketUrl) => {
  const [socket, setSocket] = useState(null);
  const [connection, setConnection] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);
  const [status, setStatus] = useState("stable"); // stable,connecting,connected # This is not sockets
  const toSocketIdRef = useRef(null);

  // Initialize Socket Connection
  useEffect(() => {
    const newSocket = io(socketUrl);
    // Listen for connection event
    newSocket.on("connect", () => {
      console.log("Socket connected with ID:", newSocket.id);
    });
    setSocket(newSocket);
    return () => {
      if (dataChannel) dataChannel.close();
      if (connection) connection.close();
      newSocket.disconnect();
      setStatus("stable");
    };
  }, [socketUrl]);

  // Setup Data Channel
  const setupDataChannel = (channel) => {
    channel.onopen = () => setStatus("connected");
    channel.onclose = () => setStatus("stable");
    channel.onclosing = () => setStatus("stable");
    channel.onerror = () => setStatus("stable");
  };
  const handleStatus = useCallback(
    (status) => {
      setStatus(status);
    },
    [connection]
  );
  // Handle Matching and Signaling
  useEffect(() => {
    if (!socket) return;

    const handleMatch = async (data) => {
      toSocketIdRef.current = data?.user?.id;
      if (data.type === "createAnOffer") {
        createOffer(data.user.id);
        handleStatus("connecting");
      } else {
        handleStatus("connecting");
      }
    };

    const handleOffer = async (offer) => {
      await createAnswer(offer);
    };

    const handleAnswer = async (answer) => {
      await connection?.setRemoteDescription(new RTCSessionDescription(answer));
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
  const connect = async (userData) => {
    if (!userData) {
      handleStatus("Somthing gone Wrong");
      return;
    }
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
      setupDataChannel(channel);
    };
    setConnection(newPeerConnection);

    socket.emit("match", userData);
    setStatus("matching");
  };

  // Create an Offer
  const createOffer = async (toSocketId) => {
    if (connection) {
      const channel = connection.createDataChannel("chat");
      setDataChannel(channel);
      setupDataChannel(channel);
      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);
      socket.emit("offer", offer, toSocketId);
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
      setStatus("stable");
    }
  };

  return { connect, disconnect, dataChannel, status };
};

export default useWebRTC;
