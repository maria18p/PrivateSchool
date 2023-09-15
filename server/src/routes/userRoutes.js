import express from 'express';
import { respond } from './utility.js';
import {
   deleteUserRequest,
   getAllUsers,
   postLoginRequest,
   postStudentRequest,
   postTeacherRequest,
   getRequestUserPassword,
   postRequestUpdateUserPassword,
   postRequestUpdateUserFirstName,
   postRequestUpdateUserLastName,
   postRequestUpdateStudentActive,
   postRequestUpdateStudentInactive,
} from '../middleware/users.js';
import { userLoggedIn } from '../middleware/commonModule.js';
import { getRequestUserChat, postCreateMessage } from '../middleware/messages.js';
import {
   fetchNotifications,
   postRequestMarkNotificationsRead,
} from '../middleware/notifications.js';
import colors from 'colors';
import { postRequestRemoveUserSubject } from '../middleware/subjects.js';

const Router = express.Router();

Router.post('/registerTeacher', async (req, res) => {
   return respond(await postTeacherRequest(req.body), res);
});

Router.post('/login', async (req, res) => {
   return respond(await postLoginRequest(req.body), res);
});

Router.post('/registerStudent', async (req, res) => {
   return respond(await postStudentRequest(req.body), res);
});

Router.post('/registerTeacher', async (req, res) => {
   return respond(await postTeacherRequest(req.body), res);
});

Router.get('/getAllUsers', async (req, res) => {
   return respond(await getAllUsers(req.query), res);
});

Router.delete('/deleteUser/:id', async (req, res) => {
   const result = { id: req.params.id };
   return respond(await deleteUserRequest(result), res);
});

Router.post('/checkLoggedIn', async (req, res) => {
   console.log(req);
   return respond(await userLoggedIn(req.body), res);
});

Router.get('/checkPassword', async (req, res) => {
   return respond(await getRequestUserPassword(req.query), res);
});

Router.post('/updatePassword', async (req, res) => {
   return respond(await postRequestUpdateUserPassword(req.body), res);
});

Router.post('/updateFirstName', async (req, res) => {
   return respond(await postRequestUpdateUserFirstName(req.body), res);
});

Router.post('/updateLastName', async (req, res) => {
   return respond(await postRequestUpdateUserLastName(req.body), res);
});

Router.post('/sendMessage', async (req, res) => {
   return respond(await postCreateMessage(req.body), res);
});

Router.get('/getUserChat', async (req, res) => {
   return respond(await getRequestUserChat(req.query), res);
});

Router.post('/notifications/getNotifications', async (req, res) => {
   return respond(await fetchNotifications(req.body), res);
});

Router.post('/notifications/markRead', async (req, res) => {
   return respond(await postRequestMarkNotificationsRead(req.body), res);
});

Router.post('/removeUserSubject', async (req, res) => {
   return respond(await postRequestRemoveUserSubject(req.body), res);
});

Router.post('/updateStudentActive', async (req, res) => {
   return respond(await postRequestUpdateStudentActive(req.body), res);
});

Router.post('/updateStudentInactive', async (req, res) => {
   return respond(await postRequestUpdateStudentInactive(req.body), res);
});

export default Router;
