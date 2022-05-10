(() => {
    const tempId = sessionStorage.getItem('tempId')
    fetch(`./api/productos/${tempId}`)
        .then(res => res.json())
        .then(data => {
            const $producto = document.getElementById('producto')
            data.error === -1
                ? error(data, $producto) // Muestro el error
                : showProduct(data) // Muestro el producto
            storageProduct(data)
        })
})();