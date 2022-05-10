const $add = document.getElementById('add')
const $remove = document.getElementById('remove')
let $count = document.getElementById('count')
$buy = document.getElementById('buy')

let count = 0

$add.onclick = () => {
    let stock = Number(sessionStorage.getItem('stock'))
    count < stock && count++
    $count.innerHTML = count
    sessionStorage.setItem('cantidad', count)

}
$remove.onclick = () => {
    count > 0 && count--
    $count.innerHTML = count
    sessionStorage.setItem('cantidad', count)
}

$buy.onclick = () => {
    if (count > 0) {
        let idCart = localStorage.getItem('myIdCart') || 0
        sendProduct(idCart)
    }
}