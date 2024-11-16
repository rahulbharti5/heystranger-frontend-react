// WEBRTC LOGICS

const initialState = {
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  remoteDescription: null,
  iceCandidate: null,
  isConnected: false,
  isConnecting: false,
  isStreaming: false,
  isLoading: false,
  isError: false,
};
const webRtcReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCAL_STREAM":
      return { ...state, localStream: action.payload };
    case "SET_REMOTE_STREAM":
      return { ...state, remoteStream: action.payload };
    case "SET_PEER_CONNECTION":
      return { ...state, peerConnection: action.payload };
    case "SET_REMOTE_DESCRIPTION":
      return { ...state, remoteDescription: action.payload };
    case "SET_ICE_CANDIDATE":
      return { ...state, iceCandidate: action.payload };
    case "SET_IS_CONNECTED":
      return { ...state, isConnected: action.payload };
    case "SET_IS_CONNECTING":
      return { ...state, isConnecting: action.payload };
    case "SET_IS_STREAMING":
      return { ...state, isStreaming: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_IS_ERROR":
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};

export default webRtcReducer;
