var React = require('react'),
    assign = require('object-assign');
    ApplicationStore = require('../stores/ApplicationStore.react'),
    AliasStore = require('../stores/AliasStore.react'),
    ConfigStore = require('../stores/ConfigStore.react'),
    TriggerStore = require('../stores/TriggerStore.react'),
    SubstitutionStore = require('../stores/SubstitutionStore.react'),
    MessageActionCreators = require('../actions/MessageActionCreators'),
    AliasActionCreators = require('../actions/AliasActionCreators'),
    TriggerActionCreators = require('../actions/TriggerActionCreators'),
    SubstitutionActionCreators = require('../actions/SubstitutionActionCreators'),
    ConfigActionCreators = require('../actions/ConfigActionCreators'),
    ApplicationActionCreators = require('../actions/ApplicationActionCreators'),
    bootstrap = require('react-bootstrap'),
    ModalInput = require('./ModalInput.react');

var Navbar = bootstrap.Navbar,
    Nav = bootstrap.Nav,
    DropdownButton = bootstrap.DropdownButton,
    NavItem = bootstrap.NavItem;

function getStateFromStores() {
    return ApplicationStore.getState();
}

var Menu = React.createClass({
    getInitialState: function() {
        var applicationState = {};

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
        var connectText = (this.state.connected) ? 'Disconnect' : 'Connect';

        return (
            <Navbar brand='Mellon' className="mellon-nav">
                <Nav>
                    <NavItem onClick={this.connect}>{connectText}</NavItem>
                </Nav>
                <Nav right>
                    <ModalInput store={AliasStore} actionCreator={AliasActionCreators} title='Aliases'/>
                    <ModalInput store={SubstitutionStore} actionCreator={SubstitutionActionCreators} title='Substitutions'/>
                    <ModalInput store={TriggerStore} actionCreator={TriggerActionCreators} title='Triggers'/>
                    <ModalInput store={ConfigStore} actionCreator={ConfigActionCreators} title='Settings'/>
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

module.exports = Menu;
