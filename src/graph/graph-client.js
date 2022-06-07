import * as msal from '@azure/msal-browser'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { Client } from '@microsoft/microsoft-graph-client'
import { MsalManager } from './msal-manager'

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
  getRootDriveItems () {
    return graphClient.api('/me/drive/root/children').get()
  },
  getDriveItemChildren (itemId) {
    return graphClient.api(`/me/drive/items/${itemId}/children`).get()
  },
  createMarkdownFile (fileName) {
    return graphClient.api(`/me/drive/root:/${fileName}.md:/content`).put()
  }
}

export {
  GraphClient
}
