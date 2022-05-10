const tempId = sessionStorage.getItem('tempId')
const editMode = sessionStorage.getItem('editMode')
let $titulo = document.getElementById('titulo')
let $detalles = document.getElementById('detalles')
let $accion = document.getElementById('accion')
let $form = document.getElementById('edit')

fetch(`./api/productos/${tempId}`)
    .then(res => res.json())
    .then(data => {
        const $producto = document.getElementById('main')
        if (data.error === -1) { error(data, $producto) } //! Error
        else {
            if (editMode === '0') { $form.action = `/api/productos` } //! Agregar
            else {
                document.getElementById('edit').action = `/api/productos/${tempId}`
                showFn(data, $titulo, $detalles, $accion) //! Mostrar datos
            }

            if (editMode === '1') { //! Modificar
                modifyFn(data, $form)
            }

            if (editMode === '2') { //! Borrar
                $form.action = `/api/productos/${tempId}`
                deleteFn(data, $form, $titulo, $detalles, $accion)
            }
        }
    })