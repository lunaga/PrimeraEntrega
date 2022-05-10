const router = function (express, app) {

    const productos = require('./routes/productos')
    const carrito = require('./routes/carrito')
    const auth = require('./routes/autenticacion')

    app.use('/api/productos', productos)
    app.use('/api/carrito', carrito)
    app.use('/auth', auth)

}
module.exports = router