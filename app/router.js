'use strict'
module.exports = app => {
	const { router, controller } = app
	router.get('/', controller.home.index)
	router.get('/news', controller.news.list)
	router.get('/news/item/:id', controller.news.detail)
	router.get('/news/user/:id', controller.news.user)
	//
	router.post('createPost', '/api/wx/token', controller.wx.token)
	router.get('/api/wx/token', controller.wx.token)
	router.get('/api/wx/config', controller.wx.config)
	router.get('/api/wx/userInfo', controller.wx.userInfo)
}
