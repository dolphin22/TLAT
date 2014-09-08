var Region = require('./models/ticket')

module.exports = function (app, passport) {
	// homepage
	app.get('/', function (req, res) {
		res.render('index')
	})
	
	// login
	app.get('/login', function (req, res) {
		res.render('login', { message: req.flash('loginMessage') })
	})
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}))
	
	// signup
	app.get('/signup', function (req, res) {
		res.render('signup', { message: req.flash('signupMessage') })
	})
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}))
	
	// profile
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile', { user: req.user })
	})
	
	// logout
	app.get('/logout', function (req, res) {
		req.logout()
		res.redirect('/')
	})
	
	// ticket
	app.get('/api/regions', function (req, res) {
		Region.find(function (err, regions) {
			if (err)
				res.send(err)
			
			res.json(regions)
		})
	})
	
	app.post('/api/regions', function (req, res) {
		Region.create({
			name: req.body.name,
			abbreviation: req.body.abbreviation,
			active: req.body.active			
		})
	})
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next()
		
	res.redirect('/')
}