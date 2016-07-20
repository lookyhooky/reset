const express = require('express')
const app = express()

const scheduler = require('./routers/scheduler')

app.use(express.static('public'))

app.use('/scheduler', scheduler)

app.listen(3000, function () {
  console.log('listening on port 3000')
})
