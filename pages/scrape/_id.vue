<template>
  <div>
    <b-container class="mb-5">
      <b-card :title="scrapeItem.title" class="my-3" v-if="scrapeItem">
        <b-card-text>{{ scrapeItem.url }}</b-card-text>
        <b-card-text>{{ scrapeItem.element }}</b-card-text>
        <b-button @click="postScrape(scrapeItem.url, scrapeItem.element)"
          >Load scrape</b-button
        >
      </b-card>
    </b-container>
    <b-container class="mb-5" v-if="loading">
      <b-spinner label="Spinning"></b-spinner>
    </b-container>
    <b-container class="mb-5" v-if="response">
      <b-card title="Result" class="my-3">
        <b-card-text>
          <div v-html="response"></div>
        </b-card-text>
      </b-card>
    </b-container>
    <b-container class="mb-5" v-if="error">
      <b-card title="Error" class="my-3">
        <b-card-text>{{ error }}</b-card-text>
      </b-card>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  beforeCreate() {
    this.$store.commit('scrape/initialiseStore')
  },
  data() {
    return {
      response: null,
      error: null,
      loading: false,
    }
  },
  computed: {
    scrapeItem() {
      if (this.$route.params.id) {
        return this.$store.getters['scrape/getScrapeById'](
          this.$route.params.id
        )
      }
    },
  },
  methods: {
    async postScrape(url: string, element: string) {
      try {
        this.loading = true
        this.response = null
        this.error = null
        await this.$axios
          .$post('/.netlify/functions/scrape', {
            url,
            element,
          })
          .then((res) => {
            this.loading = false
            this.response = res
            this.error = null
          })
      } catch (e) {
        this.loading = false
        this.error = e.response
        this.response = null
      }
    },
  },
})
</script>

<style></style>
