import { createSlice } from "@reduxjs/toolkit";
import actions from "./actions";

export const loadState = async () => {
	return await actions.loadUserData();
};

export const initialState = {
	_id: "none",
	name: "none",
	email: "none",
	role: "none",
	token: null,
	notifications: null,
	chats: null,
	firstName: null,
	lastName: null,
};

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		getData: async (state, payload) => {},
		updateUser: (state, action) => {
			const { _id, name, email, role, token, firstName, lastName } =
				action.payload;
			return {
				...state,
				_id,
				name,
				email,
				role,
				token,
				firstName,
				lastName,
			};
		},
		loadState: async (state) => {
			state = await loadState();
		},

		resetUserData: (state) => {
			console.log("DELETING TOKEN:");
			actions.logout();
			return {
				initialState,
			};
		},

		setUserNotifications: (state, action) => {
			const notifications = action.payload.notifications;

			return { ...state, notifications };
		},

		setUserChats: (state, action) => {
			const chats = action.payload.chats;

			return { ...state, chats };
		},

		updateUserName: (state, action) => {
			const { firstName, lastName } = action.payload;
			const name = firstName;
			return {
				...state,
				name,
				firstName,
				lastName,
			};
		},
	},
});

export const {
	getData,
	updateUser,
	resetUserData,
	setUserNotifications,
	setUserChats,
	updateUserName,
} = user.actions;
export default user.reducer;
