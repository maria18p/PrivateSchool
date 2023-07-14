import axios from "axios";
import IP from "./config";
import { PORT } from "@env";

const BASE_URL = `http://${IP}:${PORT}/api/notifications`;

export const getNotifications = async (data) => {
	data = {
		user: {
			_id: data.user._id,
		},
	};
	const queryResult = await axios.post(BASE_URL + "/getNotifications", data);
	return queryResult.data;
};

export const markNotificationsRead = async (data) => {
	const queryResult = await axios.post(BASE_URL + "/markRead", data);
	return queryResult.data;
};
