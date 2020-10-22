<template>
  <b-container class="mb-5">
    <h4 class="mb-3">Configuration options</h4>
    <b-button v-b-modal.modal-import variant="outline-primary">
      Import <b-icon icon="download" aria-hidden="true"></b-icon>
    </b-button>
    <b-modal
      id="modal-import"
      centered
      title="Import configuration"
      @ok="importConfig()"
    >
      <code>
        <b-form-textarea
          ref="jsonImport"
          id="json-import"
          placeholder="Json config here..."
        ></b-form-textarea
      ></code>
    </b-modal>

    <b-button v-b-modal.modal-export variant="outline-primary">
      Export <b-icon icon="upload" aria-hidden="true"> </b-icon
    ></b-button>
    <b-modal id="modal-export" centered title="Import configuration">
      <p class="my-4">EXPORT</p>
    </b-modal>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import global from '@/mixins/global'

export default Vue.extend({
  name: 'ConfigrationOptions',
  mixins: [global],
  beforeCreate() {
    this.$store.commit('scrape/initialiseStore')
  },
  methods: {
    importConfig() {
      const jsonImport = ((this.$refs.jsonImport as Vue)
        .$el as HTMLInputElement).value
      if ((this as any).isJson(jsonImport)) {
        this.$store.commit('scrape/import', jsonImport)
        this.makeToast('Import', 'success')
      } else {
        this.makeToast('Import', 'danger')
      }
    },
    makeToast(action: string, variant: string) {
      const textFromVariant = variant === 'success' ? 'sucess' : 'failed'
      ;(this as any).$bvToast.toast(`${action} ${textFromVariant}`, {
        title: `Configuration options`,
        variant: variant,
        solid: true,
      })
    },
  },
})
</script>

<style></style>
