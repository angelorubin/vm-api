'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const _schema = {
	firstname : String,
	lastname : String,
	birthdate : {
		type : String
	},
	email : {
		type : String,
		unique : true
	}, 
	password : {
		type: String,
		required: true
	},
	cpf : String,
	rg : String,
	address : Array,
	status: {
		type : Boolean
	},
	created_at : {
		type : Date,
		default: Date.now
	}
}

const userSchema = new Schema(_schema)

userSchema.pre('save', function(next) {

    let user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
    	return next()
    }
    

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) { 
        	return next(err)
        }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
	    
    })
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
        	return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)