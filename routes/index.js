function routes(){
    const exRoutes = require('express').Router()
    const render = require('../controllers/render')

    exRoutes
        .get('/', render.getHome)


    return exRoutes
}

exports.routes = routes()