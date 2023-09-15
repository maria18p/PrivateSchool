import config_app from './src/config/configApp.js';
import { createDBConnection as dbConnection } from './src/middleware/commonModule.js';

const main = async () => {
   config_app();
   // console.log(555);
   await dbConnection();
};

main();
