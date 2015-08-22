'use strict';

var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants');

var ActionTypes = MellonConstants.ActionTypes;

function update(config) {
    MellonDispatcher.dispatch({
        type: ActionTypes.UPDATE_CONFIG,
        config: config
    });
}

module.exports = {
    update: update
};
