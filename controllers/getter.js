const fs = require("fs");
const csv = require("csv-parser");
const articles = [];

function getArticles() {
  fs.createReadStream("./data/articles.csv")
    .pipe(csv())
    .on("data", function (row) {
      const article = {
        code: row.Code,
        firstname: row.PriceCent,
        name: row.Name,
        mandatory: row.Mandatory,
        language: row.Language,
        description: row.Description,
      };
      articles.push(article);
    })
    .on("end", function () {
      console.table(articles);
      // TODO: SAVE users data to another file
    });
}

module.exports = { getArticles }