import config_app from './src/config/configApp.js';
import { createDBConnection as dbConnection } from './src/middleware/commonModule.js';

const main = async () => {
   config_app();
   await dbConnection();
};

main();
