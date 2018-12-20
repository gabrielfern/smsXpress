const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'
const dbName = 'smsxpress'

function getSms (id, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err)
    let db = client.db(dbName)
    let collection = db.collection('sms')

    collection.findOne({ id }, function(err, sms) {
      assert.equal(err, null)
      callback(sms)
      client.close()
    })
  })
}

function createSms (id, numbers, message, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err)
    let db = client.db(dbName)
    let collection = db.collection('sms')

    collection.insertOne({id, numbers, message}, function(err, res) {
      assert.equal(err, null)
      if (callback)
        callback(res.result)
      client.close()
    })
  })
}

module.exports = { getSms, createSms }
