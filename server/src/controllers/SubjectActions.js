import mongoose from "mongoose";
import {
	ODM,
	requestFailure,
	requestSuccess,
} from "../middleware/commonModule.js";
import { findSubjectTeachers } from "./UserActions.js";

export const createSubject = async (req) => {
	try {
		const subject = await ODM.models.Subject({
			_id: new mongoose.Types.ObjectId(),
			name: req.name,
		});
		await subject.save();
		console.log("Subject created: " + subject + "\n");
		return { success: true, message: "Subject created successfully" };
	} catch (e) {
		console.log("ERROR CREATING SUBJECT " + e.message);
		return { success: false, message: "SOMETHING WENT WRONG !" };
	}
};

export const getSubjects = async (req) => {
	let filter = {};
	if (req) {
		if (req.name) filter.name = req.name;
		if (req._id) filter._id = req._id;
	}
	try {
		const result = await ODM.models.Subject.find(filter);
		return result;
	} catch (e) {
		console.log("e", e);
		return [];
	}
};

export const removeSubject = async (req) => {
	try {
		const result = await ODM.models.Subject.findOneAndRemove({
			name: req.name,
		});

		return result
			? { success: true, message: "Subject deleted" }
			: { success: false, message: "Subject not deleted" };
	} catch (e) {
		console.log("ERROR DELETING SUBJECT", e);
		return { success: false, message: "Something went wrong" };
	}
};

export const getAllSubjectsByKeys = async (req) => {
	let result = [];
	const allSubjects = await getSubjects();
	allSubjects.forEach((subject) => {
		if (req.includes(subject._id)) {
			result.push(subject);
		}
	});
	return result;
};

export const getSubjectTeachers = async (req) => {
	const result = await findSubjectTeachers({
		subject: req.subject_id,
	});
	return requestSuccess({ success: true, data: result });
};

export const updateSubject = async (req) => {
	try {
		const filter = { _id: req.subject._id };
		const update = { name: req.subject.name };
		const result = await ODM.models.Subject.findOneAndUpdate(filter, update);
		return { success: true, message: "Subject updated successfully" };
	} catch (e) {
		console.log("ERROR UPDATING SUBJECT", e);
		return { success: false, message: "Subject not updated" };
	}
};
