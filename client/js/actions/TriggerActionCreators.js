'use strict';

var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants');

var ActionTypes = MellonConstants.ActionTypes;

function update(triggers) {
    MellonDispatcher.dispatch({
        type: ActionTypes.UPDATE_TRIGGERS,
        triggers: triggers
    });
}

module.exports = {
    update: update
};
