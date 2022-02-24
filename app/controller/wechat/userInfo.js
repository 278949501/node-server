const Controller = require('egg').Controller
const https = require('https')
const wxConfig = require('../../../config/wechat')
class WxUserInfoController extends Controller {
	// 获取用户信息
	async index() {
		const { ctx } = this
		ctx.body = {
			code: 0,
			msg: '',
			data: {
				name: 'liuqi',
				openid: '67',
			},
		}
		return
		// 检查 code
		const code = ctx.query.code
		if (!code) {
			ctx.body = {
				code: 201,
				msg: '缺少Code',
				data: {},
			}
		}

		// 获取用户信息 access_token 这里与签名不是同一个
		const { appID, appsecret } = wxConfig
		const oAccessToken = await this.getAccessTokenByCode(
			appID,
			appsecret,
			code,
		).catch(error => {
			console.log('error', error)
		})

		if (!oAccessToken) {
			return
		}

		// 获取用户信息
		const { openid, access_token } = oAccessToken
		const oUserInfo = await this.getUserInfoByAccessToken(
			openid,
			access_token,
		).catch(error => {
			console.log('error', error)
		})

		// 返回用户信息
		if (!oUserInfo) {
			return
		}
		ctx.body = {
			code: 0,
			msg: 'success',
			data: { ...oUserInfo },
		}
	}

	// 获取用户信息 access_token 这里与签名不是同一个
	async getAccessTokenByCode(appID, appsecret, code) {
		return new Promise((resolve, reject) => {
			const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appsecret}&code=${code}&grant_type=authorization_code`
			https.get(url, response => {
				let result = ''
				response.on('data', chunk => {
					result += chunk
				})
				response.on('end', async () => {
					let data = JSON.parse(result)
					resolve(data)
				})
				// reject 条件 ？？？
			})
		})
	}

	// 获取用户信息
	async getUserInfoByAccessToken(openid, access_token) {
		return new Promise((resolve, reject) => {
			const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
			https.get(url, response => {
				let result = ''
				response.on('data', chunk => {
					result += chunk
				})
				response.on('end', () => {
					let data = JSON.parse(result)
					resolve(data)
				})
				// reject 条件 ？？？
			})
		})
	}
}
module.exports = WxUserInfoController
