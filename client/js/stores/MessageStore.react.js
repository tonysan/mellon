var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var messages = [],
    ActionTypes = MellonConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    MessageStore = assign({}, EventEmitter.prototype, {
        emitChange: function() {
            this.emit(CHANGE_EVENT);
        },
        addChangeListener: function(callback) {
            this.on(CHANGE_EVENT, callback);
        },
        removeChangeListener: function(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        },
        getAll: function() {
            return messages;
        }
    });

MessageStore.dispatchToken = MellonDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.RECEIVE_MESSAGE:
            if (messages.length > 10000) {
                messages.shift();
            }
            messages.push(action.message);
            MessageStore.emitChange();
            break;
        default:
            //noop
    }
});

module.exports = MessageStore;