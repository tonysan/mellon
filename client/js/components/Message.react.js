var React = require('react'),
    ansiDict = require('../utils/ansiDictionary'),
    UUID = require('uuid'),
    ReactPropTypes = React.PropTypes;

var Message = React.createClass({
    propTypes: {
        message: ReactPropTypes.object
    },
    render: function() {
        var message  = this.props.message,
            text = this.colorizeMessage(message.content);

        return (
            <li key={message.key} className={message.type}>
                {text}
            </li>
        );
    },
    colorizeMessage: function(text) {
        var splitText = text.split(ansiDict.regexp),
            ansiColorTester = /^\[(?:[\d;]+)m$/,
            colorizedText = [],
            rule = null,
            i = 0;

        while(i < splitText.length) {
            if (ansiColorTester.test(splitText[i])) {
                rules = splitText[i].substring(1, splitText[i].length - 1).split(';');

                for (var index = 0, len = rules.length; index < len; index++) {
                    rules[index] = ansiDict.rules[rules[index]];
                }

                rules = rules.join(' ');

                // need to handle inverse

                colorizedText[colorizedText.length] = <span key={UUID.v4()} className={rules}>{splitText[i + 1]}</span>;
                i += 3;
                continue;
            }

            colorizedText[colorizedText.length] = <span key={UUID.v4()}>{splitText[i]}</span>;
            i += 1;
        }

        return colorizedText;
    }
});

module.exports = Message;