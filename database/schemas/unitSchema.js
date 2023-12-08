const mongo = require('mongoose')

const unitSchema = new mongo.Schema({
	flow_meter_id: {
		type: Number,
		required: true,
		immutable: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		immutable: true,
	},
	flowValue: {
		type: Number,
		required: true,
		immutable: true,
	},
	organization: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
})

module.exports = mongo.model("Unit", unitSchema)
