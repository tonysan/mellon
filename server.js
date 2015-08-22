var express = require('express'),
    net = require('net'),
    fs = require('fs'),
    mud = require('./lib/mud'),
    aliases = require('./config/aliases'),
    triggers = require('./config/triggers'),
    config = require('./config/config'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    exphbs = require('express-handlebars'),
	logger = require('morgan');

var DEBUG = true;

app.use(express.static('dist'));
app.use(logger('dev'));

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
	res.render('index', {
        aliases: JSON.stringify(aliases),
        triggers: JSON.stringify(triggers),
        config: JSON.stringify(config)
    });
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
            console.log('command:', command.command);
            console.log('payload:', command.payload);
        }

        switch (command.command) {
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
            case 'update_aliases':
                fs.writeFileSync('config/aliases.json', JSON.stringify(command.payload, null, 2), 'utf8');
            break;
            case 'update_triggers':
                fs.writeFileSync('config/triggers.json', JSON.stringify(command.payload, null, 2), 'utf8');
            break;
            case 'update_config':
                fs.writeFileSync('config/config.json', JSON.stringify(command.payload, null, 2), 'utf8');
                config = JSON.parse(fs.readFileSync('config/config.json', 'utf8'));
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
        mudSocket.write(message + '\r\n');
    });
});
