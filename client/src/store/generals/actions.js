export function fetchAccessToken ({ commit }) {
  commit('updateAccessToken', JSON.parse(localStorage.getItem('sessionInfo')))
}
export function logout ({ commit }) {
  localStorage.removeItem('sessionInfo')
  commit('logout')
}
export function deleteItem ({ commit }) {
  localStorage.removeItem('User')
  commit('User')
}
