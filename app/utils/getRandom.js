module.exports = class GetRandom {
	constructor(app) {
		this.app = app
		this.config = app.config
		this.logger = app.logger
	}
	// 会被挂载为 `app.utils.GetRandom.random()`
	random() {
		return Math.random()
	}
}
