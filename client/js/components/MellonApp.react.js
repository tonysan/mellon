var React = require('react'),
	ViewScreen = require('./ViewScreen.react');

var MellonApp = React.createClass({
	render: function() {
		return (
			<div className='mellonApp'>
				<ViewScreen />
			</div>
		);
	}
});

module.exports = MellonApp;