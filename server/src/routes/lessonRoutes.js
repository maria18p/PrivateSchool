import express from 'express';
import { respond } from './utility.js';
import {
   getRequestGetLessons,
   postRequestCreateLesson,
   deleteRequestRemoveLesson,
} from '../middleware/lessons.js';

const Router = express.Router();

Router.post('/createLesson', async (req, res) => {
   return respond(await postRequestCreateLesson(req.body), res);
});

Router.get('/getUserLessons', async (req, res) => {
   return respond(await getRequestGetLessons(req.query), res);
});

Router.delete('/remove', async (req, res) => {
   return respond(await deleteRequestRemoveLesson(req.body), res);
});

export default Router;
