import axios from 'axios';
import { PORT } from '@env';
import IP from './config';

const BASE_URL = `http://${IP}:${PORT}/lessons/`;

export const createLesson = async (data) => {
   try {
      data = {
         user: { _id: data.user._id, token: data.user.token },
         date: data.date,
         start: data.start,
         end: data.end,
         student: {
            _id: data.student._id,
            firstName: data.student.firstName,
            lastName: data.student.lastName,
            email: data.student.email,
         },
         room: data.room,
         subject: data.subject,
      };
      const result = await axios.post(BASE_URL + 'createLesson', data);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getUserLessons = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.token,
      };
      const result = await axios.get(BASE_URL + 'getUserLessons', { params });
      return result.data.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const removeLesson = async (data) => {
   try {
      const result = await axios.delete(BASE_URL + 'remove', {
         data: {
            user: { _id: data.user._id, token: data.user.token },
            lessonId: data.lessonId,
         },
      });
      console.log('[RESULT.DATA]', result.data.message);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};
