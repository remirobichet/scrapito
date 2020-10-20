<template>
  <div>
    <b-container class="mb-5">
      <b-card :title="scrapeItem.title" class="my-3" v-if="scrapeItem">
        <b-card-text>{{ scrapeItem.url }}</b-card-text>
        <b-card-text>{{ scrapeItem.element }}</b-card-text>
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
  computed: {
    scrapeItem() {
      if (this.$route.params.id) {
        return this.$store.getters['scrape/getScrapeById'](
          this.$route.params.id
        )
      }
    },
  },
})
</script>

<style></style>
