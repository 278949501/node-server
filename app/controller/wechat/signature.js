const Controller = require('egg').Controller
const crypto = require('crypto')

// 检查
const checkSign = (timestamp, nonce, signature, token) => {
	const tmp = [token, timestamp, nonce].sort().join('')
	const currSign = crypto.createHash('sha1').update(tmp).digest('hex')
	return currSign === signature
}

class WxSignatureController extends Controller {
	async index() {
		const { ctx } = this
		const { query } = ctx
		const signature = query.signature
		const timestamp = query.timestamp
		const nonce = query.nonce
		const echostr = query.echostr
		if (await checkSign(timestamp, nonce, signature, 'token')) {
			ctx.body = echostr
		} else {
			ctx.body = {
				msg: '未通过验证',
				data: query,
			}
		}
	}
}

module.exports = WxSignatureController
