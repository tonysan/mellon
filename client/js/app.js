var MellonApp = require('./components/MellonApp.react'),
	React = require('react');

window.React = React;

React.render(
	<MellonApp />,
	document.getElementById('react')
);