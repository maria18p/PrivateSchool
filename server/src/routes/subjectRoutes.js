import express from "express";
import { respond } from "./utility.js";
import {
	deleteSubjectRequest,
	getAllSubjects,
	getUserSubjects,
	postAssignSubjectToStudent,
	postAssignSubjectToTeacher,
	postSubjectRequest,
	postUpdateSubject,
} from "../middleware/subjects.js";
import { getSubjectTeachers } from "../controllers/SubjectActions.js";
import { getPairingSubjects } from "../middleware/pairings.js";

const Router = express.Router();

Router.post("/addSubject", async (req, res) => {
	return respond(await postSubjectRequest(req.body), res);
});

Router.get("/getAllSubjects", async (req, res) => {
	return respond(await getAllSubjects(req.query), res);
});

Router.delete("/deleteSubject/:id", async (req, res) => {
	const result = { id: req.params.id };
	return respond(await deleteSubjectRequest(result), res);
});

Router.post("/addTeacherSubject", async (req, res) => {
	return respond(await postAssignSubjectToTeacher(req.body), res);
});

Router.post("/updateSubject", async (req, res) => {
	return respond(await postUpdateSubject(req.body), res);
});

Router.post("/addStudentSubject", async (req, res) => {
	return respond(await postAssignSubjectToStudent(req.body), res);
});

Router.get("/getUserSubjects", async (req, res) => {
	return respond(await getUserSubjects(req.query), res);
});

Router.get("/subjectTeachers", async (req, res) => {
	return respond(await getSubjectTeachers(req.query), res);
});

Router.get("/pairingSubjects", async (req, res) => {
	return respond(await getPairingSubjects(req.query), res);
});

Router.post("/unpairTeacherSubjects", async (req, res) => {
	return respond(await unpairTeacherSubject(req.body), res);
});

export default Router;
