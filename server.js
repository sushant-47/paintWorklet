const fs = require('fs');

// console.log("html: ", html);
const mg = require("mailgun-js")({apiKey: process.env.npm_package_config_API_KEY, domain: process.env.npm_package_config_DOMAIN});

var mail_options = {
	from: 'Mailgun User <me@samples.mailgun.org>',
	to: 'sushant.kakroo@lybrate.com',
	subject: 'Test Mail 1'
};

fs.readFile(process.env.npm_package_config_file_path, 'utf8', function(err, data) {
	if (err) {
		console.log("error in reading file : ", err);
		return;
	}
	// console.log("file data : ", data);
	mail_options.html = data;
	sendMail();
});

function sendMail() {
	mg.messages().send(mail_options, function (error, body) {
		console.log(body);
		if (error) {
			console.log("error in sending : ", error);
		}
	});
}
