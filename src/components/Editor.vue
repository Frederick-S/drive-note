<template>
  <v-container>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div v-if="!selectedDriveItem || !selectedDriveItem.isFile">
      <p>No file selected.</p>
    </div>
    <div v-else>
      <template v-if="isMarkdownFile">
        <h1 class="title">{{ fileName }}</h1>
        <v-md-editor v-model="content" height="calc(100vh - 190px)" @save="save"></v-md-editor>
      </template>
      <template v-else>
        <p>Please select a markdown file.</p>
      </template>
    </div>
  </v-container>
</template>

<script>
import { GraphClient } from '../graph/graph-client'
import { isMarkdownFile } from '../util'

export default {
  name: 'Editor',
  data () {
    return {
      overlay: false
    }
  },
  computed: {
    selectedDriveItem () {
      return this.$store.state.selectedDriveItem
    },
    isMarkdownFile () {
      const item = this.selectedDriveItem

      return item && isMarkdownFile(item.name)
    },
    fileName () {
      const item = this.selectedDriveItem

      return item.name
    },
    content: {
      get () {
        const item = this.selectedDriveItem

        return item.content
      },
      set (value) {
        this.$store.commit('setSelectedDriveItemContent', value)
      }
    }
  },
  methods: {
    save (text, html) {
      if (!text) {
        return
      }

      const item = this.$store.state.selectedDriveItem
      const parentId = item.isFile ? item.parentId : item.id

      this.overlay = true

      GraphClient.uploadFile(item.name, parentId, text)
        .then((response) => {
          // Ignore
        })
        .catch((error) => {
          console.error(error)

          if (error.code === 'InvalidAuthenticationToken') {
            this.$router.push('/login')
          } else {
            this.$toast.error(`Error uploading file: ${error.message}`)
          }
        })
        .finally(() => {
          this.overlay = false
        })
    }
  }
}
</script>

<style>
.title {
  margin: 12px 0;
  border-bottom: 1px solid #e0e0e0;
}
</style>
