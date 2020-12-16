# Strawbees CODE Desktop app
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fstrawbees%2Fcode-desktop.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fstrawbees%2Fcode-desktop?ref=badge_shield)


This app is intended to a version of [Strawbees CODE](https://code.strawbees.com) that can be used offline.

We provide installers for Windows 7, 8.1, and 10, a dmg for MacOS above High Sierra and a zip for Ubuntu 18.04LTS.

The app is written using [NWJS](https://nwjs.io/) and uses [Strawbees Desktop Packager](https://github.com/strawbees/desktop-packager) to bundle, package, sign and deploy the final app.

## Download for your platform

Check [releases](https://github.com/strawbees/code-desktop/releases) for the latest version.

## Running from source

To run the app from the source code, the npm dependencies must be installed both on the root of this repository and on the `src` folder. This process is automated by the `postinstall` script.

The last step is to move which UI the app should load and it can be done with `npm run move-ui-stage` or `npm run move-ui-production`.

Finally run `npm start` to run the app.

```shell
npm install
npm run move-ui-stage
npm start
```

To run a local version of the ui, first follow the instructions to setup [`code-ui`](https://github.com/strawbees/code-ui) and build locally. Then "link" it by runing `npm link` at the root of **`code-ui`**.

After that, run the following commands on the root of **`code-desktop`** repository:

```shell
npm install
npm link @strawbees/code-ui
npm run move-ui-develop
npm start
```

## Bundling
### Windows
```shell
set NODE_ENV=production
rm -rf node_modules
rm -rf src/ui
npm ci --only=production
npm run move-ui-production
npm run bundle
```
### macOS
```shell
rm -rf node_modules
rm -rf src/ui
npm install --only=production
npm run move-ui-production
NODE_ENV=production npm run bundle
```

**Note**: Bump version on `src/package.json`.

## Signing and Deploying

### macOS

##### *ATTENTION! Requires Node 11! (Due to some strange issue in macos-alias)*
```shell
nvm use 11
```
##### Clean up files
```shell
rm -rf node_modules
rm -rf src/ui
```
##### Install and bundle
```shell
npm ci --only=production
npm run move-ui-production
NODE_ENV=production npm run bundle
```
##### Sign the app
```shell
export APPLE_DEVELOPER_IDENTITY=<apple_developer_id_application>
npm run sign
```
##### Package and notarize
1. Generate an app-specific password (https://support.apple.com/en-us/HT204397).
2. Figure you your provider with (shortname):
```shell
xcrun altool --list-providers -u <apple_id_email> -p <app_specific_password>
```
3. Run the package command
```shell
export APPLE_DEVELOPER_USERNAME=<apple_id_email>
export APPLE_DEVELOPER_PASSWORD=<app_specific_password>
export APPLE_DEVELOPER_PROVIDER=<provider>
export NODE_ENV=production
npm run package
```
If there's a problem with the provider, it will fail with a message like this:
```
Your Apple ID account is attached to other iTunes providers. You will need to specify which provider you intend to submit content to by using the -itc_provider command. Please contact us if you have questions or need help. (1627)
```


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fstrawbees%2Fcode-desktop.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fstrawbees%2Fcode-desktop?ref=badge_large)