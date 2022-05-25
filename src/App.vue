<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
import { MsalManager } from './msal-manager'

export default {
  name: 'App',
  created () {
    const account = JSON.parse(localStorage.getItem('drive-note-account'))

    if (!account) {
      this.$router.push('/login')
    } else {
      // Todo: check if account is still valid
      MsalManager.initializeGraphClient(account)

      this.$router.push('/notes')
    }
  }
}
</script>
