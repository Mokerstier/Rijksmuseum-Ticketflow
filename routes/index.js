function routes() {
    const exRoutes = require('express').Router()
    const render = require('../controllers/render')

    exRoutes
        .get('/', render.getFirstStep)
        .get('/tweede-stap', render.getSecondStep)
        .get('/derde-stap', render.getThirdStep)
        .get('/vierde-stap', render.getFourthStep)

    return exRoutes
}

exports.routes = routes()