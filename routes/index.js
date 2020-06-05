function routes() {
    const exRoutes = require('express').Router()
    const render = require('../controllers/render')
    const getter = require('../controllers/getter')

    exRoutes
        .get('/', render.getFirstStep)
        .get('/tweede-stap', render.getSecondStep)
        .get('/derde-stap', render.getThirdStep)
        
        // No javascript on client
        .get('/derde-stap-datum', render.getThirdStepDate)
        .get('/derde-stap-dag', render.getThirdStepDay)
        .get('/derde-stap-tijd', render.getThirdStepTime)

        .get('/vierde-stap', render.getFourthStep)
        .get('/vijfde-stap', render.getFifthStep)
        .get('/zesde-stap', render.getSixthStep)
        .get('/getExpoPeriod/:id/:count', getter.getExpoData)

    return exRoutes
}

exports.routes = routes()