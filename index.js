import Logger from './src/Etla/log/Logger.js'
let log = new Logger()
import 'dotenv/config'

async function initialize() {
    try {
      await import('./src/Etla/class/Elta.js');
      await import('./src/Etla/web/index.js');
    } catch (error) {
      log.error(error.message);
    }
  }
  
initialize();