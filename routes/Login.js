const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../database/schemas/userSchema')

const router = express.Router()

router.post('/login', async (req, res) => {
	const {usr, pass} = req.body
	if (!usr || !pass) {
		return res.status(500).json({'message': 'User ID and password are required'})
	}
	
	const result = await User.findOne({email: usr})
	if (result === null) {
		return res.status(500).json({'message': 'Invalid User ID'})
	}
	const isSame = await bcrypt.compare(pass, result.hash)
	if (isSame) {
		res.json({'message': 'Login success'})
	} else {
		res.json({'message': 'Login failed'})
	}
})

module.exports = router
