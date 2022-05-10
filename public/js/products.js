fetch('./api/productos')
    .then((res) => res.json())
    .then(data => {
        // Limpio la memoria
        sessionStorage.clear()
        const $lista = document.getElementById('lista')
        // Si hay error de autenticacion muestro el mismo, sino la lista de productos
        data.error === -1
            ? error(data, $lista)
            : productList(data, $lista)
        // Muestro el botón de agregar producto si se es Admin
        data[0].auth === 1 && addProductBtn('title')
    })
    .catch(() => console.log('No se encuentran elementos'))