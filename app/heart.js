class Heart{

/*
*  Heart
*
*   param {object} config
* - {string} interval, path - interval checking service - minutes -
* - {string} email - email for reports if will be errors
* - {string} name - this name use for select needed Hearts
*
*/

  constructor (config) {
    if (!config.name) throw new Error(' name dont set')
    if (!config.email) throw new Error(' email dont set')
    this.name = config.name
    this.email = config.email
    this.status = true
    this.interval = config.interval || 30000 //|| 15*60*1000
    this.timer = setInterval(this.sendMail.bind(this), this.interval)
  }

  get Name () { return this.name }
  set Name (name) { this.name = name }

  get Email () { return this.email }
  set Email (email) { this.email = email }

  get Interval () { return this.interval }
  set Interval (interval) { this.interval = interval }

}

Heart.prototype.sendMail = function () {
    console.log(this.name + ' send email...')
}

Heart.prototype.clearTimer = function () {
    clearInterval(this.timer);
}

Heart.prototype.setInterval = function () {
    this.timer = setInterval(this.sendMail.bind(this), this.interval)
}

module.exports = Heart