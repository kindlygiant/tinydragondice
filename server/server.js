//tinydragondice/server/server.js
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const productsRouter = require('./routes/products-route')

const PORT = process.env.PORT || 3001

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//Routes
app.use('/products', productsRouter)

//500
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke.')
})

//404
app.use(function (req, res, next) {
    res.status(404).send('OOPies No page found.')
})

//Start the app
app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`)
})