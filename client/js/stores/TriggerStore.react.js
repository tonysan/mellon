var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var triggers = Mellon.triggers,
    ActionTypes = MellonConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    AliasStore = assign({}, EventEmitter.prototype, {
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

AliasStore.dispatchToken = MellonDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.UPDATE_TRIGGERS:
            triggers = assign(triggers, action.triggers);
            AliasStore.emitChange();
            break;
        default:
            //noop
    }
});

module.exports = AliasStore;
