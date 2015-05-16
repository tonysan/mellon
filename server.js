var express = require('express'),
    net = require('net'),
    mud = require('./lib/mud'),
    config = require('./config/config'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
	logger = require('morgan');

var DEBUG = true;

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
    var mudSocket = null;
    socket.on('command', function(command) {
        if (DEBUG) {
            console.log('command: ' + command);
        }

        switch (command) {
            case 'connect':
                if (!mudSocket) {
                    mudSocket = mud(config, socket, DEBUG);
                }
            break;
            case 'zap':
                if (mudSocket) {
                    mudSocket.end();
                    mudSocket = null;
                }
            break;
            default:
                //noop
            break;
        }
    });

    socket.on('message', function(message) {
        if (DEBUG) {
            console.log('message: ' + JSON.stringify(message));
        }

        if (!mudSocket) {
            socket.emit('message', {
                type: 'system',
                content: 'Not connected to MUD'
            });
            return;
        }

        //telnet protocol requires each message to end with a new line
        mudSocket.write(message.content + '\r\n');
    })
});