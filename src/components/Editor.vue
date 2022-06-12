<template>
  <v-container>
    <div v-if="isMarkdownFile">
      <h1 class="title">{{ fileName }}</h1>
      <v-md-editor v-model="content" height="500px" @save="save"></v-md-editor>
    </div>
  </v-container>
</template>

<script>
import { GraphClient } from '../graph/graph-client'
import { isMarkdownFile } from '../util'

export default {
  name: 'Editor',
  computed: {
    isMarkdownFile: {
      get () {
        const item = this.$store.state.selectedDriveItem

        return item && isMarkdownFile(item.name)
      }
    },
    fileName: {
      get () {
        const item = this.$store.state.selectedDriveItem

        return item.name
      }
    },
    content: {
      get () {
        const item = this.$store.state.selectedDriveItem

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

      GraphClient.uploadFile(item.name, parentId, text)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error(error)
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
