var React = require('react'),
    assign = require('object-assign');
    ApplicationStore = require('../stores/ApplicationStore.react'),
    MessageActionCreators = require('../actions/MessageActionCreators'),
    ApplicationActionCreators = require('../actions/ApplicationActionCreators'),
    Navbar = require('react-bootstrap').Navbar,
    Nav = require('react-bootstrap').Nav,
    DropdownButton = require('react-bootstrap').DropdownButton,
    NavItem = require('react-bootstrap').NavItem,
    MenuItem = require('react-bootstrap').MenuItem;

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
            <Navbar brand='Mellon' className="mellon-nav">
                <Nav>
                    <NavItem eventKey={1} href='#' onClick={this.connect}>{connectText}</NavItem>
                </Nav>
                <Nav right>
                    <DropdownButton eventKey={2} title='Options'>
                        <MenuItem eventKey='1'>Aliases</MenuItem>
                        <MenuItem eventKey='2'>Triggers</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey='3'>Settings</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
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
    }
});

module.exports = DevTools;
