import express from "express";
import { respond } from "./utility.js";
import {
	getRequestGetLessons,
	postRequestCreateLesson,
} from "../middleware/lessons.js";

const Router = express.Router();

Router.post("/create", async (req, res) => {
	return respond(await postRequestCreateLesson(req.body), res);
});

Router.get("/getUserLessons", async (req, res) => {
	return respond(await getRequestGetLessons(req.query), res);
});

export default Router;
