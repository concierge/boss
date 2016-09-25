let fs = require('fs');

exports.log = (action, user, ip, agent) => {
	let line = `["${(new Date()).toISOString()}","${action}","${user}", "${ip}","${agent}"],`;
	fs.appendFile('audit.log', line, (err) => {});
};

exports.readLog = (callback) => {
	fs.readFile('audit.log', (err, data) => {
	    if (err) {
	        return callback([]);
	    }
		data = data.toString();
	    data = '[' + data.substr(0, data.length - 1) + ']';
		callback(JSON.parse(data));
	});
};
