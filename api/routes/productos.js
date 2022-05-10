const express = require('express');
const api = express.Router();
module.exports = api
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const validation = require('../../controllers/validation')

//? Carga de métodos
const Contenedor = require('../../controllers/productController');
const path = './public/productos.json'
const productos = new Contenedor(path)

//? Errores ====================================================================

const errors = require('../../controllers/errorController')

//? Middleware =================================================================

api.use(function (req, res, next) {
    if (req.body.editMode === 'modify') { req.method = 'PUT' }
    if (req.body.editMode === 'delete') { req.method = 'DELETE' }
    req.body = validation(req.body)
    next()
})

//? Rutas API/PRODUCTOS/ =======================================================

api.get('/:id?', (req, res) => {
    global.userAuth
        ? (req.params.id
            ? productos.getById(req.params.id)
                .then(result => res.send(result || { error: 'Producto inexistente' }))
                .catch(() => res.send({ error: 'Hubo problemas con la DB' }))
            : productos.getAll()
                .then(result => {
                    let withAuth = []
                    result.map(res => {
                        let temp = { ...res, auth: global.userAuth }
                        withAuth.push(temp)
                    })
                    res.send(withAuth)
                })
                .catch(() => res.send({ error: 'Hubo problemas con la ruta' })))
        : res.send(errors('auth', req.baseUrl, req.method))
})

api.post('/', (req, res) => {
    if (global.userAuth === 1) {
        req.body = {
            id: uuidv4(),
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)'),
            ...req.body
        }
        productos.addProduct(req.body)
            .then((result) => {
                if (result === 'ok') { res.redirect('../exito.html') }
                else { res.redirect('../error.html') }
            })
    }
    else {
        res.send(errors('auth', req.baseUrl, req.method))
    }
})

api.route('/:id')

    .put((req, res) => {
        if (global.userAuth === 1) {
            productos.modifyProduct(req.body)
                .then((result) => {
                    if (result === 'ok') { res.redirect('../../exito.html') }
                    else (res.redirect('../../error.html'))
                })
        }
        else {
            res.send(errors('auth', req.baseUrl, req.method))
        }
    })

    .delete((req, res) => {
        if (global.userAuth === 1) {
            productos.deleteProduct(req.body)
                .then((result) => {
                    if (result === 'ok') { res.redirect('../../exito.html') }
                    else (res.redirect('../../error.html'))
                })
        }
        else {
            res.send(errors('auth', req.baseUrl, req.method))
        }
    })