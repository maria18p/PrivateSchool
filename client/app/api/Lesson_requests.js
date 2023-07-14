import axios from "axios";
import { PORT } from "@env";
import IP from "./config";

const BASE_URL = `http://${IP}:${PORT}/lessons/`;

export const createLesson = async (data) => {
	data = {
		user: { _id: data.user._id, token: data.user.token },
		date: data.date,
		start: data.start,
		end: data.end,
		student: { _id: data.student._id },
		room: data.room,
		subject: data.subject,
	};

	// user: userData,
	// 		date: date,
	// 		start: start,
	// 		end: end,
	// 		student: student,
	// 		room: room,
	// 		subject: subject,

	const result = await axios.post(BASE_URL + "create", data);
	return result.data;
};

export const getUserLessons = async (params) => {
	params.user = {
		_id: params.user._id,
		token: params.token,
	};
	const result = await axios.get(BASE_URL + "/getUserLessons", { params });
	return result.data.data;
};
