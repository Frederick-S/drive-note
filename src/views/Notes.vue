<template>
  <v-container>
    <v-treeview
      v-model="tree"
      :items="items"
      activatable
      item-key="name"
      open-on-click>
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
import { MsalManager } from '../msal-manager'

export default {
  data () {
    return {
      tree: [],
      items: []
    }
  },
  methods: {

  },
  created () {
    MsalManager.getRootDriveItems()
      .then((items) => {
        const folders = items.value.filter(item => item.folder)

        this.items = folders.map(it => {
          return {
            name: it.name
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
