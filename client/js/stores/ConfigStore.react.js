var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var config = Mellon.config,
    ActionTypes = MellonConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    ConfigStore = assign({}, EventEmitter.prototype, {
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
            return config;
        }
    });

ConfigStore.dispatchToken = MellonDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.UPDATE_CONFIG:
            config = assign(config, action.config);
            ConfigStore.emitChange();
            break;
        default:
            //noop
    }
});

module.exports = ConfigStore;
