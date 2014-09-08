var mongoose = require('mongoose')
,	Schema = mongoose.Schema

var regionSchema = Schema({
	name: String,
	abbreviation: String,
	active: { type: Boolean, default: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
})

module.exports = mongoose.model('Region', regionSchema)