import axios from 'axios';
import IP from './config';
import { PORT } from '@env';

const BASE_URL = `http://${IP}:${PORT}/pair`;

export const getPairings = async (params) => {
   params.user = {
      _id: params.user._id,
   };
   try {
      const allPairings = await axios.get(BASE_URL + '/getPairings', { params });
      return allPairings.data.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const pairTeacherToStudent = async (params) => {
   params.user = {
      _id: params.user._id,
   };
   try {
      const queryResult = await axios.post(BASE_URL + '/pairTeacherToStudent', params);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getTeacherStudents = async (params) => {
   try {
      params.user = {
         user: { _id: params.user._id, token: params.user.token },
      };
      const queryResult = await axios.get(BASE_URL + '/getTeacherStudents', {
         params,
      });
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getPairingSubjects = async (params) => {
   params = {
      user: { _id: params.user._id, token: params.user.token },
      student: { _id: params.student._id },
   };
   try {
      let queryResult = await axios.get(BASE_URL + '/pairingSubjects', {
         params,
      });
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getManagePairingsData = async (params) => {
   try {
      const result = await axios.get(BASE_URL + '/getManagePairingsData');
      return result.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updatePairing = async (params) => {
   try {
      const queryResult = await axios.post(BASE_URL + '/updatePairing', params);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};
