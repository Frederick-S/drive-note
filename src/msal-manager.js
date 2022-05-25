import * as msal from '@azure/msal-browser'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { Client } from '@microsoft/microsoft-graph-client'

const scopes = ['user.read', 'Files.ReadWrite']
const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_MSAL_CLIENT_ID
  }
}
const msalInstance = new msal.PublicClientApplication(msalConfig)

let graphClient

const MsalManager = {
  initializeGraphClient (account) {
    const options = {
      account,
      interactionType: msal.InteractionType.Silent,
      scopes
    }
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, options)
    graphClient = Client.initWithMiddleware({ authProvider })

    if (!graphClient) {
      throw new Error('Failed to initialize graph client')
    }
  },
  login () {
    const promise = new Promise((resolve, reject) => {
      msalInstance.loginPopup({ scopes: ['user.read'] })
        .then(response => {
          let account = msalInstance.getActiveAccount()

          if (!account && msalInstance.getAllAccounts()) {
            account = msalInstance.getAllAccounts()[0]
          }

          if (account) {
            resolve(account)
          } else {
            reject(new Error('No account found'))
          }
        })
        .catch(error => {
          console.log(error)

          reject(error)
        })
    })

    return promise
  },
  async getRootDriveItems () {
    return await graphClient.api('/me/drive/root/children').get()
  },
  async getDriveItemChildren (itemId) {
    return await graphClient.api(`/me/drive/items/${itemId}/children`).get()
  }
}

export {
  MsalManager
}
