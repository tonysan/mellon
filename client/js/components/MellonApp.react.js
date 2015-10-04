var React = require('react'),
	ViewScreen = require('./ViewScreen.react'),
	CharacterInfo = require('./CharacterInfo.react'),
    AliasStore = require('../stores/AliasStore.react'),
    TriggerStore = require('../stores/TriggerStore.react'),
    SubstitutionStore = require('../stores/SubstitutionStore.react'),
    ConfigStore = require('../stores/ConfigStore.react'),
    MessageActionCreators = require('../actions/MessageActionCreators'),
	Input = require('./Input.react'),
    Menu = require('./Menu.react');

var MellonApp = React.createClass({
    componentDidMount: function() {
        AliasStore.addChangeListener(this.onChange.bind(this, 'alias'));
        TriggerStore.addChangeListener(this.onChange.bind(this, 'trigger'));
        SubstitutionStore.addChangeListener(this.onChange.bind(this, 'substitution'));
        ConfigStore.addChangeListener(this.onChange.bind(this, 'config'));
    },
    componentWillUnmount: function() {
        AliasStore.removeListener(this.onChange.bind(this, 'alias'));
        TriggerStore.removeListener(this.onChange.bind(this, 'trigger'));
        SubstitutionStore.removeListener(this.onChange.bind(this, 'substitution'));
        ConfigStore.removeListener(this.onChange.bind(this, 'config'));
    },
	render: function() {
		return (
			<div className='mellonApp'>
                <Menu />
                <CharacterInfo />
				<ViewScreen />
				<Input />
			</div>
		);
	},
    onChange: function(store) {
        switch(store) {
            case 'alias':
                MessageActionCreators.sendCommand({
                    command: 'update_aliases',
                    payload: AliasStore.getAll()
                });
            break;
            case 'trigger':
                MessageActionCreators.sendCommand({
                    command: 'update_triggers',
                    payload: TriggerStore.getAll()
                });
            break;
            case 'substitution':
                MessageActionCreators.sendCommand({
                    command: 'update_substitutions',
                    payload: SubstitutionStore.getAll()
                });
            break;
            case 'config':
                MessageActionCreators.sendCommand({
                    command: 'update_config',
                    payload: ConfigStore.getAll()
                });
            break;
        }
    }
});

module.exports = MellonApp;
