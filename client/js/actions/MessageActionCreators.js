var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    AliasStore = require('../stores/AliasStore.react'),
    TriggerStore = require('../stores/TriggerStore.react'),
    utils = require('../utils/utils');

var ActionTypes = MellonConstants.ActionTypes,
    socket;

function validSocket() {
    return !!socket;
}

function setupConnection() {
    socket = io.connect();
    socket.on('message', function(message) {
        // message.content
        var triggers = TriggerStore.getAll(),
            content = message.content;

        Object.keys(triggers).forEach(function(trigger) {
            if (content.match(trigger)) {
                sendMessage(triggers[trigger]);
            }
        });

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

    var aliases = AliasStore.getAll();
    Object.keys(aliases).some(function(alias) {
        if (alias === content) {
            content = aliases[alias];
            return true;
        }

        return false;
    });

    receiveMessage({
        type: 'echo',
        content: content + '\r\n'
    });

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
