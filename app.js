const createError = require('http-errors');
const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const config = require('./config');
const fs = require('fs');

const app = express();

app.use(sassMiddleware({
    /* Options */
    src: 'scss',
    dest: 'public',
    debug: true,
    outputStyle: 'extended',
    // prefix:  '/prefix'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (!fs.existsSync(config.data)) {
    fs.writeFileSync(config.data, JSON.stringify({ "blocks": [] }));
}
if (!fs.existsSync(config.settings)) {
    fs.writeFileSync(config.settings, JSON.stringify({"bg":"/images/bg8.jpg", "theme": "blue", "blocksWrapperTop": "5%", "blocksWrapperDirection": "row", "iconSize": "40px", "fontSize": "12px"}));
}

fs.chmodSync(config.data, '777');
fs.chmodSync(config.settings, '777');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
