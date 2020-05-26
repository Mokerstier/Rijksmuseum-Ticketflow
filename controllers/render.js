const getter = require('./getter.js')
const ticketShopJSON = require('../data/ticketshop-configuration.json')

function getFirstStep(req, res) {
    res.render('pages/firstStep.ejs', {
        title: 'Kies je groep',
    })
}

function getSecondStep(req, res) {
    const articles = getter.getArticles()
    const variantContent = ticketShopJSON.variantContent[0]
    const articleConfiguration = ticketShopJSON.articleConfiguration[0]
    const groupChoice = req.query.groupChoice
    if(groupChoice === "large-group"){
        res.redirect('https://www.rijksmuseum.nl/nl/groepsbezoek')
    } else {
        res.render('pages/secondStep.ejs', {
            title: 'Ticket keuze',
            articles: articles,
            variantContent: variantContent,
            articleConfiguration: articleConfiguration,
            groupChoice: groupChoice
        })
    }

}

function getThirdStep(req, res) {
    const expositionContents = ticketShopJSON.expositionConfiguration[0].expositionContents
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    const articlesDonation = getter.getDonation()
    const articlesAdditional = getter.getAdditional()
    res.render('pages/thirdStep.ejs', {
        title: 'Plan je bezoek',
        expositionContents: expositionContents,
        ticketShop: ticketConfiguration,
        DonationOptions: articlesDonation,
        articlesAdditional: articlesAdditional
    })
}

function getFourthStep(req, res) {
    const expositionContents = ticketShopJSON.expositionConfiguration[0].expositionContents
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    const articlesDonation = getter.getDonation()
    const articlesAdditional = getter.getAdditional()
    res.render('pages/fourthStep.ejs', {
        title: 'Extra opties',
            expositionContents: expositionContents,
            ticketShop: ticketConfiguration,
            DonationOptions: articlesDonation,
            articlesAdditional: articlesAdditional
    })
}

function getFifthStep(req, res) {
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    res.render('pages/fifthStep.ejs', {
        title: 'Persoonlijke gegevens',
        ticketShop: ticketConfiguration
    })
}

function getSixthStep(req, res) {
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    res.render('pages/sixthStep.ejs', {
        title: 'Overzicht en betalen',
        ticketShop: ticketConfiguration
    })
}




module.exports = {
    getFirstStep,
    getSecondStep,
    getThirdStep,
    getFourthStep,
    getFifthStep,
    getSixthStep
}