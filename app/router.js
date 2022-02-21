'use strict'
module.exports = app => {
	const { router, controller } = app
	router.get('/', controller.home.index)
	router.get('/news', controller.news.list)
	router.get('/news/item/:id', controller.news.detail)
	router.get('/news/user/:id', controller.news.user)
	//
	router.post('createPost', '/api/wxtoken', controller.wx.index)
	// router.post('createPost', '/api/wxtoken', controller.wx.validateToken)
	router.get('/api/wxtoken', controller.wx.index)
}