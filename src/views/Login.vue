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
import { MsalManager } from '../msal-manager'

export default {
  methods: {
    login () {
      MsalManager.login()
        .then(() => {
          console.log('done')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
