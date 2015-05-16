var React = require('react'),
    assign = require('object-assign');
    ApplicationStore = require('../stores/ApplicationStore.react'),
    MessageActionCreators = require('../actions/MessageActionCreators'),
    ApplicationActionCreators = require('../actions/ApplicationActionCreators');

var timer = null;

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