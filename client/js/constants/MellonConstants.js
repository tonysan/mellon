var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror({
        SEND_COMMAND: null,
        SEND_MESSAGE: null,
        RECEIVE_MESSAGE: null,
        UPDATE_STATE: null,
        UPDATE_CHARACTER: null,
        UPDATE_ALIASES: null,
        UPDATE_CONFIG: null,
        UPDATE_TRIGGERS: null
    })
};
