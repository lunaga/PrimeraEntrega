const express = require('express')
const api = express.Router()
const autenticacion = require('../../controllers/authController')

api.post('/', (req, res) => {
    global.userAuth = autenticacion(req.body.user)
    global.userAuth && res.redirect('./productos.html')
})

module.exports = api