import React from "react";
import socket from "../socket";

function Chat({ users, messages, roomID, userName, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState("");
  const messageRef = React.useRef(null)
  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGES", {
      userName,
      roomID,
      text: messageValue,
    });
    onAddMessage({
      userName,
      text: messageValue,
    });
    setMessageValue("");
  };

  React.useEffect(() => {
    messageRef.current.scrollTo(0, 9999)
  }, [messages])
  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomID}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messageRef} className="messages">
          {messages.map((message) => (
            <div className={(userName === message.userName) ? 'usersMessage message' : 'message'}>
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"
          ></textarea>
          <button
            onClick={onSendMessage}
            type="button"
            className="btn btn-primary"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
