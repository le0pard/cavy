const Logger = {

  loggerDisabled() {
    return process.env.WEBPACK_LOGGER_DISABLED
  },

  consoleMethodDefined(method) {
    /* eslint-disable no-console */
    return typeof console !== 'undefined'
      && console !== null
      && typeof console[method] !== 'undefined'
      && typeof console[method].apply !== 'undefined'
    /* eslint-enable no-console */
  },

  writeLogs(method, args) {
    /* eslint-disable no-console */
    if (!this.loggerDisabled() && this.consoleMethodDefined(method))
      console[method].apply(console, args)
    /* eslint-enable no-console */
  },

  log() {
    Logger.writeLogs('log', arguments)
  },

  debug() {
    Logger.writeLogs('debug', arguments)
  },

  error() {
    Logger.writeLogs('error', arguments)
  },

  warn() {
    Logger.writeLogs('warn', arguments)
  },

  info() {
    Logger.writeLogs('info', arguments)
  },

  time() {
    Logger.writeLogs('time', arguments)
  },

  timeEnd() {
    Logger.writeLogs('timeEnd', arguments)
  }

}

export default Logger
