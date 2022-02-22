'use strict'

const Controller = require('egg').Controller
const fs = require('fs')
const wxConfig = require('../../config/wxConfig')

class TestController extends Controller {
	async write() {
		const { ctx } = this
		fs.writeFileSync(wxConfig.accessTokenPath, JSON.stringify(new Date()))
		ctx.body = {
			code: 0,
			msg: 'success',
			data: {},
		}
	}
}

module.exports = TestController
