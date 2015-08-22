var React = require('react'),
	ViewScreen = require('./ViewScreen.react'),
	CharacterInfo = require('./CharacterInfo.react'),
	Input = require('./Input.react'),
    Menu = require('./Menu.react');

var MellonApp = React.createClass({
	render: function() {
		return (
			<div className='mellonApp'>
                <Menu />
                <CharacterInfo />
				<ViewScreen />
				<Input />
			</div>
		);
	}
});

module.exports = MellonApp;
