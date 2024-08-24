var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var createError = require('http-errors')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/Login');
var roomsRouter = require('./routes/getrooms'); // Include your rooms route
var addRoomRouter = require('./routes/addrooms')
var contactRouter = require('./routes/contact')
var bookingsRouter = require('./routes/bookings')
var adduserRouter = require('./routes/adduser')
var ReviewAndHistoryRouter = require('./routes/ReviewsAndHistory')
var employeesRouter = require('./routes/employees')

var app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/getusers', loginRouter);
app.use('/api/getrooms', roomsRouter);
app.use('/api/updateRoomStatus', roomsRouter);
app.use('/api/addrooms', addRoomRouter);
app.use('/api/contact', contactRouter);
app.use('/api/bookings', bookingsRouter)
app.use('/api/adduser', adduserRouter)
app.use('/api/review', ReviewAndHistoryRouter)
app.use('/api/employees', employeesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
