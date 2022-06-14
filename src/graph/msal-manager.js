import * as msal from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_MSAL_CLIENT_ID
  }
}
const msalInstance = new msal.PublicClientApplication(msalConfig)

const MsalManager = {
  getMsalInstance () {
    return msalInstance
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
          reject(error)
        })
    })

    return promise
  }
}

export {
  MsalManager
}
