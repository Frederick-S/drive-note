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
        const folders = items.value.filter(item => item.folder)

        console.log(folders)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
