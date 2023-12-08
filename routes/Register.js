const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../database/schemas/userSchema')

const router = express.Router()

const saltRounds = 10

router.post('/register', async (req, res) => {
	const {usr, pass} = req.body
	if (!usr || !pass) {
		res.status(400).json({'message': 'Both User ID and Password are needed'})
	}
	const result = await User.findOne({email: usr}).select(['email'])
	if (result !== null) {
		console.log('test not null: ' + result)
		return res.status(500).json({'message': 'User email alerady existed'})
	}

	const hash = await bcrypt.hash(pass, saltRounds)

	try {
		await User.create({email: usr, hash: hash})
	}catch(e) {
		console.error(e)
		return res.status(500).json({'message': 'Failed to Register'})
	}

	res.json({'message': 'Done'})
})

module.exports = router
