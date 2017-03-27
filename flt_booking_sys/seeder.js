var async = require('async')

var conn = require('./config/db.js')
var df = require('dateformat')
var yr = 364
// var apts = ['DUS', 'HAM', 'STR']
var apts = ['FRA', 'MUC', 'TXL']

// create necessary tables
conn.query('CREATE TABLE IF NOT EXISTS flights (id INT(6) NOT NULL AUTO_INCREMENT, dep CHAR(3) DEFAULT NULL, arr CHAR(3) DEFAULT NULL, dt DATE DEFAULT NULL, cap INT(3) DEFAULT NULL, booked INT(3) DEFAULT NULL, PRIMARY KEY(id))')

conn.query('CREATE TABLE IF NOT EXISTS reservations (id INT(6) NOT NULL AUTO_INCREMENT, flight_id INT(6) DEFAULT NULL, pax INT(3) DEFAULT NULL, created DATETIME DEFAULT NULL, PRIMARY KEY(id))')

// create collection to be inserted
const bigArray = []

for (var i = 1; i <= yr; i++) {
  var today = new Date()
  var iterDate = today.setDate(i)
  var resultDate = df(iterDate, 'isoDate')
  for (var j = 0; j < apts.length; j++) {
    for (var k = 0; k < apts.length; k++) {
      if (j !== k) {
        let entry = {
          dep: apts[j],
          arr: apts[k],
          dt: resultDate,
          cap: 50,
          booked: 0
        }
        bigArray.push(entry)
      }
    }
  }
}

async.each(bigArray, function (entry, callback) {
  conn.query('INSERT INTO flights SET ?', entry, function (err, rows) {
    if (err) throw err
    console.log("Writting 1 entry to DB: "+ entry.dep + "-" + entry.arr + " (" + entry.dt + ")")
    callback()
  })
}, function(err){
    if (err) throw err
    console.log("Seeding to database finished.")
    conn.end()
})
