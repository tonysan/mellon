var React = require('react'),
	ViewScreen = require('./ViewScreen.react'),
	CharacterInfo = require('./CharacterInfo.react'),
	Input = require('./Input.react'),
    DevTools = require('./DevTools.react');

var MellonApp = React.createClass({
	render: function() {
		return (
			<div className='mellonApp'>
                <DevTools />
                <CharacterInfo />
				<ViewScreen />
				<Input />
			</div>
		);
	}
});

module.exports = MellonApp;