const express = require('express');
const api = express.Router();
module.exports = api
const { createCart, locateCart, addToCart, showCart, emptyCart, removeProduct, addToCartAlt } = require('./../../controllers/cartController')

// Rutas API/CARRITO/

//Crear carrito y agregar producto
api.post('/', (req, res) => {
    if (!req.body.id) { // Consulto si tiene id
        createCart(req.body.id) // Creo el Carrito
            .then(myCart => {
                addToCart(myCart, req.body) // Agrego los productos al carrito
                    .then(idNewCart => res.send({ id: idNewCart })) // Devuelvo el nuevo id - a sendProduct en functions.js
            })
    } else { // Busco el carrito donde ingresar el nuevo producto sin generar id
        locateCart(req.body.id)
            .then(myCart => {
                addToCart(myCart, req.body)
                    .then(res.send({ task: 'complete' }))
            })
    }
})
// Borrar Carrito
api.delete('/:id', (req, res) => {
    emptyCart(req.params)
        .then(result => res.send({ status: result }))
})
// Obtener productos
api.route('/:id/productos')
    .get((req, res) => {
        showCart(req.params)
            .then(result => res.send(result.productos))
            .catch(result => res.send({ error: 'no hay carrito' }))
    })
    // Agregar producto
    .post((req, res) => {
        const { id: id_cart } = req.params
        const { id: id_prod } = req.body
        addToCartAlt(id_cart, id_prod)
            .then(result => res.send({ status: result }))
    })
// Borrar producto
api.delete('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params
    removeProduct(id, id_prod)
        .then(result => res.send({ status: result }))
})