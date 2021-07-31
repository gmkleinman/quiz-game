const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
		transports: ['websocket'],
});
const port = process.env.PORT || 8080;

// "must only use the websocket"
// io.set('transports', ['websocket']);
app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	  });
});

http.listen(port, () => console.log('listening on port ' + port));

