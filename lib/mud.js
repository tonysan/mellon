'use strict';

var net = require('net'),
    TelnetInput = require('telnet-stream').TelnetInput,
    TelnetOutput = require('telnet-stream').TelnetOutput,
    localSocket = null;

module.exports = {
    connectToMud: function(config, webSocket, debug) {
        var telnetInput = new TelnetInput(),
            telnetOutput = new TelnetOutput();

        localSocket = webSocket;

        var socket = net.connect(config, function() {
            socket.pipe(telnetInput);
            telnetOutput.pipe(socket);
            console.log('socket [' + webSocket.id + '] connected to remote host [' + config.host + ':' + config.port + ']');
        });

        telnetInput.on('do', function(command) {
            telnetOutput.writeWont(command);
        });

        telnetInput.on('will', function(command) {
            telnetOutput.writeDont(command);
        });

        telnetInput.on('data', function(buffer) {
            var data = buffer.toString('utf8');
            if (debug) {
                console.log(data);
            }

            localSocket.emit('message', {
                type: 'remote',
                content: data
            });
        });

        socket.on('end', function() {
            console.log('remote server connection ended');
            localSocket.emit('message', {
                type: 'system',
                content: 'Disconnected from remote host'
            });

            localSocket.emit('update', {
                connected: false
            });
        });

        return socket;
    },
    reconnectWebSocket: function(webSocket) {
        localSocket = webSocket;
    }
};