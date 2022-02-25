const fs = require('fs')
const path = require('path')

module.exports = appInfo => {
	const config = {}
	// key
	config.keys = `${appInfo.name}123456`

	config.news = {
		pageSize: 30,
		serverUrl: 'https://hacker-news.firebaseio.com/v0',
	}

	// 添加 view 配置
	config.view = {
		defaultViewEngine: 'nunjucks',
		mapping: {
			'.tpl': 'nunjucks',
			'.nj': 'nunjucks',
		},
	}

	// 添加 用户 配置
	config.customLoader = {
		utils: {
			directory: 'app/utils',
			inject: 'app',
		},
	}

	// 测试，关闭安全机制，防止出现 invalid csrf token
	config.security = {
		csrf: {
			ignore: '/api/wxtoken',
		},
		domainWhiteList: [
			'http://127.0.0.1:7001',
			'http://192.168.11.186:3000',
			'http://weixin.ugreengroup.com',
		],
	}

	return config
}
