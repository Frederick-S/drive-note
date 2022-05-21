<template>
  <v-container>

  </v-container>
</template>

<script>
import { MsalManager } from '../msal-manager'

export default {
  methods: {

  },
  created () {
    MsalManager.getRootDriveItems()
      .then((items) => {
        console.log(items)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
