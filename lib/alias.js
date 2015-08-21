'use strict';

var fs = require('fs'),
    file = 'config/aliases.json',
    aliases = {};

// var Alias = {
//     ls: function() {
//         return aliases;
//     },
//     add: function(alias) {
//         // should validate the command format
//         var string = alias.replace(';alias add ', ''),
//             array = string.match(/\{(?:[^\\}]+|\\.)*}/g),
//             key = array[0].replace('{', '').replace('}', ''),
//             value = array[1].replace('{', '').replace('}', '');

//         aliases[key] = value

//         fs.writeFile(file, JSON.stringify(aliases), function(err) {});
//     },
//     rm: function(alias) {
//         // should validate the command format
//         var string = alias.replace(';alias rm ', ''),
//             array = string.match(/\{(?:[^\\}]+|\\.)*}/g),
//             alias,
//             len,
//             i;

//         for (i = 0, len = array.length; i < len; i++) {
//             alias = array[i].replace('{', '').replace('}', '');

//             if (aliases[alias]) {
//                 delete aliases[alias];
//                 break;
//             }
//         }

//         fs.writeFile(file, JSON.stringify(aliases), function(err) {})
//     },
//     replace: function(data) {
//         Object.keys(aliases).forEach(function(alias) {
//             if (alias === data) {
//                 data = data.replace(alias, aliases[alias]);
//             }
//         });

//         return data;
//     }
// };

fs.exists(file, function(exists) {
    if (exists) {
        aliases = JSON.parse(fs.readFileSync(file, 'utf8'))
    } else {
        fs.writeFileSync(file, '{}', 'utf8')
        aliases = JSON.parse(fs.readFileSync(file, 'utf8'))
    }
});

module.exports = function() {
    return aliases;
};
