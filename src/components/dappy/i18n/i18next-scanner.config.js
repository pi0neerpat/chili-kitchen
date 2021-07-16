const getScannerConfig = require(`@pi0neerpat/localization/src/getScannerConfig`)

// Locales for campaigns must be added using the @dappy/localization script
module.exports = getScannerConfig({
  nsList: [`vault`],
})
