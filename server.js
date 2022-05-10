// Express
const express = require('express')
const app = express()
global.pathRoot = require('path')
// Config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Config Public
app.use(express.static('public'))

// Variable Global de permiso de Usuario
global.userAuth = 0

// Router/Api
const router = require('./api/api')
router(express, app)

//? Server ========================================

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Oyendo desde ${server.address().port} - http://localhost:${PORT}`)
})
server.on('error', error => console.log('ha habido un error: ', error))