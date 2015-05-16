var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var state = {
        connected: false
    },
    ActionTypes = MellonConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    ApplicationStore = assign({}, EventEmitter.prototype, {
        emitChange: function() {
            this.emit(CHANGE_EVENT);
        },
        addChangeListener: function(callback) {
            this.on(CHANGE_EVENT, callback);
        },
        removeChangeListener: function(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        },
        getState: function() {
            return state;
        }
    });

ApplicationStore.dispatchToken = MellonDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.UPDATE_STATE:
            state = assign(state, action.state);
            ApplicationStore.emitChange();
            break;
        default:
            //noop
    }
});

module.exports = ApplicationStore;