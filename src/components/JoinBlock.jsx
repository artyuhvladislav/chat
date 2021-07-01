import axios from "axios";
import React from "react";
import socket from "../socket";
const JoinBlock = ({ onLogin }) => {
  const [roomID, setRoomID] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onEnter = () => {
    if (!roomID || !userName) {
      return alert("data is not correct");
    }
    const obj = {
      roomID, 
      userName
    }
    setIsLoading(true)
    axios
      .post("/rooms", {
        userName,
        roomID,
      })
      .then(() => {
        onLogin(obj);
      });
  };
  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="roomID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <input
        type="text"
        placeholder="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        disabled={isLoading}
        className="btn btn-success"
        onClick={onEnter}
      >
        {isLoading ? "CONNECTION..." : "CONNECT"}
      </button>
    </div>
  );
};

export default JoinBlock;
