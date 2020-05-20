
const articlesJSON = require('../data/articles.json')
const ticketShopJSON = require('../data/ticketshop-configuration.json')

function getArticles() {
    const articles = ticketShopJSON.articleConfiguration[0].articleWhitelist
    const articleArray = []
    articles.map(articleID => {
        articlesJSON.map(object => {
            if(object.Code === articleID){
                // console.log(object)
                articleArray.push(object)
            }
        })
        
    })
    return articleArray

}

module.exports = { getArticles }