<template>
  <div>
    <ul>
    <li v-for="item in scrape" v-bind:key="item">
      <span>{{ item }}</span>
    </li>
    <li>
      <input
        placeholder="todo?"
        @keyup.enter="addTodo"
      />
    </li>
  </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  beforeCreate() {
    this.$store.commit('scrape/initialiseStore')
  },
  computed: {
    scrape() {
      return this.$store.state.scrape.list
    },
  },
  methods: {
    addTodo(e: any) {
      this.$store.commit('scrape/add', e.target.value)
      e.target.value = ''
    }
  },
})
</script>

<style></style>
