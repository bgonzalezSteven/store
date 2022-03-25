/*
* Se verifica que el usuario puede ver un item determinado según sus permisos guardados en localstorage
*/
export function can (state) {
  return permission => {
    const userInfo = JSON.parse(localStorage.getItem('sessionInfo'))
    const per = (userInfo !== null) ? userInfo.permissions.filter(item => {
      return item === permission
    }).length : 0
    if (per > 0) {
      return true
    } else {
      return false
    }
  }
}
export function user (state) {
  return JSON.parse(localStorage.getItem('User'))
}
