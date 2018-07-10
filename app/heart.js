const email 	= require('emailjs/email');

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
    this.msg = 'report from heartbead - service: ' + this.name +' unreachable'
    this.interval = config.interval || 60000 //|| 15*60*1000
    this.timer = setInterval(this.sendMail.bind(this), this.interval)
  }

  get Name () { return this.name }
  set Name (name) { this.name = name }

  get Email () { return this.email }
  set Email (email) { this.email = email }

  get Interval () { return this.interval }
  set Interval (interval) { this.interval = interval }

  get Msg () { return this.msg }
  set Msg (msg) { this.msg = msg }

}

Heart.prototype.sendMail = function () {
    console.log(this.name + ' send email...')
    send(this.msg, this.email).then((msg) => {
        console.log('email send success')
        console.log(msg)
    })
    .catch((err) => {
        console.log('err - ',  err)
    })
}

Heart.prototype.clearTimer = function () {
    clearInterval(this.timer);
}

Heart.prototype.setInterval = function () {
    this.timer = setInterval(this.sendMail.bind(this), this.interval)
}

function send(msg, mail) {
    return new Promise((resolve, reject) => {
        let server = email.server.connect({
            user: "reportfromheart",
            password: "cfrehf26",
            host: "smtp.gmail.com",
            ssl: true
        })
        server.send({
            text: "from reportheart",
            from: "reportheart <reportfromheart@gmail.com>",
            to: 'someone <' + mail + '>',
            subject: msg
        }, ((err, message) => {;
            if (err){
                return reject(err)
            }
            return resolve(message)
        }));
    })
}

module.exports = Heart