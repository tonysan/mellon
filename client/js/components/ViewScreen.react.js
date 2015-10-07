var React = require('react'),
    MessageStore = require('../stores/MessageStore.react'),
    Message = require('./Message.react');

function getStateFromStores() {
    return {
        messages: MessageStore.getAll()
    };
}

function getMessage(message) {
    return (
        <Message key={message.key} message={message} />
    );
}

var ViewScreen = React.createClass({
    getInitialState: function() {
        return getStateFromStores();
    },
    componentDidMount: function() {
        this.scrollToBottom();
        MessageStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        MessageStore.removeListener(this.onChange);
    },
	render: function() {
        var messages = this.state.messages.map(getMessage);
		return (
            <div className='messageList' ref='messageList'>
                {messages}
            </div>
		);
	},
    componentDidUpdate: function() {
        this.scrollToBottom();
    },
    scrollToBottom: function() {
        var div = this.refs.messageList.getDOMNode();
        div.scrollTop = div.scrollHeight;
    },
    onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = ViewScreen;