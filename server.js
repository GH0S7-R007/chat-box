// Require the necessary modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Listen for socket.io connections
io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg);

    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Listen for disconnect events
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
