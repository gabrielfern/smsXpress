const accountSid = process.env.accountSid
const authToken = process.env.authToken
const client = require('twilio')(accountSid, authToken)

const twilioNumber = process.env.twilioNumber

function sendSms(message, callback) {
  if (message) {
    client.messages.create({
      body: message,
      from: twilioNumber,
      to: process.env.myNumber
    })
      .then(res => {
        if (callback)
          callback(res.sid)
       })
      .done()
  }
}

module.exports = { sendSms }
