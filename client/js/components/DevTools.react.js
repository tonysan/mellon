var React = require('react'),
    MessageActionCreators = require('../actions/MessageActionCreators');

var timer = null;

var DevTools = React.createClass({
    getInitialState: function() {
        return {
            autoEnabled: false
        };
    },
    render: function() {
        var autoText = (this.state.autoEnabled) ? 'Stop Auto-Simulate' : 'Enable Auto-Simulate';
        return (
            <div className="devTools">
                <button onClick={this.simulateMessage}>Simulate Message</button>
                <button onClick={this.setAuto}>{autoText}</button>
            </div>
        );
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