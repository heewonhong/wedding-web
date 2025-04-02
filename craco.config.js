const CracoAlias = require('craco-alias')

module.exports = {
  Plugins: [
    {
      Plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
}
