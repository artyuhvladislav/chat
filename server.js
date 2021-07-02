const express = require("express");
const path = require('path');
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../build')));
const rooms = new Map();

app.get("/rooms/:id", (req, res) => {
  const { id: roomID } = req.params;

  const obj = rooms.has(roomID)
    ? {
        users: [...rooms.get(roomID).get("users").values()],
        messages: [...rooms.get(roomID).get("messages").values()],
      }
    : { users: [], messages: [] };
  res.json(obj);
});

app.post("/rooms", (req, res) => {
  const { userName, roomID } = req.body;

  if (!rooms.has(roomID)) {
    rooms.set(
      roomID,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  res.send();
});

io.on("connection", (socket) => {
    
  socket.on("ROOM:JOIN", ({ roomID, userName }) => {
    socket.join(roomID);
    rooms.get(roomID).get("users").set(socket.id, userName);
    const users = [...rooms.get(roomID).get("users").values()];
    socket.to(roomID).emit("ROOM:SET_USERS", users);
  });

  socket.on("ROOM:NEW_MESSAGES", ({ roomID, userName, text }) => {
    const obj = {
      userName,
      text,
    };
    rooms.get(roomID).get("messages").push(obj);
    socket.broadcast.to(roomID).emit("ROOM:NEW_MESSAGES", obj);
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, roomID) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.broadcast.to(roomID).emit("ROOM:SET_USERS", users);
      }
    });
  });
  console.log("user connected", socket.id);
});

server.listen(port, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log("server is running");
});
