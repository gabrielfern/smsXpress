let express = require('express')
let app = express()
let database = require('./database')

// database.createSms(0, ['123', '456'], 'this is a message')
// database.getSms(1, (message) => {
//   console.log(message)
// })


app.get('/api/sms', function (req, res) {
  res.send('Hello World')
})

app.post('/api/sms', function (req, res) {
  res.send('Hello World')
})

app.use(express.static('static'))
app.listen(3000)
