import mongoose from 'mongoose';
import { ODM } from '../middleware/commonModule.js';
import { getUsers } from './UserActions.js';

export const addNotification = async (req) => {
  try {
    const queryResult = await ODM.models.Notification.create({
      _id: new mongoose.Types.ObjectId(),
      user: req.user._id,
      text: req.text,
      type: req.type ? req.type : 'message',
      payload: req.payload ? req.payload : null,
    });

    if (!queryResult) return { success: false, message: 'SOMETHING WENT WRONG' };

    const userRef = await ODM.models.User.findOne({ _id: req.user._id });
    userRef.notifications.push(queryResult._id);
    await userRef.save();

    return { success: true, message: 'Notification saved successfully' };
  } catch (e) {
    console.log('ERROR CREATING NOTIFICATION', e);
    return { success: false, message: 'SOMETHING WENT WRONG' };
  }
};

export const getUserNotifications = async (req) => {
  try {
    let user = (await getUsers(req.user))[0];
    const allNotifications = await ODM.models.Notification.find({
      user: user._id,
      // user: user,
      // read: false,
    });
    return { success: true, data: allNotifications };
  } catch (e) {
    console.log('ERROR FETCHING USER NOTIFICATIONS');
    console.log(e);
    return { success: false, message: 'SOMETHING WENT WRONG' };
  }
};

export const markNotificationsRead = async (req) => {
  const result = Promise.all(
    req.notifications.map(async (notification) => {
      const obj = await ODM.models.Notification.findOne({
        _id: notification._id,
        read: false,
      });
      if (obj) {
        obj.read = true;
        obj.save();
      }
    }),
  );

  return { success: true, message: 'updated' };
};
