const getter = require('./getter.js')
const ticketShopJSON = require('../data/ticketshop-configuration.json')
let ticketChoice = null
let ticketDefault = []
let groupChoice = ""
let expoChoice
let monthChoice
let dayChoice
let totalPrice
let startTimeChoice
let ticketCount
let expoPeriodIDChoice
let multiMediaChoice
let donationChoice
let javascript
let firstName
let lastName
let tussenName
let email
let zipCode
let acceptTerms
let country

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
    javascript = req.query.javascript
    groupChoice = req.query.groupChoice
    ticketDefault = checkDefault()
    console.log('ticketDefault ' + ticketDefault)
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
        ticketDefault: ticketDefault,
        javascript: javascript
    })
}

function getThirdStep(req, res) {
    const expositionContents = ticketShopJSON.expositionConfiguration[0].expositionContents
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    const articlesDonation = getter.getDonation()
    const articlesAdditional = getter.getAdditional()

    totalPrice = req.query.totalPrice
    javascript = req.query.javascript

    if (req.query.Articles) {
        ticketChoice = req.query.Articles
        ticketCount = getter.getTicketCount(req, res)
    }
    if (req.query.ticketChoice) {
        ticketChoice = req.query.ticketChoice
    }



    console.log('TicketChoice ' + ticketChoice)
    res.render('pages/thirdStep.ejs', {
        title: 'Plan je bezoek',
        expositionContents: expositionContents,
        ticketShop: ticketConfiguration,
        DonationOptions: articlesDonation,
        articlesAdditional: articlesAdditional,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice",
        javascript: javascript,
        expoChoice: expoChoice
    })
}

function getThirdStepDate(req, res) {
    const ticketCount = req.query.totalTickets
    if (req.query.ticketOption) {
        expoName = getter.getExpoName(req, res)
        expoChoice = expoName
        expoID = getter.getExpoId(req, res)
        months = getter.getExpoMonth(ticketCount, expoID)
    }

    res.render('pages/monthStep.ejs', {
        groupChoice: groupChoice,
        title: 'Kies een maand',
        ticketCount: ticketCount,
        expoID: expoID,
        expoName: expoName,
        months: months,
        monthChoice: monthChoice,
        javascript: javascript
    })
}

function getThirdStepDay(req, res) {
    if (req.query.expoID) {
        expoID = req.query.expoID
        ticketCount = req.query.ticketCount
        expoName = req.query.expoName
        month = req.query.month
        monthChoice = month
        days = getter.getExpoDay(expoID, ticketCount, month)
    }

    const monthNames = {
        "0": "Januari",
        "1": "Februari",
        "2": "Maart",
        "3": "April",
        "4": "Mei",
        "5": "Juni",
        "6": "Juli",
        "7": "Augustus",
        "8": "September",
        "9": "Oktober",
        "10": "November",
        "11": "December",
    }

    res.render('pages/dayStep.ejs', {
        groupChoice: groupChoice,
        title: 'Kies een dag',
        ticketCount: ticketCount,
        expoID: expoID,
        expoName: expoName,
        monthNames: monthNames,
        month: month,
        days: days,
        dayChoice: dayChoice,
        javascript: javascript
    })
}

function getThirdStepTime(req, res) {
    const expoID = req.query.expoID
    const ticketCount = req.query.ticketCount
    const expoName = req.query.expoName
    const monthNumber = req.query.monthNumber
    const month = req.query.month
    const day = req.query.day
    dayChoice = day
    const expos = getter.getExpoTime(expoID, ticketCount, monthNumber, day)

    res.render('pages/timeStep.ejs', {
        groupChoice: groupChoice,
        title: 'Kies een tijdslot',
        ticketCount: ticketCount,
        expoID: expoID,
        expoName: expoName,
        expos: expos,
        month: month,
        day: day,
        expoPeriodIDChoice: expoPeriodIDChoice,
        javascript: javascript
    })
}

function getFourthStep(req, res) {
    const expositionContents = ticketShopJSON.expositionConfiguration[0].expositionContents
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    const articlesDonation = getter.getDonation()
    const articlesAdditional = getter.getAdditional()
    if (req.query.startTimeChoice) {
        expoPeriodIDChoice = req.query.startTimeChoice.split(',')
        expoPeriodIDChoice = expoPeriodIDChoice[1]
    }

    startTimeChoice = req.query.startTimeChoice


    res.render('pages/fourthStep.ejs', {
        title: 'Extra opties',
        expositionContents: expositionContents,
        ticketShop: ticketConfiguration,
        DonationOptions: articlesDonation,
        articlesAdditional: articlesAdditional,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice",
        multiMediaChoice: multiMediaChoice,
        donationChoice: donationChoice,
        javascript: javascript
    })
}

function getFifthStep(req, res) {
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    console.log(req.query)
    multiMediaChoice = req.query.Multimediatour
    donationChoice = req.query.Doneer

    res.render('pages/fifthStep.ejs', {
        title: 'Persoonlijke gegevens',
        ticketShop: ticketConfiguration,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice",
        javascript: javascript,
        firstName: firstName,
        lastName: lastName,
        tussenName: tussenName,
        email: email,
        zipCode: zipCode,
        acceptTerms: acceptTerms,
        country: country
    })
}

function getSixthStep(req, res) {
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    firstName = req.query.voornaam
    lastName = req.query.achternaam
    tussenName = req.query.tussenvoegsel
    email = req.query.email
    zipCode = req.query.postcode
    acceptTerms = req.query.acceptterms
    country = req.query.land
    res.render('pages/sixthStep.ejs', {
        title: 'Overzicht en betalen',
        ticketShop: ticketConfiguration,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice",
        javascript: javascript
    })
}




module.exports = {
    getFirstStep,
    getSecondStep,
    getThirdStep,
    getThirdStepDate,
    getThirdStepDay,
    getThirdStepTime,
    getFourthStep,
    getFifthStep,
    getSixthStep
}