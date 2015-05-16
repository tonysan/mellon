'use strict';

var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants');

var ActionTypes = MellonConstants.ActionTypes;

function updateState(state) {
    MellonDispatcher.dispatch({
        type: ActionTypes.UPDATE_STATE,
        state: state
    });
}

module.exports = {
    updateState: updateState
};