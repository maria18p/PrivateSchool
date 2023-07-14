import axios from "axios";
import IP from "./config";
import { PORT } from "@env";

const BASE_URL = `http://${IP}:${PORT}/room/`;

export const addRoom = async (data) => {
	const newRoom = await axios.post(BASE_URL + "addRoom", data);
	return newRoom;
};

export const getAllRooms = async (params) => {
	const allRooms = await axios.get(BASE_URL + "getAllRooms", params);
	return allRooms.data;
};

export const updateRoom = async (data) => {
	const queryResult = await axios.post(BASE_URL + "updateRoom", data);
	return queryResult.data;
};

export const removeRoom = async (data) => {
	const queryResult = await axios.post(BASE_URL + "deleteRoom", data);
	return queryResult.data;
};
