const getter = require('./getter.js')
const ticketShopJSON = require('../data/ticketshop-configuration.json')

function getFirstStep( req, res) {
    const articles = getter.getArticles()
    console.log(articles)
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    res.render('pages/firstStep.ejs', {
        title: 'Tickets',
        articles: articles,
        ticketShop: ticketConfiguration
    })
}

function getSecondStep(req, res) {
    res.render('pages/secondStep.ejs', {
        title: 'Extra opties'
    })
}

function getThirdStep(req, res) {
    res.render('pages/thirdStep.ejs', {
        title: 'Persoonsgegevens'
    })
}



module.exports = {
    getFirstStep,
    getSecondStep,
    getThirdStep
}