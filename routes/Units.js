const express = require('express')
const Unit = require('../database/schemas/unitSchema')

const router = express.Router()

/**
 * @TODO: Remove _id from the query
 * @TODO: Sort with Date (createdAt)
 */
router.get('/units', async(req, res) => {
	const {id, email} = req.query
	if (!id || !email) {
		return res.status(400).json({'message': 'ID and Email are required'})
	}
	const unit = await Unit.find({flow_meter_id: id, email: email}).select(['flow_meter_id', 'flowValue', 'createdAt'])
	const result = {unit}
	res.json(unit)
})

router.get('/units/all', async(req, res) => {
	const {email} = req.query
	if (!email) {
		return res.status(400).json({'message': 'Email are required'})
	}

	const unit = await Unit.find({email: email}).select(['flow_meter_id', 'flowValue', 'createdAt'])
	const result = {unit}
	res.json(unit)
})

router.get('/units/latest', async(req, res) => {
	const {id, email} = req.query
	if (!id || !email) {
		return res.status(400).json({'message': 'ID and Email are required'})
	}
	const unit = await Unit.findOne({flow_meter_id: id, email: email}, {sort: { createdAt: -1 } }).select(['flow_meter_id', 'flowValue', 'createdAt'])
	const result = {unit}
	res.json(unit)
})


module.exports = router

