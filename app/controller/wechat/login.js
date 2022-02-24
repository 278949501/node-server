const Controller = require('egg').Controller

class WxLoginController extends Controller {
	async index() {
		const { ctx } = this
		ctx.body = {
			code: 0,
			msg: '',
			data: {
				token: 'token 112312312',
			},
		}
	}
}

module.exports = WxLoginController
