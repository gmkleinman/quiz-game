const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
	transports: ['websocket'],
});
// see what happens if we don't specify websocket?
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	let count = io.engine.clientsCount;
	io.emit('user connected', count);
	io.emit('chat message', {
		user: 'server',
		message: 'user connected'
	});

	socket.on('disconnect', () => {
		count = io.engine.clientsCount;

		io.emit('chat message', {
			user: 'server',
			message: 'user disconnected'
		});
		io.emit('user disconnected', count);
	});

	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
});

http.listen(port, () => console.log('listening on port ' + port));

