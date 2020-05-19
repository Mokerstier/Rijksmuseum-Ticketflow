const getter = require('./getter.js')

function getFirstStep( req, res) {
    const articles = getter.getArticles()
    console.log(articles)
    res.render('pages/firstStep.ejs', {
        title: 'Tickets',
        articles: articles
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