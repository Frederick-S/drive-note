<template>
  <v-container>
    <v-md-editor v-if="isMarkdownFile" v-model="content" height="500px" @save="save"></v-md-editor>
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
    content: {
      get () {
        const item = this.$store.state.selectedDriveItem

        if (item) {
          return item.content
        } else {
          return ''
        }
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
