const KEY = 'my-today-news-user-key-01'
const localUser = {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY))
  },
  remUser () {
    window.sessionStorage.removeItem(KEY)
  }

}
export default localUser
