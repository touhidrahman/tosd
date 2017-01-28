var conn = require('../config/db.js');
var df   = require('dateformat');
/**
 * GET /
 */
exports.index = function (req, res) {
  res.render('home', {
    title: 'Home'
  });
};


/**
 * GET /seed
 * Seed the DB for initial values
 */
exports.seedGet = function (req, res) {
  var yr = 364;
  var apts = ['FRA', 'MUC', 'DUS'];
  // var apts = ['FRA', 'MUC', 'DUS', 'TXL', 'HAM', 'STR', 'CGN'];
  for (var i = 1; i <= yr; i++){
    var today = new Date();
    var iterDate = today.setDate(i);
    var resultDate = df(iterDate, "isoDate");
    for (var j=0; j < apts.length; j++){
      for (var k= 0; k < apts.length; k++){
        if (j !== k){
          let entry = {
            from : apts[j],
            to : apts[k],
            date: resultDate,
            cap: 50,
            booked: 0
          };
          conn.query("INSERT INTO flights SET ?", entry, function(err, rows){
            if (err) throw err;
          });
        }
      }
    }
  }
};

/**
 * GET /tax/:id
 */
exports.taxByIdGet = function (req, res) {
  conn.query("SELECT * FROM taxes WHERE id = ?",[req.params.id], function (err, rows) {
    if (err) throw err;

    res.status(200).json(rows);
  });

};

/**
 * PUT /tax/:id
 */
exports.taxPut = function (req, res) {
  let amount = Number(req.body.amount);
  let tax    = Number(req.body.tax);
  var currency = req.body.currency;
  var result = amount + amount * tax / 100;
  conn.query("UPDATE taxes SET amount=?, tax=?, result=?, currency=? WHERE id = ?",
    [amount, tax, result, currency, req.params.id], 
    function (err, rows) {
      if (err) throw err;

      res.render('json', {
        layout: false,
        data: {"msg": "Record " + req.params.id + " Updated"}
      });
  });
};

/**
 * DELETE /tax/:id
 */
exports.taxDelete = function (req, res) {

  conn.query("DELETE FROM taxes WHERE id = ?",
    [req.params.id], 
    function (err, rows) {
      if (err) throw err;

      res.status(200).json({"msg": "ID: "+req.params.id + " Deleted"});
  });
};

/**
 * POST /tax
 */
exports.taxPost = function (req, res) {
  req.assert('amount', 'Amount cannot be blank').notEmpty();
  req.assert('tax', 'Tax cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/');
  }

  let amount = Number(req.body.amount);
  let tax    = Number(req.body.tax);
  var record = {
    amount   : amount,
    tax      : tax,
    currency : req.body.currency,
    result   : amount + amount * tax / 100,
    created  : df(new Date(), "yyyy-mm-dd HH:MM:ss")
  };

  conn.query("INSERT INTO taxes SET ?", record, function(err, row){
    if (err) throw err;

    res.status(200).json({"msg": "New Record Added. ID: " + row.insertId});
  });

};
