const articlesJSON = require('../data/articles.json')
const ticketShopJSON = require('../data/ticketshop-configuration.json')
const expositionPeriodsJSON = require('../data/expositions-periods.json')

function getArticles() {
    const articles = ticketShopJSON.articleConfiguration[0].articleWhitelist
    const articleArray = []
    articles.map(articleID => {
        articlesJSON.map(object => {
            if (object.Code === articleID) {
                // console.log(object)
                articleArray.push(object)
            }
        })

    })
    return articleArray
}

function getDonation() {
    const articles = ticketShopJSON.articleConfiguration[0].donationArticlesWhitelist
    const articleArray = []
    articles.map(articleID => {
        articlesJSON.map(object => {
            if (object.Code === articleID) {
                // console.log(object)
                if (object.Language === "NL") {
                    articleArray.push(object)
                }
            }
        })

    })
    return articleArray
}

function getAdditional() {
    const articles = ticketShopJSON.articleConfiguration[0].additionalArticlesWhitelist
    const articleArray = []
    articles.map(articleID => {
        articlesJSON.map(object => {
            if (object.Code === articleID) {
                // console.log(object)
                if (object.Language === "NL") {
                    articleArray.push(object)
                }
            }
        })

    })
    return articleArray
}

function getExpoData(req, res) {
    const id = req.params.id
    const count = req.params.count
    console.log("id", id)
    console.log("count", count)
    
    const data = expositionPeriodsJSON
    
    const filterData = data.filter(expo => {
        if (expo.ExpositionId === id && expo.RemainingTIckets >= count){
            return expo
        }
    })

    
    console.log(filterData)
    res.send(filterData)
    // return expositionPeriodsJSON
    
}

module.exports = {
    getArticles,
    getDonation,
    getAdditional,
    getExpoData
}