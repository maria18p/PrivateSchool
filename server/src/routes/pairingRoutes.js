import express from "express";
import { respond } from "./utility.js";
import {
	getAllPairings,
	getPairingSubjects,
	getRequestManagePairings,
	getTeacherStudents,
	pairTeacherToStudent,
	postRequestUpdatePairing,
} from "../middleware/pairings.js";

const Router = express.Router();

// Router.get('/studentPairings', async (req, res) => {
//   return respond(await getAllStudentPairings(req.query), res);
// });

// Router.get('/teacherPairings', async (req, res) => {
//   return respond(await getAllTeacherPairings(req.query), res);
// });

Router.get("/getManagePairingsData", async (req, res) => {
	return respond(await getRequestManagePairings(req.query), res);
});

Router.get("/getPairings", async (req, res) => {
	return respond(await getAllPairings(req.query), res);
});

Router.post("/pairTeacherToStudent", async (req, res) => {
	return respond(await pairTeacherToStudent(req.body), res);
});

Router.get("/getTeacherStudents", async (req, res) => {
	return respond(await getTeacherStudents(req.query), res);
});

Router.get("/pairingSubjects", async (req, res) => {
	return respond(await getPairingSubjects(req.query), res);
});

Router.post("/updatePairing", async (req, res) => {
	return respond(await postRequestUpdatePairing(req.body), res);
});

export default Router;
