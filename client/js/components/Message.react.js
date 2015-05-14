var React = require('react'),
    ReactPropTypes = React.PropTypes;

var Message = React.createClass({
    propTypes: {
        message: ReactPropTypes.object
    },
    render: function() {
        var message  = this.props.message;

        return (
            <li className={message.type}>
                <br />{message.content}
            </li>
        );
    }
});

module.exports = Message;