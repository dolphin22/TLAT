var Models = require('./models/ticket')

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
	
	// region
	app.get('/api/regions', function (req, res) {
		Models.Region.find(function (err, regions) {
			if (err)
				res.send(err)
			
			res.json(regions)
		})
	})
	
	app.get('/api/regions/:region_id', function (req, res) {
		Models.Region.findById(req.params.region_id, function (err, region) {
			if (err)
				res.send(err)
			
			res.json(region)
		})
	})
	
	app.post('/api/regions', function (req, res) {
		var region = new Models.Region()
		
		region.name = req.body.name
		region.abbreviation = req.body.abbreviation
		region.active = req.body.active
		region.updatedAt = region.createdAt
		
		region.save(function (err) {
			if (err)
				res.send(err)
			
			res.json({ message: 'Region added', data: region })
		})
	})
	
	app.put('/api/regions/:region_id', function (req, res) {
		var now = new Date()
		
		Models.Region.findById(req.params.region_id, function (err, region) {
			if (err)
				res.send(err)
				
			region.name = req.body.name
			region.abbreviation = req.body.abbreviation
			region.active = req.body.active
			region.updatedAt = now
			
			region.save(function (err) {
				if (err)
					res.send(err)
				
				res.json(region)
			})
		})
	})
	
	app.delete('/api/regions/:region_id', function (req, res) {
		Models.Region.findByIdAndRemove(req.params.region_id, function (err) {
			if (err)
				res.send(err)
				
			res.json({ message: 'Region deleted!' })
		})
	})
	
	// instance
	app.get('/api/instances', function (req, res) {
		Models.Instance.find(function(err, instances) {
			if (err)
				res.send(err)
				
			res.json(instances)
		})
	})
	
	app.post('/api/instances', function (req, res) {
		var instance = new Models.Instance()
		var region = Models.Region.findById(req.body.region_id)
		instance.name = req.body.name
		instance.abbreviation = req.body.abbreviation
		instance._region = region._id
		instance.active = req.body.active
		
		instance.updatedAt = instance.createdAt
		
		instance.save(function (err) {
			if (err)
				res.send(err)
				
			res.json({ message: 'Instance added', data: instance })
		})
	})
	
	app.delete('/api/instances/:instance_id', function (req, res) {
		Models.Instance.findByIdAndRemove(req.params.instance_id, function (err) {
			if (err)
				res.send(err)
			
			res.json({ message: "Instance deleted" })
		})
	})
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next()
		
	res.redirect('/')
}