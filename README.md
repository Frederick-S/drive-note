# drive-note [![Node.js CI](https://github.com/Frederick-S/drive-note/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Frederick-S/drive-note/actions/workflows/build.yml)
A simple tool to edit markdown files in OneDrive online. 

I prefer to write notes in markdown files and save them in OneDrive locally. But sometimes I need to access those markdown files online when OneDrive is not available locally. That's why I create this small app.

BTW, OneDrive online now supports editing files online, but with limited preview feature.

> https://drive-note.dekiru.app has to be registered as a multitenant app which requires a verified publisher. Currently https://drive-note.dekiru.app is powered by `Microsoft 365 Developer Program` which seems works properly even without a verified publisher. But I guess it might not work in the future.

## Getting started
First, follow the [instructions](https://docs.microsoft.com/en-my/graph/auth-register-app-v2) to register a new app. 

Second, replace the `VUE_APP_MSAL_CLIENT_ID` with your own client id in .env/.env.production. 

Then run the following commands to start a dev server:

```
yarn
yarn serve
```

## License
[MIT](LICENSE)
