<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="3">
        <v-container>
          <h3 class="text-center">Sign in with Microsoft</h3>
          <hr>
        </v-container>
        <v-row justify="space-around" class="py-6">
          <v-btn @click="login">Sign in</v-btn>
        </v-row>
        <v-snackbar
          centered
          v-model="snackbar"
          :timeout="timeout"
          color="red">
          {{ text }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { MsalManager } from '../msal-manager'
import { GraphClient } from '../graph-client'

export default {
  data () {
    return {
      snackbar: false,
      text: 'Login failed',
      timeout: 1000
    }
  },
  methods: {
    login () {
      MsalManager.login()
        .then((account) => {
          GraphClient.init(account)

          localStorage.setItem('drive-note-account', JSON.stringify(account))

          this.$router.push('/notes')
        })
        .catch((error) => {
          console.error(error)

          this.snackbar = true
        })
    }
  }
}
</script>
