module.exports = {
  // Global options:
  verbose: true,
  // Command options:
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [
    'README.md',
    'package.json',
    'package-lock.json',
    'yarn.lock',
	  '\*test/*.js'
  ],
};