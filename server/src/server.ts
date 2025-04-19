import { app } from "./app";
import DatabaseConnection from "./Database/dbConnect";
require("dotenv").config();

process.on("uncaughtException", (err: Error) => {
	console.log(err.message);
	process.exit(1);
});

const startServer = async () => {
	const newDataBase = new DatabaseConnection();
	await newDataBase.connectDB();

	if (newDataBase.isConnected === false) {
		console.log(
			"Failed to connect Database. Without connecting to database server wont start"
		);
		process.exit(0);
	}

	const server = app.listen(process.env.PORT, () => {
		console.log(`Server is running on PORT=${process.env.PORT}`);
	});

	process.on("SIGTERM", async () => {
		console.log("SIGTERM signal received: closing HTTP server");
		server.close(async () => {
			console.log("HTTP server closed");
			await newDataBase.handleConnectionClose();
			process.exit(1);
		});
	});

	process.on("SIGINT", async () => {
		console.log("SIGINT signal received: closing HTTP server");
		server.close(async () => {
			console.log("HTTP server closed");
			await newDataBase.handleConnectionClose();
			process.exit(0);
		});
	});

	//error handler for rejections
	process.on("unhandledRejection", (err: Error) => {
		console.log(err.message);
		server.close(() => {
			process.exit(1);
		});
	});
};

startServer();
