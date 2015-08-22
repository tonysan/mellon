'use strict';

var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants');

var ActionTypes = MellonConstants.ActionTypes;

function update(aliases) {
    MellonDispatcher.dispatch({
        type: ActionTypes.UPDATE_ALIASES,
        aliases: aliases
    });
}

module.exports = {
    update: update
};
