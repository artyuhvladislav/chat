import React from "react";
import socket from '../socket'
const JoinBlock = () => {
  return (
    <div className="join-block">
      <input type="text" placeholder="roomID" value="" />
      <input type="text" placeholder="userName" value="" />
      <button className="btn btn-success">Connect</button>
    </div>
  );
};

export default JoinBlock;
