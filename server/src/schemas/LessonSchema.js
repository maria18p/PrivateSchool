import mongoose from "mongoose";

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	pairing: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Pairing",
		required: true,
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	start: {
		type: Date,
		required: true,
	},
	finish: {
		type: Date,
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const connectLessonModel = async (ODM) => {
	await ODM.model("Lesson", lessonSchema);
};
