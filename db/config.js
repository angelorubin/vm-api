'use strict'

const mongoose = require('mongoose')

const userSenha = 'angelorubin:master77'

const ds = '@ds019816.mlab.com'

const dev = 'virginia-modas-dev'

const dbURI = `mongodb://${userSenha}${ds}:19816/${dev}`


mongoose.connect(dbURI)

const db = mongoose.connection

db.on('connected', () => console.log(`Mongoose default connection open to ${ dbURI }`))

db.on('error', err => console.log(`Mongoose connection error: ${ err }`))

db.on('disconnected', () => console.log(`Mongoose default connection disconnected.`))

db.once('open', () => console.log('Mongoose default connection is open.'))

process.on('SIGINT', () => {
	mongoose.connection.close( () => {
		console.log('Mongoose default connection disconnected through app termination.')
		process.exit(0)
	})
})

module.exports = db