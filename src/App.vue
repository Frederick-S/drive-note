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
      MsalManager.initializeGraphClient(account, ['user.read', 'Files.ReadWrite'])

      this.$router.push('/notes')
    }
  }
}
</script>
