export const state = () => ({
  list: [],
})

export const mutations = {
  add(state, value) {
    state.list.push(value)
    if (process.browser) {
      localStorage.setItem('scrape', JSON.stringify(state.list))
    }
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  initialiseStore(state) {
    if (process.browser && localStorage.getItem('scrape')) {
      state.list = JSON.parse(localStorage.getItem('scrape'))
    }
  },
}

export const getters = {
  getScrapeById: (state) => (id) => {
    return state.list.find((todo) => todo.id === id)
  },
}
