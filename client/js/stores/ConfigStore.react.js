var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    MessageActionCreators = require('../actions/MessageActionCreators'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var config = Mellon.config,
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
            return config;
        }
    });

AliasStore.dispatchToken = MellonDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.UPDATE_CONFIG:
            config = assign(config, action.config);
            MessageActionCreators.sendCommand({
                command: 'update_config',
                payload: config
            });
            AliasStore.emitChange();
            break;
        default:
            //noop
    }
});

module.exports = AliasStore;
