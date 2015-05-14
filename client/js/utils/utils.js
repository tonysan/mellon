'use strict';

var UUID = require('uuid');

module.exports = {
    createMessage: function(type, content) {
        return {
            key: UUID.v4(),
            type: type,
            content: content
        };
    }
};
