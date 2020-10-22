<template>
  <b-container class="mb-5">
    <h4 class="mb-3">Configuration options</h4>
    <b-button v-b-modal.modal-import variant="outline-primary">
      Import <b-icon icon="download" aria-hidden="true"></b-icon>
    </b-button>
    <b-modal id="modal-import" centered title="Import configuration">
      <p class="my-4">IMPORT</p>
    </b-modal>

    <b-button v-b-modal.modal-export variant="outline-primary">
      Export <b-icon icon="upload" aria-hidden="true"> </b-icon
    ></b-button>
    <b-modal id="modal-export" centered title="Import configuration">
      <p class="my-4">EXPORT</p>
    </b-modal>
  </b-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ConfigrationOptions',
  beforeCreate() {
    this.$store.commit('scrape/initialiseStore')
  },
  computed: {},
  methods: {},
})
</script>

<style></style>
