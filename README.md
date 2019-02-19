# Strawbees CODE Desktop app

This app is intended to a version of [Strawbees CODE](https://code.strawbees.com) that can be used offline.

We provide installers for Windows 7, 8.1, and 10, a dmg for MacOS above High Sierra and a zip for Ubuntu 18.04LTS.

The app is written using [NWJS](https://nwjs.io/) and uses [Strawbees Desktop Packager](https://github.com/strawbees/desktop-packager) to bundle, package, sign and deploy the final app.

## Download for your platform

Check [releases](https://github.com/strawbees/code-desktop/releases) for the latest version.

## Running from source

To run the app from the source code, install the npm dependencies both on the root of this repository and on the `src` folder before running `npm start`:

```bash
npm install
cd src
npm install --nwjs_build_type=sdk # this will install the sdk version
cd ..
npm start
```

## Building

Make sure you have removed all the `node_modules` from the root and `src` folder and install the dependencies again but specifying the environment you are building for. For example to build for `production`:

```bash
npm install --production
cd src
npm install --nwjs_build_type=normal # this will install the normal version
cd ..
npm build
```

## Signing and Deploying

TODO
