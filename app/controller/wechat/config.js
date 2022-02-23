const Controller = require('egg').Controller
const https = require('https')
const crypto = require('crypto')
const fs = require('fs')
const wxConfig = require('../../../config/wechat')

// 获取jsApi_ticke
const getTicke = ACCESS_TOKEN => {
	return new Promise((resolve, reject) => {
		let curTime = getTimestamp()
		let jsapiObj = require('../../../config/wechat/jsapiTicket.json')
		if (curTime <= jsapiObj.expiresTime) return resolve(jsapiObj.ticket)
		console.log('jsapi_ticket过期, 重新获取')
		let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`
		https.get(url, response => {
			let result = ''
			response.on('data', chunk => {
				result += chunk
			})
			response.on('end', () => {
				let jsapiObj = JSON.parse(result)
				jsapiObj.expiresTime = getTimestamp() + 7000
				fs.writeFileSync(wxConfig.jsapiTicketPath, JSON.stringify(jsapiObj))
				resolve(jsapiObj.ticket)
			})
		})
	})
}

// 获取access_token
const getAccessToken = () => {
	return new Promise((resolve, reject) => {
		let curTime = getTimestamp()
		let accessToken = require('../../../config/wechat/accessToken.json')
		if (curTime <= accessToken.expiresTime) {
			return resolve(accessToken['access_token']) // <=意为accessToken没有过期,直接return出去即可,否则重新获取
		}
		console.log('accessToken过期, 重新获取')
		let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appID}&secret=${wxConfig.appsecret}`
		https.get(url, response => {
			let result = ''
			response.on('data', chunk => {
				result += chunk
			})
			response.on('end', () => {
				accessToken = JSON.parse(result)
				accessToken.expiresTime = getTimestamp() + 7000 // 当前时间s+7000s(accessToken两个小时有效期), 在上面判断如果这个时间小于当前时间则重新获取accessToken
				fs.writeFileSync(wxConfig.accessTokenPath, JSON.stringify(accessToken))
				resolve(accessToken['access_token'])
			})
		})
	})
}

// 获取随机字符串
const getNonceStr = (length = 16) => {
	let str = 'abcdefghijklmnopqrstuvwxyzABCKEFGHIJKLMNOPQRSTUVWXYZ1234567890' // 长度62
	// 取0-62的随机整数
	let max = str.length,
		min = 0
	let randomStr = ''
	for (let i = 0; i < length; i++) {
		randomStr += str.substr(
			Math.floor(Math.random() * (max - min + 1)) + min,
			1,
		) // 取两数之间的整数(包括这两个整数)
	}
	return randomStr
}

// 获取时间戳
const getTimestamp = () => {
	return Math.round(new Date().getTime() / 1000)
}

class WxConfigController extends Controller {
	// 获取签名
	async index() {
		const { ctx } = this
		console.log('ctx', ctx)
		const { url } = ctx.query // 获取前端传递的url
		const timestamp = getTimestamp() // 时间戳
		const nonceStr = getNonceStr(16) // 随机16位字符串
		const accessToken = await getAccessToken() // 获取accessToken(用于获取jsapiTicket)
		const jsapiTicket = await getTicke(accessToken) // 使用获取到的jsapiTicket
		console.log('accessToken: ', accessToken)
		console.log('jsapiTicket: ', jsapiTicket)
		const str = `jsapi_ticket=${jsapiTicket}noncestr=${nonceStr}timestamp=${timestamp}url=${url}` // 对四个数据做字典序的排序
		const signature = crypto.createHash('sha1').update(str).digest('hex') // 使用sha1第三方模块进行加密得到的就是签名
		// 将配置信息返回给前端
		ctx.body = {
			code: 0,
			msg: 'success',
			data: {
				appId: wxConfig.appID, // 必填，公众号的唯一标识
				timestamp, // 必填，生成签名的时间戳
				nonceStr, // 必填，生成签名的随机串
				signature, // 必填，签名
			},
		}
	}
}
module.exports = WxConfigController
