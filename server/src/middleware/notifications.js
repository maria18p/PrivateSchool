import {
  addNotification,
  getUserNotifications,
  markNotificationsRead,
} from '../controllers/NotificationActions.js';
import { getUsers } from '../controllers/UserActions.js';
import { requestFailure, requestSuccess } from './commonModule.js';

export const createNotification = async (req) => {
  const queryResult = await addNotification(req);
  return queryResult.success
    ? requestSuccess({ message: queryResult.message })
    : requestFailure({ message: queryResult.message });
};

export const fetchNotifications = async (req) => {
  const queryResult = await getUserNotifications(req);
  return queryResult.success
    ? requestSuccess({ data: queryResult.data })
    : requestFailure({ message: queryResult.message });
};

export const sendAdminNotification = async (req) => {
  req.user = (await getUsers({ email: 'admin' }))[0];
  const notificationCreation = await addNotification(req);
  return notificationCreation.success
    ? requestSuccess({ data: notificationCreation.data }, { status: true })
    : requestFailure({ message: notificationCreation.message });
};

export const postRequestMarkNotificationsRead = async (req) => {
  const result = await markNotificationsRead(req);
  return result.success
    ? requestSuccess({ message: result.message })
    : requestFailure({ message: result.message });
};
