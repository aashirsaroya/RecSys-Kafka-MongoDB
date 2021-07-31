const express = require('express')
require('./db/mongoose')
const userPurchaseRouter = require('./routers/producer')
const resultsRouter = require('./routers/results')
const cookieParser = require('cookie-parser')


const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use(cookieParser())

app.use(userPurchaseRouter)

app.use(resultsRouter)
//app.user(userViewedRouter)

app.listen(port, () => console.log('Server is up on port ' + port))