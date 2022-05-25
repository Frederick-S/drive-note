<template>
  <v-container>
    <v-row>
      <v-col
        cols="3"
      >
        <v-treeview
          :items="items"
          :load-children="fetchChildren"
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
      </v-col>
      <v-col cols="9"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { MsalManager } from '../msal-manager'

export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    async fetchChildren (item) {
      return MsalManager.getDriveItemChildren(item.id)
        .then((response) => {
          item.children = response.value.map(it => {
            const child = {
              id: it.id,
              name: it.name
            }

            if (it.folder) {
              child.children = []
            } else {
            }

            return child
          })
        })
    }
  },
  created () {
    MsalManager.getRootDriveItems()
      .then((response) => {
        this.items = response.value.map(it => {
          const child = {
            id: it.id,
            name: it.name
          }

          if (it.folder) {
            child.children = []
          }

          return child
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
