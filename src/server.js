// const global_path = '/Users/kakroo/.nvm/versions/node/v12.2.0/lib/node_modules';
const express = require('express');
const path = require('path');
const app = express();
const serverless = require('serverless-http');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	console.log("request intercepted : ", req.method, " ", req.path);
	next();
});

app.use('/static', express.static(path.join(__dirname, './public')));

app.get(".netlify/functions/test", function(req, res, next) {
	res.json({
		"hello": "world"
	});
});

app.get(".netlify/functions/index", function(req, res, next) {
	res.render("index", {title: "Home Page"});
});

app.use(clientErrorHandler);
function clientErrorHandler (err, req, res, next) {
	console.log("error : ", err);
	if (req.xhr) {
		console.log("unknown api : ");
	} else {
		console.log("incorrect path configured");
	}
	next();
}

module.exports.handler = serverless(app);
