const express = require('express')
const prince = require('prince-promise')
const app = express()
const util   = require("util")
const port = 8080

app.set('title', 'HTML Reports using Prince')
app.set('view engine', 'pug')
app.set('views', 'views')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/generate_report/:title', (req, res) => {
  app.render('example', req.params, (err, html) => {
    prince(html).then((pdf) => {
      res.format({
        'application/pdf' () {
          res.send(pdf)
        }
      })
    }).catch((error) => console.log(error))
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
