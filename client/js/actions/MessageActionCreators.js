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
        receiveMessage(message);
    });

    socket.on('update', function(updatedState) {
        switch(updatedState.type) {
            case 'character':
                MellonDispatcher.dispatch({
                    type: ActionTypes.UPDATE_CHARACTER,
                    state: updatedState
                });
            break;
            case 'app':
                MellonDispatcher.dispatch({
                    type: ActionTypes.UPDATE_STATE,
                    state: updatedState
                });
            break;
        }
    });
}

function sendCommand(command) {
    if (!validSocket()) {
        setupConnection();
    }

    if (typeof command === 'string') {
        return socket.emit('command', {
            command: command,
            payload: null
        });
    }

    socket.emit('command', command);
}

function sendMessage(content) {
    if (!validSocket()) {
        receiveMessage({
            type: 'system',
            content: 'Remote connection not established'
        });
        return;
    }

    socket.emit('message', content);
}

function receiveMessage(message) {
    MellonDispatcher.dispatch({
        type: ActionTypes.RECEIVE_MESSAGE,
        message: utils.createMessage(message.type, message.content)
    });
}

module.exports = {
    sendCommand: sendCommand,
    sendMessage: sendMessage,
    receiveMessage: receiveMessage
};
