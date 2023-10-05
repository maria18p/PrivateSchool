import axios from 'axios';
import IP from './config';
import { PORT } from '@env';

const BASE_URL = `http://${IP}:${PORT}/sub/`;

export const getAllSubjects = async (params) => {
   if (params && params.user) {
      params.user = {
         _id: params.user._id,
         token: params.user.token,
      };
   }
   try {
      const queryResult = await axios.get(BASE_URL + 'getAllSubjects', {
         params: params,
      });
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getUserSubjects = async (params) => {
   params.user = {
      _id: params.user._id,
      token: params.user.token,
   };
   try {
      const queryResult = await axios.get(BASE_URL + 'getUserSubjects', {
         params: params,
      });
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const makeAssignTeacherSubjectRequest = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + 'addTeacherSubject', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const makeAssignStudentSubjectRequest = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + 'addStudentSubject', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const makeCreateSubjectRequest = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + 'addSubject', data);
      return queryResult;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getSubjectTeachers = async (data) => {
   try {
      const queryResult = await axios.get(BASE_URL + 'subjectTeachers', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updateSubject = async (params) => {
   try {
      const queryResult = await axios.post(BASE_URL + 'updateSubject', params);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};
