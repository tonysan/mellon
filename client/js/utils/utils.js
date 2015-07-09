'use strict';

var UUID = require('uuid');

RegExp.escape = function(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

module.exports = {
    createMessage: function(type, content) {
        return {
            key: UUID.v4(),
            type: type,
            content: content
        };
    }
};
