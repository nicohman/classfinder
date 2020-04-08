const http =require('http');
	http.createServer(function (req, res) {
	res.write('h');
		res.end();
	}).listen(80);
