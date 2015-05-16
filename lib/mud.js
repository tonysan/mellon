'use strict';

var net = require('net');

module.exports = function connectToMud(config, localSocket, debug) {
    var socket = net.connect(config, function(err) {
        console.log('socket [' + localSocket.id + '] connected to remote host [' + config.host + ':' + config.port + ']');
    });

    socket.setEncoding('utf8');

    socket.on('data', function(data) {
        if (debug) {
            console.log(data);
        }

        localSocket.emit('message', {
            type: 'remote',
            content: data
        });
    })

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
};