const isTestOnly = 'TEST_ONLY' in process.env;
module.exports = isTestOnly ? require('./localsettings.testonly') : require('./localsettings');
