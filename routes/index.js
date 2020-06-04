function routes() {
    const exRoutes = require('express').Router()
    const render = require('../controllers/render')
    const getter = require('../controllers/getter')

    exRoutes
        .get('/', render.getFirstStep)
        .get('/tweede-stap', render.getSecondStep)
        .get('/derde-stap', render.getThirdStep)
        .get('/vierde-stap', render.getFourthStep)
        .get('/vierde-stap-datum', render.getFourthStepDate)
        .get('/vierde-stap-dag', render.getFourthStepDay)
        .get('/vierde-stap-tijd', render.getFourthStepTime)
        .get('/vijfde-stap', render.getFifthStep)
        .get('/zesde-stap', render.getSixthStep)
        .get('/getExpoPeriod/:id/:count', getter.getExpoData)

    return exRoutes
}

exports.routes = routes()