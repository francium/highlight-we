export default class Logger {

  constructor(namespace) {
    this._namespace = `[${namespace}]`;
    this._level = Logger._level;  // eslint-disable-line no-underscore-dangle
    this._console = console;
  }


  static configure(level) {
    // eslint-disable-next-line no-underscore-dangle
    Logger._level = level || Logger.Level.Info;
  }


  log(...messages) {
    if (this._level <= Logger.Level.Log) {
      this._console.log(this._namespace, 'LOG', ...messages);
    }
  }


  debug(...messages) {
    if (this._level <= Logger.Level.Debug) {
      this._console.debug(this._namespace, 'DEBUG', ...messages);
    }
  }


  info(...messages) {
    if (this._level <= Logger.Level.Info) {
      this._console.info(this._namespace, 'INFO', ...messages);
    }
  }


  warn(...messages) {
    if (this._level <= Logger.Level.Warn) {
      this._console.warn(this._namespace, 'WARN', ...messages);
    }
  }


  error(...messages) {
    if (this._level <= Logger.Level.Error) {
      this._console.warn(this._namespace, 'ERROR', ...messages);
    }
  }

}


Logger.Level = {
  None: 5,
  Error: 4,
  Warn: 3,
  Info: 2,
  Debug: 1,
  Log: 0,
};

// default level
// eslint-disable-next-line no-underscore-dangle
Logger._level = Logger.Level.Info;
