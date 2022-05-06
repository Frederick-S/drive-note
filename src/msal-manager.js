import * as msal from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: process.env.VUE_APP_MSAL_CLIENT_ID
  }
}

const MsalManager = {
  login () {
    const msalInstance = new msal.PublicClientApplication(msalConfig)
    const promise = new Promise((resolve, reject) => {
      msalInstance.loginPopup({ scopes: ['user.read'] })
        .then(response => {
          console.log(response)

          resolve()
        })
        .catch(error => {
          console.log(error)

          reject(error)
        })
    })

    return promise
  }
}

export {
  MsalManager
}
