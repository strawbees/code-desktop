console.log('main')

process.on('SIGQUIT', () => process.exit())
process.on('SIGHUP', () => process.exit())
process.on('SIGINT', () => process.exit()) // catch ctrl-c
process.on('SIGTERM', () => process.exit()) // catch kill

/**
 * Setup the compiler
 * Defines a function on the exports, so that the render process (inject_js_start.js),
 * wich has access to window.nw.App.dataPath, can trigger it, passing the correct
 * data path.
 */
exports.startCompiler = (dataPath) => {
	process.env.COMPILER_ROOT_DIR = dataPath
	process.env.COMPILER_PORT = 9511
	require('@strawbees/code-compiler-service/app')
}

/**
 * Display a popup notification saying there is an update available. It returns
 * a promise that resolves if notification is clicked and rejects after a
 * timout or if notification is closed
 * @retur {Promise}
 */
const showNotification = async () => {
	return new Promise((resolve, reject) => {
		const options = {
			icon : 'nwjs-assets/icon.png',
			body : 'Click here to restart'
		}
		const notification = new Notification('Update ready to install', options)
		const timer = setTimeout(() => {
			notification.close()
			reject(new Error('AUTOUPDATE: Notification timed out'))
		}, 5000)
		notification.onclick = () => {
			notification.close()
			clearTimeout(timer)
			resolve()
		}
		notification.onclose = () => {
			clearTimeout(timer)
			reject(new Error('AUTOUPDATE: User closed the notification.'))
		}
	})
}

// Start autoupdater
const AutoUpdater = require('@strawbees/desktop-autoupdater')
const pkg = require('./package.json')
if (!pkg.version) {
	console.log("No version on current app, don't run updater")
	return
}
const updater = new AutoUpdater(pkg)
updater.addListener('up-to-date', () => {
	console.log('App is up to date')
})
updater.addListener('ready-to-restart', () => {
	console.log('App is ready to restart')
	nw.App.quit()
})
updater.addListener('update-available', async () => {
	console.log('Update Available')
	await showNotification()
	// If notification is clicked, prepare to restart and quit app
	await updater.prepareToRestart()
	nw.App.quit()
})
updater.addListener('error', (err) => {
	console.error('Updater error:', err)
})
updater.start()
