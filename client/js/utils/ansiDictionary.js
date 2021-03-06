'use strict';

module.exports = {
    regexp: /[\u001b\u009b]([[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><])/g,
    rules: {
        1: 'bold',
        4: 'underline',
        5: 'blink',
        7: 'inverse',
        9: 'strikethrough',
        30: 'fore_black',
        31: 'fore_red',
        32: 'fore_green',
        33: 'fore_yellow',
        34: 'fore_blue',
        35: 'fore_magenta',
        36: 'fore_cyan',
        37: 'fore_white',
        40: 'back_black',
        41: 'back_red',
        42: 'back_green',
        43: 'back_yellow',
        44: 'back_blue',
        45: 'back_magenta',
        46: 'back_cyan',
        47: 'back_white',
        90: 'fore_bright_black',
        91: 'fore_bright_red',
        92: 'fore_bright_green',
        93: 'fore_bright_yellow',
        94: 'fore_bright_blue',
        95: 'fore_bright_magenta',
        96: 'fore_bright_cyan',
        97: 'fore_bright_white',
        100: 'back_bright_black',
        101: 'back_bright_red',
        102: 'back_bright_green',
        103: 'back_bright_yellow',
        104: 'back_bright_blue',
        105: 'back_bright_magenta',
        106: 'back_bright_cyan',
        107: 'back_bright_white',
    }
};