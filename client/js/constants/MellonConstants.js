var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror({
        SEND_COMMAND: null,
        SEND_MESSAGE: null,
        RECEIVE_MESSAGE: null,
        UPDATE_STATE: null
    })
};