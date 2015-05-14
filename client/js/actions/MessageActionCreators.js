var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    utils = require('../utils/utils');

var ActionTypes = MellonConstants.ActionTypes,
    socket;

function validSocket() {
    return !!socket;
}

function setupConnection() {
    socket = io.connect();
    socket.on('message', function(message) {
        receiveMessage(message.content);
    });
}

function sendCommand(command) {
    if (!validSocket()) {
        setupConnection();
    }

    socket.emit('command', command);
}

function sendMessage(content) {
    if (!validSocket()) {
        MellonDispatcher.dispatch({
            type: ActionTypes.RECEIVE_MESSAGE,
            message: utils.createMessage('system', 'Remote connection not established')
        });
        return;
    }

    MellonDispatcher.dispatch({
        type: ActionTypes.RECEIVE_MESSAGE,
        message: utils.createMessage('echo', content)
    });

    socket.emit('message', {
        content: content
    });
}

function receiveMessage(content) {
    MellonDispatcher.dispatch({
        type: ActionTypes.RECEIVE_MESSAGE,
        message: utils.createMessage('incoming', content)
    });
}

module.exports = {
    sendCommand: sendCommand,
    sendMessage: sendMessage,
    receiveMessage: receiveMessage
};