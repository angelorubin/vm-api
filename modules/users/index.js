'use strict'

const router = require('./routerExpress')

const actions = require('./actions')

const routes = require('./routes')(actions)

const Router = require('./routesExpress')(routes, router)

module.exports = Router
