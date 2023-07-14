import axios from 'axios';
import { PORT } from '@env';
import IP from './config';

const BASE_URL = `http://${IP}:${PORT}/api/`;

export const makeLoginRequest = async (data) => {
  const result = await axios.post(BASE_URL + 'login', data);
  return result.data;
};

export const makeRegisterStudentRequest = async (data) => {
  const result = await axios.post(BASE_URL + 'registerStudent', data);
  return result.data;
};

export const makeRegisterTeacherRequest = async (data) => {
  const result = await axios.post(BASE_URL + 'registerTeacher', data);
  return result.data;
};

export const checkLoggedIn = async (params) => {
  const result = await axios.post(BASE_URL + 'checkLoggedIn', params);
  return result.data;
};

export const checkPassword = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
  };
  const result = await axios.get(BASE_URL + 'checkPassword', {
    params: params,
  });
  return result.data;
};

export const getAllUsers = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
    email: params.user.email,
  };
  const result = await axios.get(BASE_URL + 'getAllUsers', { params: params });
  return result.data;
};

export const updatePassword = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
  };

  const result = await axios.post(BASE_URL + 'updatePassword', params);
  return result.data;
};

export const updateFirstName = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
  };

  const result = await axios.post(BASE_URL + 'updateFirstName', params);
  return result.data;
};

export const updateLastName = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
  };
  console.log(params);
  const result = await axios.post(BASE_URL + 'updateLastName', params);
  return result.data;
};

// export const getSchedule = async (params) => {
// 	params.user = {
// 		_id: params.user._id,
// 		token: params.user.token,
// 		email: params.user.email,
// 	};
// 	const result = await axios.get(BASE_URL + "getSchedule", { params: params });
// 	return result.data;
// };

// export const updateSchedule = async (params) => {
// 	params.user = {
// 		user: {
// 			_id: params.user._id,
// 			token: params.user.token,
// 			email: params.user.email,
// 		},
// 	};
// 	const result = await axios.post(BASE_URL + "updateSchedule", {
// 		params: params,
// 	});
// 	return result.data;
// };

export const getUserChat = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
    email: params.user.email,
  };

  const result = await axios.get(BASE_URL + 'getUserChat', {
    params: params,
  });
  return result.data.data;
};

export const sendChatMessage = async (params) => {
  const result = await axios.post(BASE_URL + 'sendMessage', params);
  return result.data;
};

export const removeSubjectFromUserList = async (params) => {
  const result = await axios.post(BASE_URL + 'removeUserSubject', params);
  return result.data;
};

export const updateStudentInactive = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
  };
  const result = await axios.post(BASE_URL + 'updateStudentInactive', params);
  return result.data;
};

export const updateStudentActive = async (params) => {
  params.user = {
    _id: params.user._id,
    token: params.user.token,
  };
  const result = await axios.post(BASE_URL + 'updateStudentActive', params);
  return result.data;
};
