const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();

const isDev = app.settings.env === 'development';

const URL = isDev ? 'http://localhost:3000' : 'https://isketchbook.vercel.app/';

app.use(cors({ origin: URL }))

app.get('/', (req, res) => {
  res.send('Sketchbook Server Home')
})

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: URL });

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