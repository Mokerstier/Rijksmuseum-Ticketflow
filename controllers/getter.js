const articlesJSON = require('../data/articles.json')
const ticketShopJSON = require('../data/ticketshop-configuration.json')

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

function getAditional() {
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

module.exports = {
    getArticles,
    getDonation,
    getAditional
}