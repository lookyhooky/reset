const express = require('express')
const logger = require('morgan')
const http = require('http')
const path = require('path')

const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

const root = require('./routers/root')
const scheduler = require('./routers/scheduler')

app.use(logger('short'))

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/', root)
app.use('/scheduler', scheduler)

http.createServer(app).listen(3000)
