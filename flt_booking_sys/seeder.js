var conn = require('./config/db.js');
var df = require('dateformat');
var yr = 364;
var apts = ['TXL', 'HAM', 'STR'];
// var apts = ['FRA', 'MUC', 'DUS', 'TXL', 'HAM', 'STR', 'CGN'];
for (var i = 1; i <= yr; i++) {
    var today = new Date();
    var iterDate = today.setDate(i);
    var resultDate = df(iterDate, "isoDate");
    for (var j = 0; j < apts.length; j++) {
        for (var k = 0; k < apts.length; k++) {
            if (j !== k) {
                let entry = {
                    from: apts[j],
                    to: apts[k],
                    date: resultDate,
                    cap: 50,
                    booked: 0
                };
                conn.query("INSERT INTO flights SET ?", entry, function (err, rows) {
                    if (err) throw err;
                });
            }
        }
    }
}