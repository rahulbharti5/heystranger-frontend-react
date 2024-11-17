import { useReducer, useEffect, useState } from "react";
import { io } from "socket.io-client";

const webRTCReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONNECTION":
      return { ...state, connection: action.payload };
    case "SET_REMOTE_STREAM":
      return { ...state, remoteStream: action.payload };
    case "ADD_ICE_CANDIDATE":
      return {
        ...state,
        iceCandidates: [...state.iceCandidates, action.payload],
      };
    default:
      return state;
  }
};

const useWebRTC = (signalingServerUrl) => {
  const initialState = {
    connection: null,
    remoteStream: null,
    iceCandidates: [],
  };

  const [state, dispatch] = useReducer(webRTCReducer, initialState);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!signalingServerUrl) {
      setError("Invalid signaling server URL.");
      return;
    }

    try {
      const newSocket = io(signalingServerUrl);

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        setError(null); // Clear previous errors if connection succeeds
      });

      newSocket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
        setError("Failed to connect to the signaling server.");
      });

      newSocket.on("disconnect", () => {
        console.warn("Socket disconnected.");
      });

      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    } catch (err) {
      console.error("Error initializing socket:", err.message);
      setError("Error initializing socket connection.");
    }
  }, [signalingServerUrl]);

  useEffect(() => {
    if (!socket) return;

    const connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    // Send the ice candidate to the other peer
    connection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          target: state.remoteSocketId,
        });
      }
    };
    connection.ontrack = (event) => {
      const [remoteStream] = event.streams;
      dispatch({ type: "SET_REMOTE_STREAM", payload: remoteStream });
    };

    socket.on("offer", async (data) => {
      try {
        console.log("Received offer:", data.offer);
        await connection.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer);

        socket.emit("answer", {
          answer,
          target: data.from,
        });
      } catch (err) {
        console.error("Error handling offer:", err.message);
        setError("Error handling incoming offer.");
      }
    });

    socket.on("answer", async (data) => {
      try {
        console.log("Received answer:", data.answer);
        await connection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      } catch (err) {
        console.error("Error handling answer:", err.message);
        setError("Error handling incoming answer.");
      }
    });

    socket.on("ice-candidate", async (data) => {
      try {
        console.log("Received ICE candidate:", data.candidate);
        await connection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (err) {
        console.error("Error adding ICE candidate:", err.message);
        setError("Error handling incoming ICE candidate.");
      }
    });
    socket.on("match", (data) => {
      console.log("Matched with:", data);
      // dispatch({ type: "SET_REMOTE_SOCKET_ID", payload: data.socket });
    });
    socket.on("noMatch", () => {
      console.log("No match found.");
    });
    dispatch({ type: "SET_CONNECTION", payload: connection });

    return () => {
      connection.close();
    };
  }, [socket, state.remoteSocketId]);

  const startCall = async (socketId) => {
    if (!socket || !state.connection) {
      setError("Socket or WebRTC connection not initialized.");
      return;
    }

    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStream.getTracks().forEach((track) => {
        state.connection.addTrack(track, localStream);
      });

      const offer = await state.connection.createOffer();
      await state.connection.setLocalDescription(offer);

      socket.emit("offer", { offer, target: socketId });
    } catch (err) {
      console.error("Error starting call:", err.message);
      setError("Error starting the call.");
    }
  };

  const connect = async () => {
    if (!socket) {
      setError("Socket not initialized.");
      return;
    }
    const user = {
      username: "user1",
      interests: ["music", "sports"],
      chatType: "text",
    };
    try {
      socket.emit("match", user);
    } catch (err) {
      console.error("Error matching:", err.message);
      setError("Error matching with another user.");
    }
  };

  return {
    connection: state.connection,
    remoteStream: state.remoteStream,
    connect,
    startCall,
    error,
  };
};

export default useWebRTC;
