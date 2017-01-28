var conn = require('../config/db.js')
var df = require('dateformat')
/**
 * GET /
 */
exports.index = function (req, res) {
  res.render('home', {
    title: 'Search Flight'
  })
}

/**
 * GET /search?DC=val&AC=val&DD=val&RD=val&PA=val&PC=val&PI=val 
*/
exports.getFlights = function (req, res) {
  let DC = req.query.DC
  let AC = req.query.AC
  let DD = req.query.DD
  let RD = req.query.RD
  let PA = Number(req.query.PA)
  let PC = Number(req.query.PC)
  let PI = Number(req.query.PI)
  let PAX = PA + PC + PI
  conn.query(
    "SELECT * FROM flights WHERE `from` = ? AND `to` = ? AND `date` = ? AND `booked` <= ? ORDER BY `date`",
    [DC, AC, DD, 50 - PAX],
    function (err, rowsXtoY) {
      if (err) throw err
      if (RD != '' || TT == "RT") {
        // return flight is also requested, so search 
        conn.query(
          "SELECT * FROM flights WHERE `from` = ? AND `to` = ? AND `date` = ? AND `booked` <= ? ORDER BY `date`",
          [AC, DC, RD, 50 - PAX],
          function (err, rowsYtoX) {
            if (err) throw err
            res.render('results', {
              data: {'rowsXtoY': rowsXtoY, 'rowsYtoX': rowsYtoX, PAX:PAX}
            })
          }
        )
      } else {
        res.render('results', {
          data: {'rowsXtoY': rowsXtoY, 'rowsYtoX': null, PAX:PAX}
        })
      }
    }
  )
}

/**
 * PUT /tax/:id
 */
exports.taxPut = function (req, res) {
  let amount = Number(req.body.amount)
  let tax = Number(req.body.tax)
  var currency = req.body.currency
  var result = amount + amount * tax / 100
  conn.query('UPDATE taxes SET amount=?, tax=?, result=?, currency=? WHERE id = ?',
    [amount, tax, result, currency, req.params.id],
    function (err, rows) {
      if (err) throw err

      res.render('json', {
        layout: false,
        data: {'msg': 'Record ' + req.params.id + ' Updated'}
      })
    })
}

/**
 * DELETE /tax/:id
 */
exports.taxDelete = function (req, res) {
  conn.query('DELETE FROM taxes WHERE id = ?',
    [req.params.id],
    function (err, rows) {
      if (err) throw err

      res.status(200).json({'msg': 'ID: ' + req.params.id + ' Deleted'})
    })
}

/**
 * POST /tax
 */
exports.taxPost = function (req, res) {
  req.assert('amount', 'Amount cannot be blank').notEmpty()
  req.assert('tax', 'Tax cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('error', errors)
    return res.redirect('/')
  }

  let amount = Number(req.body.amount)
  let tax = Number(req.body.tax)
  var record = {
    amount: amount,
    tax: tax,
    currency: req.body.currency,
    result: amount + amount * tax / 100,
    created: df(new Date(), 'yyyy-mm-dd HH:MM:ss')
  }

  conn.query('INSERT INTO taxes SET ?', record, function (err, row) {
    if (err) throw err

    res.status(200).json({'msg': 'New Record Added. ID: ' + row.insertId})
  })
}
