import axios from 'axios';
import IP from './config';
import { PORT } from '@env';

const BASE_URL = `http://${IP}:${PORT}/api/notifications`;

export const getNotifications = async (data) => {
   try {
      data = {
         user: {
            _id: data.user._id,
         },
      };
      const queryResult = await axios.post(BASE_URL + '/getNotifications', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const markNotificationsRead = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + '/markRead', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const archiveNotifications = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + '/archive', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const unarchiveNotification = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + '/unarchive', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};
