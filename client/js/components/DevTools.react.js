var React = require('react'),
    assign = require('object-assign');
    ApplicationStore = require('../stores/ApplicationStore.react'),
    MessageActionCreators = require('../actions/MessageActionCreators'),
    ApplicationActionCreators = require('../actions/ApplicationActionCreators');

var timer = null;

var tempMessage = "Perception: vision [32;1;107m50[0m, hearing [4;32m-10[0m, smell [32;5m-25[0m. Alertness: [9;32mnormal[0m.";

function getStateFromStores() {
    return ApplicationStore.getState();
}

var DevTools = React.createClass({
    getInitialState: function() {
        var applicationState = {
            autoEnabled: false
        };

        return assign(applicationState, getStateFromStores());
    },
    componentDidMount: function() {
        ApplicationStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        ApplicationStore.removeListener(this.onChange);
    },
    onChange: function() {
        this.setState(assign(this.state, getStateFromStores()));
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
            MessageActionCreators.sendCommand('zap');
            ApplicationActionCreators.updateState({
                connected: false
            });
            return;
        }

        ApplicationActionCreators.updateState({
            connected: true
        });
        MessageActionCreators.sendCommand('connect');
    },
    simulateMessage: function() {
        MessageActionCreators.receiveMessage({
            type: 'remote',
            // content: Math.random(0,1) * 10
            content: tempMessage
        });
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