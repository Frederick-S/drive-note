<template>
  <v-container>
    <v-md-editor v-model="text" height="500px"></v-md-editor>
  </v-container>
</template>

<script>
export default {
  name: 'Editor',
  data () {
    return {
      text: ''
    }
  }
}
</script>
