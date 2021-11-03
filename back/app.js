const express = require("express");
const http = require("http");
const { Server } = require("socket.io");


const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = new Server(server,{
  cors: {
    origin: "*",
  }
});

let interval;

io.on("connection", (socket) => {
  console.log("New user connected");
  // if (interval) {
  //   clearInterval(interval);
  // }
  // interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("SEND_NICKNAME", (nickname) => {
    socket.join('Game')

    const clients = io.sockets.adapter.rooms.get('Game')

    const numClients = clients ? clients.size : 0

    if(numClients < 2) return

    console.log('game start!')
    io.to('Game').emit('GAME_START')
  })

    socket.on("disconnect", () => {

    socket.leave('Game')



    console.log("Client disconnected");
    // clearInterval(interval);
    })
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));