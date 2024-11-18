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
const ChatBottom = ({ status, connectionHandeler, sendMessage }) => {
  const [message, setMessage] = useState("");
  const input = useRef(null);
  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("");
    input.current.focus();
  };

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className={styles.bottomWrapper}>
      <div className={styles.infoButton}>
        <PopUp open={open} setOpen={setOpen} setConfirm={setConfirm} />
        <span className={styles.infoText}>{status}</span>
        {/* TODO: Connection Button Functionality */}
        <button
          className={styles.connectButton}
          onClick={() => connectionHandeler()}
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
                handleSendMessage();
              }
            }}
          />
          <button className={styles.inputIcon} onClick={handleSendMessage}>
            <img src={"Send.svg"} alt="search" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBottom;
