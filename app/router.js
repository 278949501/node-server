'use strict'
module.exports = app => {
	const { router, controller } = app
	router.get('/', controller.home.index)
	router.get('/news', controller.news.list)
	router.get('/news/item/:id', controller.news.detail)
	router.get('/news/user/:id', controller.news.user)
	//
	router.post(
		'createPost',
		'/api/wechat/signature',
		controller.wechat.signature.index,
	)
	//
	router.get('/api/wechat/signature', controller.wechat.signature.index)
	router.get('/api/wechat/config', controller.wechat.config.index)
	router.get('/api/wechat/userInfo', controller.wechat.userInfo.index)
	router.get('/api/wechat/login', controller.wechat.login.index)
}
