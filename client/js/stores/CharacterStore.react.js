var MellonDispatcher = require('../dispatcher/MellonDispatcher'),
    MellonConstants = require('../constants/MellonConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign');

var character = {
        name: null,
        level: null,
        xp: {
            total: null,
            session: 0,
            needed: null,
            lastKill: null
        },
        tp: {
            total: null,
            session: 0,
            needed: null
        }
    },
    ActionTypes = MellonConstants.ActionTypes,
    CHANGE_EVENT = 'change',
    CharacterStore = assign({}, EventEmitter.prototype, {
        emitChange: function() {
            this.emit(CHANGE_EVENT);
        },
        addChangeListener: function(callback) {
            this.on(CHANGE_EVENT, callback);
        },
        removeChangeListener: function(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        },
        getCharacter: function() {
            return character;
        }
    });

var xpTotals = [],
    tpTotals = [];

CharacterStore.dispatchToken = MellonDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.UPDATE_CHARACTER:
            var raw = action.state.content,
                splitRaw = raw.split('__');

            var neededXp = parseInt(splitRaw[3].trim(), 10),
                neededTp = parseInt(splitRaw[5].trim(), 10),
                totalXp = parseInt(splitRaw[4].trim(), 10),
                lastKillXp = (character.xp.total !== null) ? totalXp - character.xp.total : 0,
                totalTp = parseInt(splitRaw[6].trim(), 10),
                name = splitRaw[2].trim(),
                level = parseInt(splitRaw[1].trim(), 10);

            character.name = name;
            character.level = level;
            character.xp.total = totalXp;
            character.xp.session += lastKillXp;
            character.xp.lastKill = lastKillXp;
            character.xp.needed = neededXp;
            character.tp.needed = neededTp;
            character.tp.session += (character.tp.total !== null) ? totalTp - character.tp.total : 0;
            character.tp.total = totalTp;

            CharacterStore.emitChange();
            break;
        default:
            //noop
    }
});

module.exports = CharacterStore;