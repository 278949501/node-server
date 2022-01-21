const http = require('http')

http
	.createServer(function (request, response) {
		console.log('request', request.url)
		response.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'X-Test-Cors',
		})
		response.end('123')
	})
	.listen(8887)
