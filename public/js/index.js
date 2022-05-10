// Almacenamiento de usuario
const user = document.getElementById('user')
const admin = document.getElementById('admin')

const storageUser = (button) => {
    localStorage.removeItem('user')
    localStorage.setItem('user', button.value)
}
user.onclick = () => storageUser(user)
admin.onclick = () => storageUser(admin)