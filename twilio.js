const accountSid = 'ACce6239c8085f82e0b8ec8072163d90be'
const authToken = 'a11720ead3467466f15af33490df57df'
const client = require('twilio')(accountSid, authToken)

const twilioNumber = '+5547933007071'

function sendSms(message, callback) {
  if (message) {
    client.messages.create({
      body: message,
      from: twilioNumber,
      to: '+5583987682063'
    })
      .then(res => {
        if (callback)
          callback(res.sid)
       })
      .done()  
  }
}

module.exports = { sendSms }
