const getter = require('./getter.js')
const ticketShopJSON = require('../data/ticketshop-configuration.json')

function getFirstStep(req, res) {
    const articles = getter.getArticles()
    console.log(articles)
    const variantContent = ticketShopJSON.variantContent[0]
    const articleConfiguration = ticketShopJSON.articleConfiguration[0]
    res.render('pages/firstStep.ejs', {
        title: 'Tickets',
        articles: articles,
        variantContent: variantContent,
        articleConfiguration: articleConfiguration
    })
}

function getSecondStep(req, res) {
    const expositionContents = ticketShopJSON.expositionConfiguration[0].expositionContents
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    const articlesDonation = getter.getDonation()
    const articlesAdditional = getter.getAdditional()
    console.log(articlesDonation)
    //console.log(expositionContents)
    //console.log(articlesAdditional)
    res.render('pages/secondStep.ejs', {
        title: 'Extra opties',
        expositionContents: expositionContents,
        ticketShop: ticketConfiguration,
        DonationOptions: articlesDonation,
        articlesAdditional: articlesAdditional
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