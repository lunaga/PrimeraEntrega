const errors = (errorType, path, method) => {

    let error = {}

    switch (errorType) {

        case 'auth':
            error = {
                error: -1,
                ruta: path,
                metodo: method,
                descripcion: 'No autorizado'
            }
            return error

        case 'path':
            error = {
                error: -2,
                ruta: path,
                metodo: method,
                descripcion: 'Ruta no implementada'
            }
            return error

        default:
            error = {
                error: 0,
                ruta: path,
                metodo: method,
                descripcion: 'Error desconocido'
            }
            return error
    }
}
module.exports = errors