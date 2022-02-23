const path = require('path')

module.exports = {
	appID: 'wxcd215c50569a78ff', // 微信公众平台-->基本配置中查看（我这里使用的是测试信息，权限很多）
	appsecret: 'af9f48e8fa1a6653ed8d3ae2f47c1496',
	accessTokenPath: path.resolve(__dirname, './accessToken.json'), // 保存accessToken的路径(注意 . 不要漏写了，否则路径就错了)
	jsapiTicketPath: path.resolve(__dirname, './jsapiTicket.json'), // 保存jsapiTicket的路径(注意 . 不要漏写了，否则路径就错了)
}
