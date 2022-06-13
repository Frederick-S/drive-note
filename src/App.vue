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
      GraphClient.init(account)
      GraphClient.getMe()
        .then((response) => {
          this.$router.push('/notes')
        })
        .catch((error) => {
          console.error(error)

          this.$router.push('/login')
        })
    }
  }
}
</script>
