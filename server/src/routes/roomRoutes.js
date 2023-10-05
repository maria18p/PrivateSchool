import express from 'express';
// import {
//   getAllRoomsRequest,
//   postRoomRequest,
//   deleteRoomRequest,
// } from '../middleware/commonModule.js';
import { respond } from './utility.js';
import {
   deleteRoomRequest,
   getAllRoomsRequest,
   postRequestUpdateRoom,
   postRoomRequest,
} from '../middleware/rooms.js';

const Router = express.Router();

Router.post('/addRoom', async (req, res) => {
   return respond(await postRoomRequest(req.body), res);
});

Router.post('/updateRoom', async (req, res) => {
   return respond(await postRequestUpdateRoom(req.body), res);
});

Router.get('/getAllRooms', async (req, res) => {
   return respond(await getAllRoomsRequest(req.query), res);
});

Router.post('/deleteRoom', async (req, res) => {
   return respond(await deleteRoomRequest(req.body), res);
});

export default Router;
