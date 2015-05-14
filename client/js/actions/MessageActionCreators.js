var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    utils = require('../utils/utils');

var ActionTypes = MellonConstants.ActionTypes;

module.exports = {
    sendMessage: function(content) {
        MellonDispatcher.dispatch({
            type: ActionTypes.SEND_MESSAGE,
            message: utils.createMessage('outgoing', content)
        });

        MellonDispatcher.dispatch({
            type: ActionTypes.RECEIVE_MESSAGE,
            message: utils.createMessage('echo', content)
        });
    },
    receiveMessage: function(content) {
        MellonDispatcher.dispatch({
            type: ActionTypes.RECEIVE_MESSAGE,
            message: utils.createMessage('incoming', content)
        });
    }
};