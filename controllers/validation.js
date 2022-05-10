function validation(data) {

    if (typeof data.codigo === 'string') { data.codigo = Number(data.codigo) }
    if (typeof data.precio === 'string') { data.precio = Number(data.precio) }
    if (typeof data.stock === 'string') { data.stock = Number(data.stock) }

    return data
}
module.exports = validation