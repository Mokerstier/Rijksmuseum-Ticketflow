const getter = require('./getter.js')
const ticketShopJSON = require('../data/ticketshop-configuration.json')
let ticketChoice = null
let ticketDefault = []
let groupChoice = ""

function checkDefault() {
    if (groupChoice === "small-group") {
        return ['0', '0', '0', '0', '0', '0']
    } else if (groupChoice === "family") {
        return ['2', '2', '0', '0', '0', '0']
    } else if (groupChoice === "date") {
        return ['2', '0', '0', '0', '0', '0']
    }
}

function getFirstStep(req, res) {
    ticketChoice = null
    res.render('pages/firstStep.ejs', {
        title: 'Kies je groep',
    })
}

function getSecondStep(req, res) {
    const articles = getter.getArticles()
    const variantContent = ticketShopJSON.variantContent[0]
    const articleConfiguration = ticketShopJSON.articleConfiguration[0]
    groupChoice = req.query.groupChoice
    ticketDefault = checkDefault()
    console.log(ticketDefault)
    if (groupChoice === "large-group") {
        res.redirect('https://www.rijksmuseum.nl/nl/groepsbezoek')
    }
    res.render('pages/secondStep.ejs', {
        title: 'Ticket keuze',
        articles: articles,
        variantContent: variantContent,
        articleConfiguration: articleConfiguration,
        groupChoice: groupChoice,
        formName: `${groupChoice}TicketChoice`,
        ticketChoice: ticketChoice,
        ticketDefault: ticketDefault
    })
}

function getThirdStep(req, res) {
    const expositionContents = ticketShopJSON.expositionConfiguration[0].expositionContents
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    const articlesDonation = getter.getDonation()
    const articlesAdditional = getter.getAdditional()
    if (req.query.Articles) {
        ticketChoice = req.query.Articles.a
    }
    if (req.query.ticketChoice) {
        ticketChoice = req.query.ticketChoice
    }
    ticketCount = req.query.totalTickets
    console.log(ticketChoice)
    res.render('pages/thirdStep.ejs', {
        title: 'Plan je bezoek',
        expositionContents: expositionContents,
        ticketShop: ticketConfiguration,
        DonationOptions: articlesDonation,
        articlesAdditional: articlesAdditional,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice"
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
        articlesAdditional: articlesAdditional,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice"
    })
}

function getFifthStep(req, res) {
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    res.render('pages/fifthStep.ejs', {
        title: 'Persoonlijke gegevens',
        ticketShop: ticketConfiguration,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice"
    })
}

function getSixthStep(req, res) {
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    res.render('pages/sixthStep.ejs', {
        title: 'Overzicht en betalen',
        ticketShop: ticketConfiguration,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice"
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