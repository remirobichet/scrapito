export default {
  methods: {
    uuid() {
      return Date.now().toString(31) + Math.random().toString(31).substr(2, 5)
    },
    isJson(str) {
      try {
        JSON.parse(str)
      } catch (e) {
        return false
      }
      return true
    },
  },
}
