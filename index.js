const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }))

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });

io.on("connection", (socket) => {
  console.log('server connected'); // if server is connected or not

  // To draw a line
  socket.on('beginPath', (arg) => {
    socket.broadcast.emit('beginPath', arg)
  });
  socket.on('drawLine', (arg) => {
    socket.broadcast.emit('drawLine', arg)
  });

  // To keep the color and size config same
  socket.on('changeConfig', (arg) => {
    socket.broadcast.emit('changeConfig', arg)
  });
});

httpServer.listen(4000);