import * as msal from '@azure/msal-browser'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { Client } from '@microsoft/microsoft-graph-client'

const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_MSAL_CLIENT_ID
  }
}

let graphClient

function initializeGraphClient (account, msalClient, scopes) {
  const options = {
    account,
    interactionType: msal.InteractionType.Popup,
    scopes
  }
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalClient, options)
  graphClient = Client.initWithMiddleware({ authProvider })
}

const MsalManager = {
  login () {
    const msalInstance = new msal.PublicClientApplication(msalConfig)
    const promise = new Promise((resolve, reject) => {
      msalInstance.loginPopup({ scopes: ['user.read'] })
        .then(response => {
          let account = msalInstance.getActiveAccount()

          if (!account && msalInstance.getAllAccounts()) {
            account = msalInstance.getAllAccounts()[0]
          }

          if (account) {
            initializeGraphClient(account, msalInstance, ['user.read'])
          }

          if (graphClient) {
            resolve()
          } else {
            reject(new Error('Failed to initialize graph client'))
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
    const response = await graphClient.api('/me/drive/root/children').get()

    return response
  }
}

export {
  MsalManager
}
