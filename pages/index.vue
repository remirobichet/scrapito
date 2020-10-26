<template>
  <div>
    <b-container class="mb-5">
      <h4 class="mb-3">Add a scrape</h4>
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
    <ConfigrationOptions />
    <b-container class="mb-5">
      <b-card-group v-for="(item, idx) in scrape" v-bind:key="idx">
        <b-card :title="item.title" class="my-3">
          <b-card-text>{{ item.url }}</b-card-text>
          <b-card-text>{{ item.element }}</b-card-text>
          <nuxt-link :to="'/scrape/' + item.id" class="card-link" v-if="item.id"
            >See results</nuxt-link
          >
          <b-button
            size="sm"
            variant="danger"
            class="float-right"
            @click="deleteScrape(item.id)"
            v-if="item.id"
          >
            Delete <b-icon icon="trash" aria-hidden="true"></b-icon>
          </b-button>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import global from '@/mixins/global'

import ConfigrationOptions from '@/components/ConfigrationOptions.vue'

interface IComponent {
  $refs: {
    addScrapeTitle: Vue
    addScrapeUrl: Vue
    addScrapeElement: Vue
  }
  uuid(): string
}

export default (Vue as VueConstructor<Vue & IComponent>).extend({
  components: {
    ConfigrationOptions,
  },
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
        id: this.uuid(),
        title: (this.$refs.addScrapeTitle.$el as HTMLInputElement).value,
        url: (this.$refs.addScrapeUrl.$el as HTMLInputElement).value,
        element: (this.$refs.addScrapeElement.$el as HTMLInputElement).value,
      }
      this.$store.commit('scrape/add', newScrape)
      ;(this.$refs.addScrapeTitle.$el as HTMLInputElement).value = ''
      ;(this.$refs.addScrapeUrl.$el as HTMLInputElement).value = ''
      ;(this.$refs.addScrapeElement.$el as HTMLInputElement).value = ''
    },
    deleteScrape(index: string) {
      this.$store.commit('scrape/remove', index)
    },
  },
})
</script>

<style></style>
