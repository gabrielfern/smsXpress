const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const RandExp = require('randexp')

const url = process.env.MONGODB_URI
const dbName = 'smsxpress'
const protocolGen = new RandExp(/[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}/)

function getSms (protocol, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.strictEqual(null, err)
    let db = client.db(dbName)
    let collection = db.collection('sms')

    collection.findOne({ protocol }, function (err, sms) {
      assert.strictEqual(err, null)
      callback(sms)
      client.close()
    })
  })
}

function createSms (sms, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    assert.strictEqual(null, err)
    let db = client.db(dbName)
    let collection = db.collection('sms')

    sms.protocol = protocolGen.gen()
    collection.insertOne(sms, function (err, res) {
      assert.strictEqual(err, null)
      if (callback) {
        callback(res.ops[0])
      }
      client.close()
    })
  })
}

module.exports = { getSms, createSms }
