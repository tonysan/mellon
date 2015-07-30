'use strict';

var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants');

var ActionTypes = MellonConstants.ActionTypes;

function updateCharacter(character) {
    MellonDispatcher.dispatch({
        type: ActionTypes.UPDATE_CHARACTER,
        character: character
    });
}

module.exports = {
    updateCharacter: updateCharacter
};