import * as msal from '@azure/msal-browser'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { Client } from '@microsoft/microsoft-graph-client'
import { MsalManager } from './msal-manager'
import axios from 'axios'

const scopes = ['user.read', 'Files.ReadWrite']

let graphClient

const GraphClient = {
  init (account) {
    const options = {
      account,
      interactionType: msal.InteractionType.Silent,
      scopes
    }
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(MsalManager.getMsalInstance(), options)
    graphClient = Client.initWithMiddleware({ authProvider })

    if (!graphClient) {
      throw new Error('Failed to initialize graph client')
    }
  },
  getMe () {
    return graphClient.api('/me').get()
  },
  getRootDriveItems () {
    return graphClient.api('/me/drive/root/children').get()
  },
  getDriveItemChildren (itemId) {
    return graphClient.api(`/me/drive/items/${itemId}/children`).get()
  },
  uploadFile (fileName, parentId, content) {
    const url = parentId ? `/me/drive/items/${parentId}:/${fileName}:/content` : `/me/drive/root:/${fileName}:/content`

    return graphClient.api(url).put(content)
  },
  getFileContent (itemId) {
    return graphClient.api(`/me/drive/items/${itemId}?select=id,@microsoft.graph.downloadUrl`)
      .get()
      .then((response) => {
        const downloadUrl = response['@microsoft.graph.downloadUrl']

        return axios.get(downloadUrl, {
          responseType: 'blob'
        })
      })
      .then((response) => {
        const promise = new Promise((resolve, reject) => {
          const blob = new Blob([response.data], {
            type: response.headers['content-type']
          })

          const reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target.result)
          }
          reader.onerror = (e) => {
            reject(e)
          }
          reader.readAsText(blob)
        })

        return promise
      })
  }
}

export {
  GraphClient
}
