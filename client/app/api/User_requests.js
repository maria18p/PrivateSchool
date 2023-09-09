import axios from 'axios';
import { PORT } from '@env';
import IP from './config';

const BASE_URL = `http://${IP}:${PORT}/api/`;
// const BASE_URL = `http://192.168.1.31:3010/api/`;

export const makeLoginRequest = async (data) => {
   try {
      console.log('Making login request...');
      console.log('Request data:', data);
      console.log('111111111111');

      const result = await axios.post(BASE_URL + 'login', data);

      console.log('Response data:', result.data);

      return await result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const makeRegisterStudentRequest = async (data) => {
   try {
      const result = await axios.post(BASE_URL + 'registerStudent', data);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const makeRegisterTeacherRequest = async (data) => {
   try {
      const result = await axios.post(BASE_URL + 'registerTeacher', data);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const checkLoggedIn = async (params) => {
   console.log(params);
   try {
      const result = await axios.post(BASE_URL + 'checkLoggedIn', params);
      return result.data;
      console.log(123);
   } catch (error) {
      console.error('Error:', error);
   }
};

export const checkPassword = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
      };
      const result = await axios.get(BASE_URL + 'checkPassword', {
         params: params,
      });
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getAllUsers = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
         email: params.user.email,
      };
      const result = await axios.get(BASE_URL + 'getAllUsers', { params: params });
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updatePassword = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
      };
      const result = await axios.post(BASE_URL + 'updatePassword', params);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updateFirstName = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
      };
      const result = await axios.post(BASE_URL + 'updateFirstName', params);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updateLastName = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
      };
      const result = await axios.post(BASE_URL + 'updateLastName', params);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getUserChat = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
         email: params.user.email,
      };
      const result = await axios.get(BASE_URL + 'getUserChat', {
         params: params,
      });
      return result.data.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const sendChatMessage = async (params) => {
   try {
      const result = await axios.post(BASE_URL + 'sendMessage', params);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const removeSubjectFromUserList = async (params) => {
   try {
      const result = await axios.post(BASE_URL + 'removeUserSubject', params);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updateStudentInactive = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
      };
      const result = await axios.post(BASE_URL + 'updateStudentInactive', params);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updateStudentActive = async (params) => {
   try {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
      };
      const result = await axios.post(BASE_URL + 'updateStudentActive', params);
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};
