console.log('main')

process.on('SIGQUIT', () => process.exit())
process.on('SIGHUP', () => process.exit())
process.on('SIGINT', () => process.exit()) // catch ctrl-c
process.on('SIGTERM', () => process.exit()) // catch kill


// Start autoupdater
const AutoUpdater = require('@strawbees/desktop-autoupdater')
const pkg = require('./package.json')
const updater = new AutoUpdater(pkg)
updater.addListener('up-to-date', () => {
	console.log('App is up to date')
})
updater.addListener('ready-to-restart', () => {
	console.log('App is ready to restart')
	nw.App.quit()
})
updater.addListener('update-available', () => {
	console.log('Update Available')
})
updater.addListener('error', (err) => {
	console.error('Updater error:', err)
})
updater.start()
