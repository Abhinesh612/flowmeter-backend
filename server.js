const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path =  require('path')
const Cred = require('./database/config/vault')
const User = require('./database/schemas/userSchema')

const app = express()
const PORT = process.env.PORT || 3500

// CORS --Very Improtant
const whiteList = ['https://www.google.com', 'http://localhost:5173', 'http://localhost:3500']
const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
// app.use(cors())


app.use((req, res, next) => {
	console.log(`${req.method}\t${req.path}`)
	next()
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())


// password in @user password not @Account passowrd 
const DB = "flowmeter"
const uri = `mongodb+srv://abhinesh612:${Cred.password}@startup-1.lxa5rir.mongodb.net/${DB}?retryWrites=true&w=majority&appName=AtlasApp`

mongoose.connect(uri) 
	.then(() => console.log("Mongodb Connected")) 
	.catch((e) => console.error(e))


app.get('/apple', (req, res) => {
	res.json({greet: 'Hello World'})
})

app.use('/', require(path.join(__dirname, 'routes', 'Units')))
app.use('/', require(path.join(__dirname, 'routes', 'Register')))
app.use('/', require(path.join(__dirname, 'routes', 'Login')))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
