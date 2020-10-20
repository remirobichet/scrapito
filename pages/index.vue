<template>
  <div>
    <b-container class="mb-5">
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Title : "
        label-for="input-title"
      >
        <b-form-input id="input-title" ref="addScrapeTitle"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Url : "
        label-for="input-url"
      >
        <b-form-input
          id="input-url"
          type="url"
          ref="addScrapeUrl"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols="4"
        label-cols-lg="2"
        label="Element target : "
        label-for="input-element"
      >
        <b-form-input id="input-element" ref="addScrapeElement"></b-form-input>
      </b-form-group>
      <b-button variant="outline-primary" @click="addScrape">Add</b-button>
    </b-container>
    <b-container class="mb-5">
      <b-card-group v-for="(item, idx) in scrape" v-bind:key="idx">
        <b-card :title="item.title" class="my-3">
          <b-card-text>{{ item.url }}</b-card-text>
          <b-card-text>{{ item.element }}</b-card-text>
          <b-link href="#" class="card-link">See results</b-link>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import global from '~/mixins/global'

export default Vue.extend({
  mixins: [global],
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
      const newScrape = {
        // https://github.com/vuejs/vue/issues/8721
        // Ugly workaround
        id: (this as any).uuid(),
        title: ((this.$refs.addScrapeTitle as Vue).$el as HTMLInputElement)
          .value,
        url: ((this.$refs.addScrapeUrl as Vue).$el as HTMLInputElement).value,
        element: ((this.$refs.addScrapeElement as Vue).$el as HTMLInputElement)
          .value,
      }
      this.$store.commit('scrape/add', newScrape)
      ;((this.$refs.addScrapeTitle as Vue).$el as HTMLInputElement).value = ''
      ;((this.$refs.addScrapeUrl as Vue).$el as HTMLInputElement).value = ''
      ;((this.$refs.addScrapeElement as Vue).$el as HTMLInputElement).value = ''
    },
  },
})
</script>

<style></style>
