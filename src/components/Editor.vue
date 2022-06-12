<template>
  <v-container>
    <v-md-editor v-if="isMarkdownFile" v-model="content" height="500px"></v-md-editor>
  </v-container>
</template>

<script>
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
  }
}
</script>
