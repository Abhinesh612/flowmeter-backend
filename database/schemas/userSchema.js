const mongo = require('mongoose')

const userSchema = new mongo.Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	hash: {
		type: String,
		required: true,
	},
})

module.exports = mongo.model("User", userSchema)
