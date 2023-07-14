import express from "express";
import cors from "cors";
import colors from "colors";
import userRoutes from "../routes/userRoutes.js";
import subjectRoutes from "../routes/subjectRoutes.js";
import roomRoutes from "../routes/roomRoutes.js";
import pairingRoutes from "../routes/pairingRoutes.js";
import lessonRoutes from "../routes/lessonRoutes.js";

const PORT = process.env.PORT || 3005;

const config_app = async () => {
	const app = express();
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(cors({}));
	app.use("/api", userRoutes);
	app.use("/sub", subjectRoutes);
	app.use("/room", roomRoutes);
	app.use("/pair", pairingRoutes);
	app.use("/lessons", lessonRoutes);

	listen_port(app);
};

const listen_port = (app) => {
	app.listen(PORT, () =>
		console.log(`Server started via port ${PORT}`.blue.bold)
	);
};

export default config_app;
