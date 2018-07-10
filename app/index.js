let express = require('express')
    , app = express()
    , port = 3001
let bodyParser = require('body-parser');
const _ = require('underscore')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
//const adapter = new FileAsync('/database/rules.json')
const adapter = new FileAsync('./rules.json')
const queries = require('./queries')
let hearts = require('./heart')
const mails = require('./conf')

allHearts = []

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodie

app.get('/', (req, res) => {
    res.status(200).send('test working...')
})

low(adapter)
    .then(db => {

        queries.findAll(db)
            .then((data) => {
                if (data) {
                    data.forEach(el => {
                        let t = new hearts({ name: el.name, email: el.email })
                        allHearts.push(t)
                    });
                }
                console.log('get all - ', data)
                console.log('all timers - ', allHearts)
            })

        app.get('/service/:name', (req, res) => {
            queries.find(db, req.params.name)
                .then((data) => {
                    if (data) {
                        console.log('find - ', data)
                        res.status(200).send(data)
                    } else {
                        res.status(404).send('Not Fuond')
                    }
                })
        })

        app.post('/heart/:name', (req, res) => {
            //            console.log('---------------------------------------')
            var code = 404
            if (req.body.status === 'ok') {
                console.log('req ', req.params.name)
                for (let i = 0; i < allHearts.length; i++) {
                    if (req.params.name === allHearts[i].name) {
                        // console.log('reset timer - ', allHearts[i] )
                        allHearts[i].clearTimer()
                        allHearts[i].setInterval()
                        code = 200
                    }
                }
            }
            if (req.body.status === 'bad' || req.body.status !== 'ok') {
                for (let i = 0; i < allHearts.length; i++) {
                    if (req.params.name === allHearts[i].name) {
                        // console.log('reset timer - ', allHearts[i] )
                        allHearts[i].clearTimer()
                        allHearts[i].setInterval()
                        allHearts[i].msg = req.body.msg || allHearts.msg
                        allHearts[i].sendMail()
                        code = 201
                    }
                }
            }
            if (code === 200) { res.status(code).send('reset timer') }
            if (code === 201) { res.status(code).send('send bad msg to mail') }
            if (code === 404) { res.status(code).send('Not Found') }
            if (code === 500) { res.status(code).send('error') }
        })

        app.get('/service', (req, res) => {
            queries.findAll(db)
                .then((data) => {
                    //                    console.log('get all - ', data)
                    //                    console.log('all timers - ', allHearts)
                    res.status(200).send(data)

                })
        })

        app.post('/service', (req, res) => {
            if (!req.body.name) { res.status(500).send('need name') }
            if (!req.body.email) { res.status(500).send('need email') }
            if (req.body.email && req.body.name) {
                queries.find(db, req.body.name)
                    .then((data) => {
                        if (data) {
                            console.log('data - ', data)
                            res.status(200).send('rule exists')
                        } else {
                            queries.post(db, { name: req.body.name, email: req.body.email })
                                .then(() => {
                                    let t = new hearts({ name: req.body.name, email: req.body.email })
                                    allHearts.push(t)
                                    res.status(200).send('rule created')

                                })
                        }
                    })

                console.log(req.body)
            }
        })

        app.get('/delete/service/:name', (req, res) => {
            for (let i = 0; i < allHearts.length; i++) {
                if (req.params.name === allHearts[i].name) {
                    console.log('delete el - ', allHearts[i])
                    let tmp = allHearts[i]
                    tmp.clearTimer()
                    allHearts = _.without(allHearts, allHearts[i])
                    for (var variableKey in tmp) {
                        if (tmp.hasOwnProperty(variableKey)) {
                            console.log('******* ', variableKey)
                            delete tmp[variableKey];
                        }
                    }
                    console.log('delete after - ', tmp)
                }
            }
            queries.del(db, req.params.name)
                .then((msg) => {
                    res.status(200).send(msg)
                }).catch(e => {
                    res.status(404).send(e.message)
                })

        })

        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

        return db.defaults({ mysql: [] }).write()

    })
    .then(() => {
        app.listen(port, () => console.log('listening on port ' + port))
    })
