const isCIMode = 'CI_MODE' in process.env;
const _settings = isCIMode ? require('./localsettings.ci_mode') : require('./localsettings');
module.exports = function settings() { return _settings; };
