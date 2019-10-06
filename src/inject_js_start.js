// starts the compiler with the correct data that
process.mainModule.exports.startCompiler(window.nw.App.dataPath)

// Force the builtin menu on OSX, as this will allow us to overwrite the
// menu name. If we don't do this, the menu name will be the content of
// package.json > name, and that is not desireble, since that name needs to be
// on lower case and can't contain spaces. By creating the builtin menu with an
// empty string, the name will be the same as the package.json > nwjsBuilder > productName
if (process.platform === 'darwin') {
	const mb = new window.nw.Menu({ type: 'menubar' })
	mb.createMacBuiltin('')
	window.nw.Window.get().menu = mb
}
