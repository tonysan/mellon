'use strict';

var fs = require('fs'),
    file = 'config/triggers.json',
    triggers = {};

var Trigger = {
    ls: function() {
        return triggers;
    },
    add: function(trigger) {
        // should validate the command format
        var string = trigger.replace(';trigger add ', ''),
            array = string.match(/\{(?:[^\\}]+|\\.)*}/g),
            key = array[0].replace('{', '').replace('}', ''),
            value = array[1].replace('{', '').replace('}', '');

        triggers[key] = value

        fs.writeFile(file, JSON.stringify(triggers), function(err) {});
    },
    rm: function(trigger) {
        // should validate the command format
        var string = trigger.replace(';trigger rm ', ''),
            array = string.match(/\{(?:[^\\}]+|\\.)*}/g),
            trigger,
            len,
            i;

        for (i = 0, len = array.length; i < len; i++) {
            trigger = array[i].replace('{', '').replace('}', '');

            if (triggers[trigger]) {
                delete triggers[trigger];
                break;
            }
        }

        fs.writeFile(file, JSON.stringify(triggers), function(err) {})
    },
    scan: function(mudSocket, localSocket, message) {
        if (message.match('#client')) {
            localSocket.emit('update', {
                type: 'character',
                content: message
            });

            return false;
        }

        Object.keys(triggers).forEach(function(trigger) {
            if (message.match(trigger)) {
                localSocket.emit('message', {
                    type: 'echo',
                    content: triggers[trigger] + '\r\n'
                });

                mudSocket.write(triggers[trigger] + '\r\n');
            }
        });

        return true;
    }
};

fs.exists(file, function(exists) {
    if (exists) {
        triggers = JSON.parse(fs.readFileSync(file, 'utf8'))
    } else {
        fs.writeFileSync(file, '{}', 'utf8')
        triggers = JSON.parse(fs.readFileSync(file, 'utf8'))
    }
});

module.exports = Trigger;