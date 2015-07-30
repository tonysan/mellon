var express = require('express'),
    net = require('net'),
    mud = require('./lib/mud'),
    alias = require('./lib/alias'),
    trigger = require('./lib/trigger'),
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

function writeMessageToClient(socket, type, message) {
    socket.emit('message', {
        type: type,
        content: message + '\r\n'
    });
}

io.on('connection', function(socket) {
    var mudSocket = null;
    socket.on('command', function(command) {
        if (DEBUG) {
            console.log('command: ' + command);
        }

        switch (command) {
            case 'connect':
                if (!mudSocket) {
                    mudSocket = mud.connectToMud(config, socket, DEBUG);
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

        // identify and parse aliases
        var delimiter = ';';
        if (message[0] === delimiter) {
            if (message.match(/^;alias add/i)) {
                alias.add(message);
                writeMessageToClient(socket, 'echo', message);
            } else if (message.match(/^;alias ls/i)) {
                writeMessageToClient(socket, 'system', JSON.stringify(alias.ls()));
            } else if (message.match(/^;alias rm/i)) {
                alias.rm(message);
                writeMessageToClient(socket, 'echo', message);
            } else if (message.match(/^;trigger add/i)) {
                trigger.add(message);
                writeMessageToClient(socket, 'echo', message);
            } else if (message.match(/^;trigger ls/i)) {
                writeMessageToClient(socket, 'system', JSON.stringify(trigger.ls()));
            } else if (message.match(/^;trigger rm/i)) {
                trigger.rm(message);
                writeMessageToClient(socket, 'echo', message);
            } else {
                writeMessageToClient(socket, 'system', 'Bad system command');
            return;
            }
        } else {
            var replaced = alias.replace(message),
                splitCommands = replaced.split(';');

            splitCommands.forEach(function(command) {
                writeMessageToClient(socket, 'echo', command);

                //telnet protocol requires each message to end with a new line
                mudSocket.write(command + '\r\n');
            });
        }
    })
});