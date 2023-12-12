// Express App
const app = require('./src/express.js');

// Socket Server
const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// Events initialization
io.on('connection', (socket) => {
  console.log('CONNECTED ' + socket.id);
  require('./src/events')(socket, io);
});

// Server listener
httpServer.listen(3001, () => {
  console.log("Server listening on port 3001")
});
