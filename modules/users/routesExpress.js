'use strict'

module.exports = (routes, router) => {

	routes.forEach( (route, index) => {
		router[route.method](route.path, route.action)
	})

	return router

}