const getter = require('./getter.js')
const ticketShopJSON = require('../data/ticketshop-configuration.json')
const articlesData = require('../data/articles.json')
let ticketChoice = null
let ticketDefault = []
let groupChoice = ""
let expoChoice
let monthChoice
let dayChoice
let totalPrice = ''
let totalPriceRawThree
let startTimeChoice = null
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
let totalPriceRawFour
let totalPriceRawFive
let totalPriceFour
let totalPriceFive

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
    firstName = ''
    lastName = ''
    tussenName = ''
    email = ''
    zipCode = ''
    acceptTerms = "off"
    country = ''

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


    if (req.query.ticketType) {
        ticketCount = getter.getTicketCount(req, res)
        ticketChoice = req.query.ticketType
    }
    if (req.query.ticketChoice) {
        ticketChoice = req.query.ticketChoice
    }
    javascript = req.query.javascript
    if (req.query.totalPrice) {
        totalPrice = req.query.totalPrice
        totalPriceRawThree = totalPrice.split('€').join('').split('.').join('')
    } else {
        const ticketIDThree = ticketShopJSON.articleConfiguration[0].articleWhitelist
        let ticketSelectedArrayIdAndNumberThree = []
        for (let i = 0; i < ticketIDThree.length; i++) {
            let ticketObjectThree = {}
            if (Number(ticketChoice[i]) > 0) {
                ticketObjectThree["id"] = ticketIDThree[i]
                ticketObjectThree["number"] = Number(ticketChoice[i])
                ticketSelectedArrayIdAndNumberThree.push(ticketObjectThree)
            }
        }
        let newArray = []
        ticketSelectedArrayIdAndNumberThree.map(object => {
            articlesData.map(article => {
                if (article.Code == object.id) {
                    newArray.push((Number(article.PriceCent) * Number(object.number)))
                }
            })
        })
        totalPriceRawThree = newArray.reduce((a, b) => {
            return a = a + b
        })
        totalPrice = `€${(totalPriceRawThree / 100).toFixed(2)}`
    }




    const availableExpoId = getter.getAllUnavailableExpoId(ticketCount)


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
        expoChoice: expoChoice,
        availableExpoId: availableExpoId,
        totalPrice: totalPrice,
        totalPriceRaw: totalPriceRawThree,
        startTimeChoice: startTimeChoice
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

    if (req.query.ticketOption) {
        expo = req.query.ticketOption.split(',')
        expoChoice = expo[0]

        if (expo[3] == "fixed") {
            totalPriceRawFour = Number(expo[2]) + Number(totalPriceRawThree)

        } else {
            totalPriceRawFour = (Number(expo[2]) * Number(ticketCount)) + Number(totalPriceRawThree)

        }
        totalPriceFour = `€${parseFloat(totalPriceRawFour / 100).toFixed(2)}`
    }

    res.render('pages/monthStep.ejs', {
        groupChoice: groupChoice,
        title: 'Kies een maand',
        ticketCount: ticketCount,
        expoID: expoID,
        expoName: expoName,
        months: months,
        monthChoice: monthChoice,
        javascript: javascript,
        startTimeChoice: startTimeChoice
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
        javascript: javascript,
        startTimeChoice: startTimeChoice
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
        javascript: javascript,
        startTimeChoice: startTimeChoice

    })
}

function getFourthStep(req, res) {
    const expositionContents = ticketShopJSON.expositionConfiguration[0].expositionContents
    const ticketConfiguration = ticketShopJSON.variantContent[0]
    const articlesDonation = getter.getDonation()
    const articlesAdditional = getter.getAdditional()
    let expo = []
    // req.query.ticketOption.split(',')
    // 0 = expoName
    // 1 = expoID
    // 2 = expoPrice
    // 3 = expoPriceType
    if (req.query.ticketOption) {
        expo = req.query.ticketOption.split(',')
        expoChoice = expo[0]

        if (expo[3] == "fixed") {
            totalPriceRawFour = Number(expo[2]) + Number(totalPriceRawThree)

        } else {
            totalPriceRawFour = (Number(expo[2]) * Number(ticketCount)) + Number(totalPriceRawThree)

        }
        totalPriceFour = `€${parseFloat(totalPriceRawFour / 100).toFixed(2)}`
    }

    if (req.query.startTimeChoice) {
        expoPeriodIDChoice = req.query.startTimeChoice.split(',')
        startTimeChoice = expoPeriodIDChoice[0]
        expoPeriodIDChoice = expoPeriodIDChoice[1]
    }

    res.render('pages/fourthStep.ejs', {
        title: 'Extra opties',
        expositionContents: expositionContents,
        ticketShop: ticketConfiguration,
        DonationOptions: articlesDonation,
        articlesAdditional: articlesAdditional,
        groupChoice: groupChoice,
        ticketCount: ticketCount,
        formName: "dateTicketChoice",
        multiMediaChoice: Number(multiMediaChoice),
        donationChoice: donationChoice,
        javascript: javascript,
        totalPrice: totalPriceFour,
        totalPriceRaw: totalPriceRawFour,
        startTimeChoice: startTimeChoice
    })
}

function getFifthStep(req, res) {
    const ticketConfiguration = ticketShopJSON.variantContent[0]

    if (req.query.Multimediatour) {
        multiMediaChoice = req.query.Multimediatour.split(',')[0]
        donationChoice = req.query.Doneer
        const extras = req.query.Multimediatour.split(',')
        const donate = req.query.Doneer

        let totalExtra = (Number(extras[0]) * Number(extras[1])) + Number(donate)
        totalPriceRawFive = Number(totalPriceRawFour) + Number(totalExtra)
        totalPriceFive = `€${parseFloat(totalPriceRawFive / 100).toFixed(2)}`

    }
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
        country: country,
        startTimeChoice: startTimeChoice,
        totalPriceRaw: totalPriceRawFive,
        totalPrice: totalPriceFive
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
    const ticketID = ticketShopJSON.articleConfiguration[0].articleWhitelist
    let ticketSelectedArrayIdAndNumber = []
    for (let i = 0; i < ticketID.length; i++) {
        let ticketObject = {}
        if (Number(ticketChoice[i]) > 0) {
            ticketObject["id"] = ticketID[i]
            ticketObject["number"] = Number(ticketChoice[i])
            ticketSelectedArrayIdAndNumber.push(ticketObject)
        }
    }
    // const ticktsChoiceWithNames = ;
    res.render('pages/sixthStep.ejs', {
        title: 'Overzicht en betalen',
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
        country: country,
        totalPriceRawFive: totalPriceRawFive,
        donationChoice: donationChoice,
        multiMediaChoice: multiMediaChoice,
        startTimeChoice: startTimeChoice,
        expoChoice: expoChoice,
        ticketSelectedArrayIdAndNumber: ticketSelectedArrayIdAndNumber,
        ticketShopJSON: ticketShopJSON,
        articlesData: articlesData,
        totalPriceRawThree: totalPriceRawThree
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