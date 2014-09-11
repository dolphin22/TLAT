var mongoose = require('mongoose')
,	Schema = mongoose.Schema

var regionSchema = Schema({
	name: String,
	abbreviation: String,
	active: { type: Boolean, default: true },
	instances: [{ type: Schema.Types.ObjectId, ref: 'Instance' }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
})

var instanceSchema = Schema({
	name: String,
	abbreviation: String,
	active: { type: Boolean, default: true },
	_region: { type: Number, ref: 'Region' },
	createdAt: { type: Date, default: Date.now },
	updatedAt: Date,
})

var Region = mongoose.model('Region', regionSchema)
var Instance = mongoose.model('Instance', instanceSchema)


module.exports = {
	Region: Region,
	Instance: Instance,
}