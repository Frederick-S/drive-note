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
import * as msal from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: '8d47b31f-72c8-4f3d-a34d-a5862eded42c'
  }
}

export default {
  methods: {
    login () {
      const msalInstance = new msal.PublicClientApplication(msalConfig)

      msalInstance.loginPopup({
        scopes: ['user.read']
      }).then(loginResponse => {
        console.log(loginResponse)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
