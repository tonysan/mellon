var React = require('react'),
    MessageActionCreators = require('../actions/MessageActionCreators');

var timer = null;

var DevTools = React.createClass({
    getInitialState: function() {
        return {
            autoEnabled: false,
            connected: false
        };
    },
    render: function() {
        var autoText = (this.state.autoEnabled) ? 'Stop Auto-Simulate' : 'Enable Auto-Simulate',
            connectText = (this.state.connected) ? 'Disconnect' : 'Connect';
        return (
            <div className="devTools">
                <button onClick={this.connect}>{connectText}</button>
                <button onClick={this.simulateMessage}>Simulate Message</button>
                <button onClick={this.setAuto}>{autoText}</button>
            </div>
        );
    },
    connect: function() {
        if (this.state.connected) {
            this.setState({
                connected: false
            });
            MessageActionCreators.sendCommand('zap');
            return;
        }

        this.setState({
            connected: true
        });
        MessageActionCreators.sendCommand('connect');
    },
    simulateMessage: function() {
        MessageActionCreators.receiveMessage(Math.random(0,1) * 10);
    },
    setAuto: function() {
        if (!timer) {
            this.setState({
                autoEnabled: true
            });
            timer = window.setInterval(function() {
                this.simulateMessage();
            }.bind(this), 200);
            return;
        }

        this.setState({
            autoEnabled: false
        });
        window.clearInterval(timer);
        timer = null;
    }
});

module.exports = DevTools;