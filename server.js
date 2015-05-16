var express = require('express'),
    net = require('net'),
    config = require('./config/config'),
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

var mudSocket = null;

function connectToMud(socket) {
    mudSocket = net.connect(config, function(err) {
        console.log(socket.id + ' connected to remote server ' + config.host + ':' + config.port)
    });

    mudSocket.setEncoding('utf8');

    mudSocket.on('data', function(data) {
        console.log(data);
        socket.emit('message', {
            content: data
        });
    });

    mudSocket.on('end', function() {
        console.log('closed connection to remote server');
    })
}

io.on('connection', function(socket) {
    socket.on('command', function(command) {
        switch (command) {
            case 'connect':
                if (!mudSocket) {
                    connectToMud(socket);
                }
            break;
            case 'zap':
                if (mudSocket) {
                    mudSocket.end();
                    socket.emit('message', {
                        content: 'connection to mud closed'
                    });
                }
            break;
            default:
                //noop
            break;
        }
    });

    socket.on('message', function(message) {
        console.log('message: ' + JSON.stringify(message));
        if (!mudSocket) {
            socket.emit('message', {
                content: 'not connected to mud!'
            });
            return;
        }

        console.log(mudSocket.write(message.content + '\r\n'));
    })
});