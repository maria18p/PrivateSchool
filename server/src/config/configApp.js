import express from 'express';
import cors from 'cors';
import colors from 'colors';
import userRoutes from '../routes/userRoutes.js';
import subjectRoutes from '../routes/subjectRoutes.js';
import roomRoutes from '../routes/roomRoutes.js';
import pairingRoutes from '../routes/pairingRoutes.js';
import lessonRoutes from '../routes/lessonRoutes.js';

const PORT = process.env.PORT || 3007;

const config_app = async () => {
   const app = express();
   app.use(express.urlencoded({ extended: false }));
   app.use(express.json());

   app.options('*', cors({ origin: `http://localhost:${PORT}`, optionsSuccessStatus: 200 }));
   app.use(
      cors({ origin: `http://localhost:${PORT}`, credentials: true, optionsSuccessStatus: 200 }),
   );

   //instead of cors ->
   // app.use(function(req, res, next) {
   //    res.header("Access-Control-Allow-Origin", "*");
   //    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   //    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
   //    next();
   //  });
   app.use('/api', userRoutes);
   app.use('/sub', subjectRoutes);
   app.use('/room', roomRoutes);
   app.use('/pair', pairingRoutes);
   app.use('/lessons', lessonRoutes);

   listen_port(app);
};

const listen_port = (app) => {
   app.listen(PORT, () => console.log(`Server started via port ${PORT}`.blue.bold));
};

export default config_app;
