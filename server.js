var http = require('http'),
	express = require('express'),
	// browserify = require('browserify-middleware'),
	logger = require('morgan'),
	app = express();

app.use(express.static('dist'));
app.use(logger('dev'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index');
});

var server = http.createServer(app);

server.listen('3000', function (err) {
	console.log('express server listening on port 3000');
});