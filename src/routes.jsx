import { createBrowserRouter, Link } from "react-router-dom";
import App from "./App";
import TextChat from "./app/textchat/TextChat";
import VideoChat from "./app/videochat/VideoChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/chat", element: <TextChat /> },
  { path: "/video", element: <VideoChat /> },
]);
export default router;
