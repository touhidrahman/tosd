const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

// Load environment variables from .env file
dotenv.load();

// Controllers
const HomeController = require('./controllers/home');

const app = express();


const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function (a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON: function (object) {
      return JSON.stringify(object);
    },
    dateFormat: require('handlebars-dateformat')
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', HomeController.index);
app.get('/search', HomeController.getFlights);
app.get('/travel-details/:id', HomeController.getTravelDetails);
app.post('/book', HomeController.postBookFlight);


// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
