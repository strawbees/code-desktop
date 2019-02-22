const { fork } = require('child_process')

// Start the compiler
process.env.COMPILER_ROOT_DIR = window.nw.App.dataPath
process.env.COMPILER_PORT = 9511
const compilerProcess = fork(
	require.resolve('strawbees-code-compiler-service/app.js'),
	[],
	{ silent : true }
)
compilerProcess.stdout.on('data', data =>
	console.log(`COMPILER stdout: ${data}`)
)
compilerProcess.stderr.on('data', data =>
	console.log(`COMPILER stderr: ${data}`)
)
process.on('exit', () => compilerProcess.kill())
