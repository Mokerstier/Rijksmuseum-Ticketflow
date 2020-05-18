const express = require('express')
const { routes } = require('./routes/index.js')

const config = {
    PORT: process.env.PORT || 3000
  }

const app = express()

app
    .use(express.static('static'))
    .use('/', routes)

    .set('view engine', 'ejs')

app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}`))