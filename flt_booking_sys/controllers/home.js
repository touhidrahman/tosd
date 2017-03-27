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
  let DC = req.query.DC // dept city
  let AC = req.query.AC // arrival city 
  let DD = req.query.DD // dept date
  let RD = req.query.RD // return date 
  let TT = req.query.TT // trip type (round or one way)
  let PA = Number(req.query.PA) // Passengers adult
  let PC = Number(req.query.PC) // Passengers child
  let PI = Number(req.query.PI) // Passengers infant
  let PAX = PA + PC + PI
  conn.query(
    'SELECT * FROM flights WHERE `dep` = ? AND `arr` = ? AND `dt` = ? AND `booked` <= ? ORDER BY `dt`', [DC, AC, DD, 50 - PAX],
    function (err, rowsXtoY) {
      if (err) throw err
      // if (RD != '' || TT == "RT") { // autocheck return date supplied
      if (TT == 'RT') {
        // return flight is also requested, so search 
        conn.query(
          'SELECT * FROM flights WHERE `dep` = ? AND `arr` = ? AND `dt` = ? AND `booked` <= ? ORDER BY `dt`', [AC, DC, RD, 50 - PAX],
          function (err, rowsYtoX) {
            if (err) throw err
            res.render('results', {
              data: {
                'rowsXtoY': rowsXtoY,
                'rowsYtoX': rowsYtoX,
                'PAX': PAX
              }
            })
          }
        )
      } else {
        res.render('results', {
          data: {
            'rowsXtoY': rowsXtoY,
            'rowsYtoX': null,
            'PAX': PAX
          }
        })
      }
    }
  )
}

/**
 * POST /book
 */
exports.postBookFlight = function (req, res) {
  req.assert('pax', 'Passengers cannot be 0').notEmpty()
  req.assert('id', 'Flight ID cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    req.flash('error', errors)
    return res.redirect('/')
  }

  let id = Number(req.body.id)
  let pax = Number(req.body.pax)
  var record = {
    flight_id: id,
    pax: pax,
    created: df(new Date(), 'yyyy-mm-dd HH:MM:ss')
  }

  conn.query('UPDATE flights SET `booked` = `booked` + ? WHERE `id` = ?', [pax, id], function (err, row) {
    if (err) throw err
    conn.query('INSERT INTO reservations SET ?', record, function (err, result) {
      if (err) throw err
      // req.flash('success', {msg: "Flight booked!"})
      return res.status(200).json({msg: 'Flight booked!', reservationId: result.insertId })
    })
  })
}

/**
 * GET /travel-details/:id
 */
exports.getTravelDetails = function (req, res) {
  const id = req.params.id

  conn.query(
    'SELECT f.*, r.created, r.pax FROM flights f, reservations r WHERE r.flight_id = f.id AND r.id = ?', [id],
    function (err, det) {
      if (err) throw err
      res.render('itenirary', {
        data: {
          'det': det
        }
      })
    }
  )
}
