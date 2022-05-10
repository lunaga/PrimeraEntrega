const autenticacion = (dato) => {
    switch (dato) {
        case 'isAdmin':
            return 1
        case 'isUser':
            return 2
        default:
            return 0
    }
}
module.exports = autenticacion