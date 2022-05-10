// Carga de carrito
const fs = require('fs')
const cartPath = './public/carrito.json'
// Carga de elementos a incluir
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')


// Crear el carrito
class Carrito {
    constructor(producto) {
        this.id = uuidv4()
        this.timestamp = moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)')
        this.productos = []
    }
}

// Testeo existencia del carrito y lo Creo
const createCart = async (id) => {
    try {
        const cartList = await fs.promises.readFile(cartPath, 'utf-8')
            .then(res => JSON.parse(res))
        // Compruebo la inexistencia de nuevo para asegurarme de crearlo
        if (!cartList.some(prod => id === prod.id)) {
            const myCart = new Carrito()
            let newList = [...cartList, myCart]
            await fs.promises.writeFile(cartPath, JSON.stringify(newList, null, 2))
            return myCart // Envío el nuevo carro como MyCart
        }
    }
    catch {
        return ('no se encuentra la db')
    }
}

const locateCart = async (id) => {
    const cartList = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    // Busco el carrito en la db
    const myCart = cartList.find(cart => cart.id === id)
    return myCart
}

// Agregar producto
const addToCart = async function (carrito, producto) {

    let modProduct = await carrito.productos.find(prod => prod.id === producto.producto.id)
    if (modProduct) { modProduct.cantidad += producto.producto.cantidad }
    else { carrito.productos = [...carrito.productos, producto.producto] }
    // Cargo el carrito
    const myNewCart = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    // Creo el carrito temporal
    let tempCart = myNewCart.filter(cart => cart.id !== carrito.id)
    //Inserto el producto alterado nuevamente
    tempCart = [...tempCart, carrito]
    //Grabo el carrito modificado
    fs.promises.writeFile(cartPath, JSON.stringify(tempCart, null, 2))
    return carrito.id
}

const showCart = async (id) => {
    const carts = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    let myCart = carts.find(cart => cart.id === id.id)
    return myCart
}

const emptyCart = async (id) => {
    const cartList = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    const tempList = cartList.filter(cart => cart.id !== id.id)
    await fs.promises.writeFile(cartPath, JSON.stringify(tempList, null, 2))
    return 'deleted'
}

const removeProduct = async (id, id_prod) => {
    const tempCartsList = await fs.promises.readFile(cartPath)
        .then(res => JSON.parse(res))
    const tempCart = tempCartsList.find(cart => cart.id === id)
    if (tempCart.productos.some(prod => prod.id === id_prod)) {
        const tempProductList = tempCart.productos.filter(prod => prod.id !== id_prod)
        tempCart.productos = tempProductList // TempCart = Productos modificados
        let newCartsList = tempCartsList.filter(cart => cart.id !== tempCart.id)
        newCartsList = [...newCartsList, tempCart]
        await fs.promises.writeFile(cartPath, JSON.stringify(newCartsList, null, 2))
        return 'removed'
    }
}

const addToCartAlt = async (idcart, idprod) => {
    // Archivo cargado
    const tempFile = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    // Carrito seleccionado
    let tempCart = tempFile.find(cart => cart.id === idcart)
    // Producto modificado
    let tempProduct = tempCart.productos.find(prod => prod.id === idprod)
    tempProduct.cantidad++
    // Preparo el archivo modificado
    let newFile = tempFile.filter(cart => cart.id !== idcart)
    newFile = [...newFile, tempCart]
    //Guardo el archivo modificado
    fs.promises.writeFile(cartPath, JSON.stringify(newFile, null, 2))
    return 'added'
}


module.exports = { createCart, locateCart, addToCart, showCart, emptyCart, removeProduct, addToCartAlt, Carrito }