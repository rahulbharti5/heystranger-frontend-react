import styles from "./styles/ChatBottom.module.css";
import { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

// eslint-disable-next-line react/prop-types
const PopUp = ({ open, setOpen, setConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Do you really want to disconnect"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>No</Button>
        <Button
          onClick={() => {
            setConfirm(true);
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// eslint-disable-next-line react/prop-types
const ChatBottom = ({ setChat, status, setStatus }) => {
  const [message, setMessage] = useState("");
  const input = useRef(null);
  const sendMessage = () => {
    if (setChat && message) {
      setChat((prevChat) => [
        {
          text: message,
          sender: "user1", // Replace with the sender dynamically if needed
        },
        ...prevChat,
      ]);
    }
    setMessage("");
    input.current.focus();
  };
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    if (status === "connected") {
      setOpen(false);
      setStatus(() => "stable");
      setConfirm(false);
    }
  }, [confirm]);

  const handleConnection = () => {
    if (status === "stable") {
      setChat(() => []);
      setStatus(() => "connecting");
      setTimeout(() => {
        setStatus(() => "connected");
        console.log("connected");
      }, 2000);
    } else if (status === "connected") {
      // const x = confirm("Are you sure want to disconnect!");
      // if(!x){
      //     return;
      // }
      setOpen(true);
    }
  };
  const connectNext = () => {
    if (status === "connected") {
      setChat(() => []);
      setStatus(() => "connecting");
      setTimeout(() => {
        setStatus(() => "connected");
        console.log("connected");
      }, 2000);
    }
  };

  return (
    <div className={styles.bottomWrapper}>
      <div className={styles.infoButton}>
        <PopUp open={open} setOpen={setOpen} setConfirm={setConfirm} />
        <span className={styles.infoText}>{status}</span>
        {/* TODO: Connection Button Functionality */}
        <button
          className={styles.connectButton}
          onClick={() => handleConnection()}
          onDoubleClick={connectNext}
        >
          <img src={"raphael_connect.svg"} alt="search" />
        </button>
      </div>
      {status === "connected" && (
        <div className={styles.InputWrapper}>
          <input
            ref={input}
            type="text"
            className={styles.input}
            value={message}
            placeholder="Type Your message Here......"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button className={styles.inputIcon} onClick={sendMessage}>
            <img src={"Send.svg"} alt="search" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBottom;
