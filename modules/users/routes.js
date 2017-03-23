'use strict'

module.exports = (actions) => {

	const routes = [
		{
		    method: 'get',
		    path : '/',
		    action: actions.list
		}, 
		{
		    method: 'get',
		    path : '/:id',
		    action: actions.consult
		},
		{
			method : 'put',
			path : '/:id',
			action : actions.change
		},
		{
			method : 'delete',
			path : '/:id',
			action : actions.delete
		},
		{
			method : 'post',
			path : '/',
			action : actions.register
		}
	]

	return routes

}