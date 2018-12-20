let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let database = require('./database')
let twilio  = require('./twilio')

app.use(bodyParser.json())
app.use(express.static('static'))

app.get('/api/sms', function (req, res) {
  database.getSms(req.body.protocol, (sms) => {
    res.json(sms)
  })
})

app.post('/api/sms', function (req, res) {
  let sms = {
    numbers: req.body.numbers,
    message: req.body.message
  }
  database.createSms(sms, (r) => {
    twilio.sendSms(sms.message)
    res.json(r)
  })
})

app.listen(3000)
