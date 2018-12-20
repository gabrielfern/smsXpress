let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let database = require('./database')

app.use(bodyParser.json())
app.use(express.static('static'))

app.get('/api/sms', function (req, res) {
  database.getSms(req.body.protocol, (sms) => {
    res.json(sms)
  })
})

app.post('/api/sms', function (req, res) {
  let sms = {
    id: req.body.id,
    numbers: req.body.numbers,
    message: req.body.message
  }
  database.createSms(sms, (r) => {
    res.json(r)
  })
})

app.listen(3000)
