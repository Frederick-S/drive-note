<template>
  <v-container>
    <v-row>
      <v-col
        cols="3"
      >
        <v-row>
          <v-container>
            <v-menu
              offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-plus</v-icon>New
                </v-btn>
              </template>
              <v-list>
                <v-list-item link @click="createMarkdownFile">
                  <v-icon>mdi-language-markdown</v-icon>
                  <v-list-item-title>
                    Markdown File
                  </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-icon>mdi-folder</v-icon>
                  <v-list-item-title>
                    Folder
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-container>
        </v-row>
        <v-row>
          <v-treeview
            :items="items"
            :load-children="fetchChildren"
            activatable
            item-key="id"
            open-on-click>
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="!item.fileType">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon v-else>
                {{ fileTypes[item.fileType] }}
              </v-icon>
            </template>
          </v-treeview>
        </v-row>
      </v-col>
      <v-col cols="9"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GraphClient } from '../msal-manager'

function getTreeItems (items, fileTypes) {
  return items.map(it => {
    const child = {
      id: it.id,
      name: it.name
    }

    if (it.folder) {
      child.children = []
    } else if (it.file) {
      const fileType = it.file.mimeType.split('/')[1]

      if (fileTypes[fileType]) {
        child.fileType = fileType
      } else {
        child.fileType = 'file'
      }
    } else {
      child.fileType = 'file'
    }

    return child
  })
}

export default {
  data () {
    return {
      fileTypes: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf-box',
        png: 'mdi-image',
        jpeg: 'mdi-image',
        txt: 'mdi-file-document',
        xls: 'mdi-file-excel',
        file: 'mdi-file'
      },
      items: []
    }
  },
  methods: {
    fetchChildren (item) {
      return GraphClient.getDriveItemChildren(item.id)
        .then((response) => {
          item.children = getTreeItems(response.value, this.fileTypes)
        })
        .catch((error) => {
          console.log(error)

          if (error.code === 'InvalidAuthenticationToken') {
            this.$router.push('/login')
          }
        })
    },
    createMarkdownFile () {

    }
  },
  created () {
    GraphClient.getRootDriveItems()
      .then((response) => {
        this.items = getTreeItems(response.value, this.fileTypes)
      })
      .catch((error) => {
        console.log(error)

        if (error.code === 'InvalidAuthenticationToken') {
          this.$router.push('/login')
        }
      })
  }
}
</script>
