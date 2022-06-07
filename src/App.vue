<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
import { GraphClient } from './graph/graph-client'

export default {
  name: 'App',
  created () {
    const account = JSON.parse(localStorage.getItem('drive-note-account'))

    if (!account) {
      this.$router.push('/login')
    } else {
      // Todo: check if account is still valid
      GraphClient.init(account)

      this.$router.push('/notes')
    }
  }
}
</script>
