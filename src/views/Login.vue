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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { MsalManager } from '../graph/msal-manager'
import { GraphClient } from '../graph/graph-client'

export default {
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

          this.$toast.error(`Error signing in: ${error.message}`)
        })
    }
  }
}
</script>
