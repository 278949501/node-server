const crypto = require('crypto')

// 导出验证 Tonken 的发放
module.exports = class WX {
	constructor(app) {
		this.app = app
		this.config = app.config
		this.logger = app.logger
	}
	// 验证tonken
	validateToken(req) {
		return new Promise((resolve, reject) => {
			let query = req.query
			let signature = query.signature
			let echostr = query['echostr']
			let timestamp = query['timestamp']
			let nonce = query['nonce']
			let oriArray = new Array()
			oriArray[0] = nonce
			oriArray[1] = timestamp
			oriArray[2] = 'admin123' // 这里是在公众号接口配置信息里面填写的Token
			oriArray.sort()
			let original = oriArray.join('')
			let scyptoString = this.sha1(original)
			if (signature == scyptoString) {
				// 验证通过，返回 echostr
				resolve(echostr)
			} else {
				reject(false)
			}
		})
	}
	// 加密方法
	sha1(str) {
		var md5sum = crypto.createHash('sha1')
		md5sum.update(str)
		str = md5sum.digest('hex')
		return str
	}
}
