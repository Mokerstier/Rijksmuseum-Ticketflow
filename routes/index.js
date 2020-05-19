function routes() {
    const exRoutes = require('express').Router()
    const render = require('../controllers/render')

    exRoutes
        .get('/', render.getFirstStep)
        .get('/tweede-stap', render.getSecondStep)
        .get('/deerde-stap', render.getThirdStep)

    return exRoutes
}

exports.routes = routes()