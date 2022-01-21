const http = require('http')
const fs = require('fs')

http
	.createServer(function (request, response) {
		console.log('request', request.url)
		if (request.url === '/') {
			const html = fs.readFileSync('test.html', 'utf8')
			response.end(html)
		}
		if (request.url === '/script.js') {
			response.writeHead(200, {
				'Content-Type': 'text/javascript',
				'Cache-Control': 'max-age=200000, no-cache',
				'last-Modified': '123',
				Etag: '777',
			})
			const etag = request.headers['if-none-match']
			if (etag === '777') {
				response.writeHead(304, {
					'Content-Type': 'text/javascript',
					'Cache-Control': 'max-age=200000',
					'last-Modified': '123',
					Etag: '777',
				})
				response.end('123123')
			} else {
				response.writeHead(200, {
					'Content-Type': 'text/javascript',
					'Cache-Control': 'max-age=200000',
					'last-Modified': '123',
					Etag: '777',
				})
				response.end('console.log("script loaded 12")')
			}
		}
	})
	.listen(8888)
