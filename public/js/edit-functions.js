const showFn = (data, $titulo, $detalles, $accion) => {
    $titulo.innerText = 'Modificar Artículo'
    $titulo.classList.add('text-green-500')
    $detalles.innerText = `Modifique los valores del producto.`
    document.getElementById('nombre').value = data.nombre
    document.getElementById('descripcion').value = data.descripcion
    document.getElementById('codigo').value = data.codigo
    document.getElementById('foto').value = data.foto
    document.getElementById('precio').value = data.precio
    document.getElementById('stock').value = data.stock
    $accion.innerText = `Modificar`
}

const modifyFn = (data, $div) => {
    let hiddenInput = document.createElement('input')
    hiddenInput.hidden = true
    hiddenInput.name = 'editMode'
    hiddenInput.value = 'modify'
    $div.append(hiddenInput)
    let hiddenInputId = document.createElement('input')
    hiddenInputId.hidden = true
    hiddenInputId.name = 'id'
    hiddenInputId.value = data.id
    $div.append(hiddenInputId)
}

const deleteFn = (data, $form, $titulo, $detalles, $accion) => {
    let hiddenInput = document.createElement('input')
    hiddenInput.hidden = true
    hiddenInput.name = 'editMode'
    hiddenInput.value = 'delete'
    $form.append(hiddenInput)
    let hiddenInputId = document.createElement('input')
    hiddenInputId.hidden = true
    hiddenInputId.name = 'id'
    hiddenInputId.value = data.id
    $form.append(hiddenInputId)
    $titulo.innerText = 'Borrar Artículo'
    $titulo.classList.add('text-red-500')
    $detalles.innerText = `Corrobore los detalles del producto a borrar/remover. 
                Esta acción no se podrá deshacer.`
    $accion.innerText = 'Borrar'
    $accion.classList.remove("bg-green-500")
    $accion.classList.remove("hover:bg-green-700")
    $accion.classList.add("bg-red-500")
    $accion.classList.add("hover:bg-red-700")
    let $inputs = document.getElementsByTagName('input')
    for (let input of $inputs) {
        input.readOnly = true
        input.classList.add("text-zinc-400")
        input.classList.remove("focus:border-blue-600")
    }
}