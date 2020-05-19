function getFirstStep(req, res) {
    res.render('pages/firstStep.ejs', {
        title: 'Tickets'
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