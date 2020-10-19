<template>
  <div>
    <b-container class="mb-5">
      <b-row class="my-3">
        <b-col sm="3">
          <label for="add-scrape">New scrape : </label>
        </b-col>
        <b-col cols="6" sm="6">
          <b-form-input
            id="add-scrape"
            ref="addScrape"
            type="text"
          ></b-form-input>
        </b-col>
        <b-col cols="6" sm="3">
          <b-button variant="outline-primary" @click="addScrape">Add</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="mb-5">
      <b-list-group v-for="item in scrape" v-bind:key="item">
        <b-list-group-item href="#">{{ item }}</b-list-group-item>
      </b-list-group>
    </b-container>
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
    addScrape() {
      this.$store.commit(
        'scrape/add',
        ((this.$refs.addScrape as Vue).$el as HTMLInputElement).value
      )
      ;((this.$refs.addScrape as Vue).$el as HTMLInputElement).value = ''
    },
  },
})
</script>

<style></style>
