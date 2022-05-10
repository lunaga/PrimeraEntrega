//#  ID CARRITO
const idCart = localStorage.getItem('myIdCart')

// Total de carrito
const reduce = (products, $subtotal, $impuesto, $envio, $total) => {
    let subtotal = products.map(prod => prod.precio * prod.cantidad).reduce((subtotal, prod) => subtotal += prod)
    $subtotal.innerText = `$${subtotal}`
    let impuesto = subtotal * 0.21
    $impuesto.innerText = `$${impuesto.toFixed(2)}`
    let envio = 0
    $envio.innerText = `$${envio}`
    let total = subtotal + impuesto + envio
    $total.innerText = `$${total.toFixed(2)}`
}
// Mostrar productos
const showProducts = (products, container) => {

    let productos = document.createElement('div')
    productos.innerHTML = products.map(prod => `
                <div class="flex pb-4 border-neutral-20 border-b-2">
                    <div class="md:w-4/12 2xl:w-1/4 w-full">
                        <img src=${prod.foto} alt="Black Leather Bag" class="w-full h-full object-center object-cover" />
                    </div>
                    <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                        <p id="codigo" class="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">${prod.codigo}</p>
                        <div class="flex items-center justify-between w-full pt-1">
                            <p id="nombre" class="text-base font-black leading-none text-gray-800 dark:text-white my-4">
                                ${prod.nombre}
                            </p>
                        </div>
                        <p id="stock" class="text-xs leading-3 text-gray-600 dark:text-white pt-2">Stock: ${prod.stock}
                        </p>
                        <p id="stock" class="text-xs leading-3 text-gray-600 dark:text-white pt-2">Precio por unidad: $${prod.precio}
                        </p>
                        <p id="cantidad" class="text-xs leading-3 text-gray-600 dark:text-white py-4">Compra: ${prod.cantidad}
                        </p>
                        <p id="descripcion" class="w-96 text-xs leading-3 text-gray-600 dark:text-white">Descripcion:
                            ${prod.descripcion}
                        </p>
                        <div class="flex items-center justify-between pt-5">
                            <div class="flex itemms-center">
                                <p id="add" onclick="add('${prod.id}')"
                                    class="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">
                                    Agregar</p>
                                <p id="remove" onclick="remove('${prod.id}')" class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                                    Remover</p>
                            </div>
                            <p id="precio" class="text-base font-black leading-none text-gray-800 dark:text-white">
                                $${prod.precio * prod.cantidad}</p>
                        </div>
                    </div>
                </div>
    `).join('')
    container.append(productos)
}
// Mostrar error
const showError = (container, id) => {
    let error = document.createElement('div')
    error.innerHTML = `
            <div class="flex flex-col items-center w-full">
                <b>Error: -1 </b>
                <b>Ruta: ./api/carrito/${id}/productos</b>
                <b>Método: 'GET'</b>
                <b>Descripción: 'No autorizado'</b>
            </div>`
    container.append(error)
}
// Comprar - Vaciar carrito y borrarlo
const checkout = document.getElementById('checkout')
checkout.onclick = () => {
    fetch(`./api/carrito/${idCart}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.removeItem('myIdCart')
            location.href = './exito.html'
        })
}
//Remover producto
const remove = (id) => {
    fetch(`./api/carrito/${idCart}/productos/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => location.href = './carrito.html')
}
//Agregar producto
const add = (id) => {
    fetch(`./api/carrito/${idCart}/productos`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(() => location.href = './carrito.html')
}