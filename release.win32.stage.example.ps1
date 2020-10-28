# Cleanup files
rm -r node_modules
rm -r src/ui
rm -r dist

# Install and build
npm install --only=production
npm run move-ui-stage

# Bundle
SET NODE_ENV=stage
npm run bundle

# Sign
$title    = 'Codesign'
$question = 'Please codesgin the bundle before proceeding.'
$choices  = '&Yes I have signed', '&No, I have not signed'
$decision = $Host.UI.PromptForChoice($title, $question, $choices, 1)
if ($decision -eq 0) {
	Write-Host 'Signed, continuing...'
} else {
	Write-Host 'Cannot do release without signing.'
	exit 1
}

# Package
SET NODE_ENV=stage
npm run package:only

# Publish
SET S3_KEY=???????????????????
SET S3_SECRET=??????????????????????????????????
SET S3_BUCKET=strawbees-downloads-stage
npm run publish
