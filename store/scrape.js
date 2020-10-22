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
  import(state, value) {
    state.list = JSON.parse(value)
    if (process.browser) {
      localStorage.setItem('scrape', value)
    }
  },
  remove(state, id) {
    state.list.splice(
      state.list.find((el) => el.id == id),
      1
    )
    if (process.browser) {
      localStorage.setItem('scrape', JSON.stringify(state.list))
    }
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
