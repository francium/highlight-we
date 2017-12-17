import Logger from './app/util/logger';
import bootstrap from './bootstrap';


function configureLogger() {
  console.log('NODE_ENV =', process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
    case 'development':
      Logger.configure(Logger.Level.Log);
      break;

    case 'production':
      Logger.configure(Logger.Level.Warn);
      break;

    default:
      Logger.configure(Logger.Level.Debug);
  }
}


function main() {
  configureLogger();

  const logger = new Logger('index');

  try {
    bootstrap();
  } catch (err) {
    logger.error(err);
  }
}


main();
