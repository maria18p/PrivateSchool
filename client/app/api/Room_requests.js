import axios from 'axios';
import IP from './config';
import { PORT } from '@env';

const BASE_URL = `http://${IP}:${PORT}/room/`;

export const addRoom = async (data) => {
   try {
      const newRoom = await axios.post(BASE_URL + 'addRoom', data);
      return newRoom;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const getAllRooms = async (params) => {
   try {
      const allRooms = await axios.get(BASE_URL + 'getAllRooms', params);
      return allRooms.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const updateRoom = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + 'updateRoom', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};

export const removeRoom = async (data) => {
   try {
      const queryResult = await axios.post(BASE_URL + 'deleteRoom', data);
      return queryResult.data;
   } catch (error) {
      console.error('Error:', error);
   }
};
