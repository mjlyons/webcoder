const isTestOnly = 'TEST_ONLY' in process.env;
const _settings = isTestOnly ? require('./localsettings.testonly') : require('./localsettings');
module.exports = function settings() { return _settings; };
