import { app } from "./app";
import connectDB from "./Database/dbConnect";
require("dotenv").config();

process.on("uncaughtException", (err: Error) => {
	console.log(err.message);
	process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
	console.log("Server is running on PORT=", process.env.PORT);
	connectDB();
});

//error handler for rejections
process.on("unhandledRejection", (err: Error) => {
	console.log(err.message);
	server.close(() => {
		process.exit(1);
	});
});
