const cartId = localStorage.getItem('myIdCart')
const $container = document.getElementById('productos-container')
const $subtotal = document.getElementById('subtotal')
const $impuesto = document.getElementById('impuesto')
const $envio = document.getElementById('envio')
const $total = document.getElementById('total')
//Obtener productos


fetch(`./api/carrito/${cartId}/productos`)
    .then(res => res.json())
    .then(data => {
        if (localStorage.getItem('user')) {
            showProducts(data, $container)
            reduce(data, $subtotal, $impuesto, $envio, $total)
        } else {
            showError($container, cartId)
        }
    })