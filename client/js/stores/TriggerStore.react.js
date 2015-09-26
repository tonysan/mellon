var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var triggers = Mellon.triggers,
    ActionTypes = MellonConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    TriggerStore = assign({}, EventEmitter.prototype, {
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
            return triggers;
        }
    });

TriggerStore.dispatchToken = MellonDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.UPDATE_TRIGGERS:
            triggers = action.triggers;
            TriggerStore.emitChange();
            break;
        default:
            //noop
    }
});

module.exports = TriggerStore;
