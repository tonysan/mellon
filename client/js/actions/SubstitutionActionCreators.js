'use strict';

var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants');

var ActionTypes = MellonConstants.ActionTypes;

function update(substitutions) {
    MellonDispatcher.dispatch({
        type: ActionTypes.UPDATE_SUBSTITUTIONS,
        substitutions: substitutions
    });
}

module.exports = {
    update: update
};
