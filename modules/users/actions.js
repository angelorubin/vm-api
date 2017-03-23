'use strict'

/**
 *
 * Requsição do Model
 * 
 */
const userModel = require('./model')

/**
 * 
 */
const cb = (err, data, res) => {

    if (err) return console.log(err)

    return res.json(data)
}

const actions = {}

actions.list = (req, res) => {

	const query = {}

	userModel.find(query, (err, data) => {

		cb(err, data, res)

	})

}

actions.consult = (req, res) => {

	const query = { _id : req.params.id }

	userModel.findOne(query, (err, data) => {

		cb(err, data, res)

	})

}

actions.change = (req, res) => {

	const query = { _id : req.params.id }

	userModel.findById(query, function(err, data) {

		data.password = req.body.password

		data.save( (err, data) => {

            cb(err, data, res)
        
        })	

	})
}

actions.delete = (req, res) => {

	const query = { _id : req.params.id } 

	userModel.findByIdAndRemove(query, (err, data) => {

		cb(err, data, res)

	})

}

actions.register = (req, res) => {
	
	const body = req.body

    const user = new userModel(body)

    user.save( (err, data) => {
        cb(err, data, res)
    })

}

module.exports = actions