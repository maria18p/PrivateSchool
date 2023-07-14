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
  const queryResult = await axios.get(BASE_URL + 'getAllSubjects', {
    params: params,
  });
  return queryResult.data;
};

export const getUserSubjects = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
  };

  const queryResult = await axios.get(BASE_URL + 'getUserSubjects', {
    params: params,
  });
  return queryResult.data;
};

export const makeAssignTeacherSubjectRequest = async (data) => {
  const queryResult = await axios.post(BASE_URL + 'addTeacherSubject', data);
  return queryResult.data;
};

export const makeAssignStudentSubjectRequest = async (data) => {
  const queryResult = await axios.post(BASE_URL + 'addStudentSubject', data);
  return queryResult.data;
};

export const makeCreateSubjectRequest = async (data) => {
  const queryResult = await axios.post(BASE_URL + 'addSubject', data);
  return queryResult;
};

export const getSubjectTeachers = async (data) => {
  const queryResult = await axios.get(BASE_URL + 'subjectTeachers', data);
  return queryResult.data;
};

export const updateSubject = async (params) => {
  const queryResult = await axios.post(BASE_URL + 'updateSubject', params);
  return queryResult.data;
};
