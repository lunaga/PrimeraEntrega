// Products Functions
// All Pages
const error = (data, $div) => {

    let error = `
            <div class="flex flex-col items-center w-full">
                <b>Error: ${data.error}</b>
                <b>Ruta: ${data.ruta}</b>
                <b>Método: ${data.metodo}</b>
                <b>Descripción: ${data.descripcion}</b>
            </div>`
    $div.innerHTML = error
}
// Productos.html
const productList = (data, $div) => {
    let productos = data.map(producto =>
        `
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full hover:bg-zinc-200 content-center rounded-md transition duration-300 text-center">
                    <button onclick="getProduct('${producto.id}')" >
                        <a class="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" class="object-cover object-center w-full h-full block" src=${producto.foto}>
                        </a>
                        <a class="block relative rounded overflow-hidden">
                            <div class="mt-4">
                                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">cod: ${producto.codigo}</h3>
                                <h2 class="text-gray-900 title-font text-lg font-medium">${producto.nombre}</h2>                            
                                <p class="mt-1">$${producto.precio}</p>
                            </div>
                        </a>
                    </button>
                    ${producto.auth === 1
            ? `<div class="w-full my-1 flex gap-1"><button onclick="modifyProduct('${producto.id}')" class="w-full flex justify-center items-center h-6 transition duration-300 rounded bg-neutral-500 hover:bg-green-500 text-white fill-white"><svg class="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="32 32 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg ></button><button onclick="deleteProduct('${producto.id}')" class="w-full h-6  flex justify-center items-center rounded bg-neutral-800 hover:bg-red-500 transition duration-300 text-white fill-white"><svg class="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="32 32 512 512" class="w-full h-4 rounded bg-red-500 text-white fill-white"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg></button></div>`
            : ''}
                </div>
        `
    ).join('')
    $div.innerHTML = productos
}
//Productos.html
const addProductBtn = (div) => {
    let $title = document.getElementById(div)
    let addButton = document.createElement('a')
    addButton.innerHTML = `<button onclick="addProduct()" class="w-auto px-3 py-1 mr-4 bg-neutral-300 hover:bg-yellow-400 transition duration-300 font-bold text-black rounded">Agregar Producto</button>`
    addButton.href = '../editar.html'
    $title.append(addButton)
}
// Producto.html
const showProduct = (data, a) => {
    document.getElementById('nombre').innerHTML = data.nombre
    document.getElementById('descripcion').innerHTML = data.descripcion
    document.getElementById('codigo').innerHTML = `Código: ${data.codigo}`
    document.getElementById('foto').src = data.foto
    document.getElementById('precio').innerHTML = `$${data.precio}`
    document.getElementById('stock').innerHTML = `${data.stock} ${data.precio === 1 ? 'unidad' : "unids."}`
}
// Producto.html
const storageProduct = (data) => {
    sessionStorage.setItem('timestamp', data.timestamp)
    sessionStorage.setItem('nombre', data.nombre)
    sessionStorage.setItem('descripcion', data.descripcion)
    sessionStorage.setItem('codigo', data.codigo)
    sessionStorage.setItem('foto', data.foto)
    sessionStorage.setItem('precio', data.precio)
    sessionStorage.setItem('stock', data.stock)
    sessionStorage.setItem('cantidad', 0)
}
// Producto.html (buy Button)
const sendProduct = (idCart) => {
    fetch('./api/carrito', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: idCart,
            producto: {
                id: sessionStorage.getItem('tempId'),
                timestamp: sessionStorage.getItem('timestamp'),
                nombre: sessionStorage.getItem('nombre'),
                descripcion: sessionStorage.getItem('descripcion'),
                codigo: Number(sessionStorage.getItem('codigo')),
                foto: sessionStorage.getItem('foto'),
                precio: Number(sessionStorage.getItem('precio')),
                stock: Number(sessionStorage.getItem('stock')),
                cantidad: Number(sessionStorage.getItem('cantidad'))
            }
        })
    })
        .then(res => res.json())
        .then(id => { // Almaceno el id en caso de no registrar carrito
            !idCart && localStorage.setItem('myIdCart', id.id)
            location.href = './exito.html'
        })
}