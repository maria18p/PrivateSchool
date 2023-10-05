import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectUsersModel } from "../schemas/UserSchema.js";
import { connectRoomModel } from "../schemas/RoomSchema.js";
import { connectSubjectModel } from "../schemas/SubjectSchema.js";
import { connectChatModel } from "../schemas/ChatSchema.js";
import { connectMessageModel } from "../schemas/MessageSchema.js";
import { connectNotificationModal } from "../schemas/NotificationSchema.js";
import { connectPairingsModel } from "../schemas/PairingSchema.js";
import { connectLessonModel } from "../schemas/LessonSchema.js";

dotenv.config();

const connectMongoose = async () => {
	mongoose.set({ strictQuery: false });
	const mongo_uri = process.env.DB_URL;
	mongoose.set({ strictQuery: false });
	return await mongoose
		.connect(mongo_uri)
		.then((result) => {
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const setupODM = async () => {
	const dbConnection = await connectMongoose();
	await connectUsersModel(dbConnection);
	await connectRoomModel(dbConnection);
	await connectSubjectModel(dbConnection);
	// await connectMessageModel(dbConnection);
	await connectChatModel(dbConnection);
	await connectNotificationModal(dbConnection);
	await connectPairingsModel(dbConnection);
	await connectLessonModel(dbConnection);
	return dbConnection;
};

export default connectMongoose;
