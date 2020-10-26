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
    <b-modal id="modal-export" centered title="Export configuration">
      <code>{{ exportConfig }}</code>
    </b-modal>
  </b-container>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import global from '@/mixins/global'

interface IComponent {
  $refs: {
    jsonImport: Vue
  }
  isJson(str: string): boolean
  $bvToast: any
}

export default (Vue as VueConstructor<Vue & IComponent>).extend({
  name: 'ConfigrationOptions',
  mixins: [global],
  beforeCreate() {
    this.$store.commit('scrape/initialiseStore')
  },
  computed: {
    exportConfig(): string {
      return JSON.stringify(this.$store.state.scrape.list)
    },
  },
  methods: {
    importConfig() {
      const jsonImport = (this.$refs.jsonImport.$el as HTMLInputElement).value
      if (this.isJson(jsonImport)) {
        this.$store.commit('scrape/import', jsonImport)
        this.makeToast('Import', 'success')
      } else {
        this.makeToast('Import', 'danger')
      }
    },
    makeToast(action: string, variant: string) {
      const textFromVariant = variant === 'success' ? 'sucess' : 'failed'
      this.$bvToast.toast(`${action} ${textFromVariant}`, {
        title: `Configuration options`,
        variant: variant,
        solid: true,
      })
    },
  },
})
</script>

<style></style>
