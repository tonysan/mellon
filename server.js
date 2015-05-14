var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
	logger = require('morgan');

app.use(express.static('dist'));
app.use(logger('dev'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index');
});

server.listen('3000', function (err) {
	console.log('express server listening on port 3000');
});

io.on('connection', function(socket) {
    socket.on('command', function(data) {
        console.log(data);
    });

    socket.on('message', function(data) {
        console.log(data);
    })
});