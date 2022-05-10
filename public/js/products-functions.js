function getProduct(id) {
    sessionStorage.setItem('tempId', id)
    location.href = './producto.html'
}

function addProduct() { //! 0 ES AGREGAR
    sessionStorage.setItem('editMode', 0)
    location.href = './editar.html'
}

function modifyProduct(id) { //! 1 ES MODIFICAR
    sessionStorage.setItem('tempId', id)
    sessionStorage.setItem('editMode', 1)
    location.href = './editar.html'
}

function deleteProduct(id) { //! 2 ES BORRAR
    sessionStorage.setItem('tempId', id)
    sessionStorage.setItem('editMode', 2)
    location.href = './editar.html'
}