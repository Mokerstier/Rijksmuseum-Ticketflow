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
        if (expo.ExpositionId === id.toUpperCase() && expo.RemainingTIckets >= count){
            return expo
        }
    })

    
    // console.log(filterData)
    res.send(filterData)
    // return expositionPeriodsJSON
    
}

function getTicketCount(req, res){
    let ticketsCount = req.query.Articles.a
    console.log(ticketsCount)
    ticketsCount = ticketsCount.reduce((all, current) =>{
        all = Number(all) + Number(current)
        return all
    })
    return ticketsCount
}

function getExpoId(req, res){
    let expoNameID = req.query.ticketOption
    expoNameID = expoNameID.split(',')
    return expoNameID[1]
}
function getExpoName(req, res){
    let expoNameID = req.query.ticketOption
    expoNameID = expoNameID.split(',')
    return expoNameID[0]
}

function getExpoMonth(ticketCount, expoID){
    const data = expositionPeriodsJSON
    const dataToUse = []
    const filterData = data.filter(expo => {
        if (expo.ExpositionId === expoID.toUpperCase() && expo.RemainingTIckets >= ticketCount ){
            return expo
        }
    })
    dataToUse.push(filterData)
    function getUnique(data) {
        const uniqueArray = [];
  
        for (let value of data) {
          if (uniqueArray.indexOf(value) === -1) {
            uniqueArray.push(value);
          }
        }
        return uniqueArray;
      }
    const monthData = dataToUse[0].map((expo) => {
        const date = new Date(expo.PeriodStart);
        const month = date.getMonth();
        return month;
      });
      const uniqueMonthArray = getUnique(monthData);

          uniqueMonthArray.sort((a, b) => {
            return a - b;
          });

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
          };
          const getMonthNames = uniqueMonthArray.map((month) => {
            return monthNames[month];
          });
          const monthObjectsArray = []
          getMonthNames.map((month) => {

            for (let [key, value] of Object.entries(monthNames)) {
              if (value === month) {
                const monthObject = {
                    [key]: month
                }
                monthObjectsArray.push(monthObject)
              }
            }

          });
          return monthObjectsArray
}


function getExpoDay(expoID, ticketCount, monthNumber){
    const data = expositionPeriodsJSON
    const dataToUse = []
    const filterData = data.filter(expo => {
        const month = new Date(expo.PeriodStart).getMonth() 
        if (expo.ExpositionId === expoID.toUpperCase() && expo.RemainingTIckets >= ticketCount && month == monthNumber){
            return expo
        }
    })
    dataToUse.push(filterData)
    let daysArray = [];
    let dataToCheck = []
    dataToUse[0].map(expo =>{
        let date = new Date(expo.PeriodStart);
            const dayDate = date.getDate();

            date = String(date).split(" ");
            if (date[0] == "Sun") {
              date = "Zondag";
            } else if (date[0] == "Mon") {
              date = "Maandag";
            } else if (date[0] == "Tue") {
              date = "Dinsdag";
            } else if (date[0] == "Wed") {
              date = "Woensdag";
            } else if (date[0] == "Thu") {
              date = "Donderdag";
            } else if (date[0] == "Fri") {
              date = "Vrijdag";
            } else if (date[0] == "Sat") {
              date = "Zaterdag";
            }

            const day = {
              name: date,
              date: dayDate,
            };

            if (!dataToCheck.includes(dayDate)) {
                dataToCheck.push(dayDate);
                daysArray.push(day);
              }
            
    })
    return daysArray
}

module.exports = {
    getArticles,
    getDonation,
    getAdditional,
    getExpoData,
    getTicketCount,
    getExpoId,
    getExpoMonth,
    getExpoName,
    getExpoDay
}