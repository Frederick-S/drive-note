<template>
  <v-container>
    <v-md-editor v-model="content" height="500px"></v-md-editor>
  </v-container>
</template>

<script>
export default {
  name: 'Editor',
  computed: {
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
