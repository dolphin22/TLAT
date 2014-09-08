var express = require('express')
,	app	= express()
,	port = process.env.PORT || 3000
,	mongoose = require('mongoose')
,	passport = require('passport')
,	flash = require('connect-flash')

var morgan = require('morgan')
,	cookieParser = require('cookie-parser')
,	bodyParser = require('body-parser')
,	session = require('express-session')

var database = require('./config/database')

mongoose.connect(database.url)

require('./config/passport')(passport)

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'ejs')

app.use(session({ secret: 'gesmtlat2014bydolphin' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./app/routes')(app, passport)

app.listen(port)
console.log('Server is running on port ' + port)