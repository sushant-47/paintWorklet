const global_path = '/Users/kakroo/.nvm/versions/node/v12.2.0/lib/node_modules';
const express = require(global_path + '/express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	console.log("request intercepted : ", req.method, " ", req.path);
	next();
});

app.use('/static', express.static(path.join(__dirname, './public')));

app.get("/", function(req, res, next) {
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

app.listen(process.env.npm_package_config_server_port, function() {
	console.log("server listening on port : ", process.env.npm_package_config_server_port);
});
