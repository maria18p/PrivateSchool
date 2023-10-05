import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	chat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat",
		required: true,
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	receiver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	message: String,
	read: {
		type: Boolean,
		default: false,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const connectMessageModel = async (ODM) => {
	await ODM.model("Message", messageSchema);
};
