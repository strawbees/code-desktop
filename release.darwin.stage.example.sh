# Cleanup files
rm -rf node_modules
rm -rf src/ui
rm -rf dist

# Install and build
npm install --only=production
npm run move-ui-stage

# Bundle
export NODE_ENV=stage
npm run bundle

# Sign
export APPLE_DEVELOPER_IDENTITY="????????????????????????????????????????" # $ security find-identity -v -p codesigning
npm run sign

# Package
export NODE_ENV=stage
npm run package:only

# Publish
export S3_KEY="???????????????????"
export S3_SECRET="??????????????????????????????????"
export S3_BUCKET="strawbees-downloads-stage"
npm run publish
