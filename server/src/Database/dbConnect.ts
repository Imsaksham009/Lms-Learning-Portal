import mongoose, { Error } from "mongoose";

const MAX_RETRIES: number = 1;
const TIMEOUT: number = 5000;

class DatabaseConnection {
	retryCount: number;
	isConnected: boolean;
	constructor() {
		this.retryCount = 0;
		this.isConnected = false;

		mongoose.set("strictQuery", true);

		mongoose.connection.on("connecting", () => {
			console.log("DataBase is Connecting...");
			this.isConnected = false;
		});

		mongoose.connection.on("connected", () => {
			console.log("DataBase Connected Successfully");
			this.isConnected = true;
		});

		mongoose.connection.on("error", () => {
			console.log("DataBase error occured");
			this.isConnected = false;
		});

		mongoose.connection.on("disconnected", () => {
			console.log("DataBase disconnected successfully");
			this.isConnected = false;
		});
	}

	async connectDB() {
		try {
			const dbUrl: any = process.env.DB_URL;
			if (!dbUrl) {
				throw new Error("DB_URL is not defined in environment variables");
			}

			const connectionOptions = {
				maxPoolSize: 10,
				family: 4,
			};

			if (process.env.NODE_ENV === "development") mongoose.set("debug", true);

			await mongoose.connect(dbUrl, connectionOptions);
			this.retryCount = 0;
		} catch (error) {
			console.error("Database connection error:");
			await this.handleConnectionError(error);
		}
	}

	async handleConnectionError(error: any) {
		if (this.retryCount < MAX_RETRIES) {
			console.log("Retrying the database connection...");
			this.retryCount++;
			await new Promise((resolve) => setTimeout(resolve, TIMEOUT));
			return this.connectDB();
		} else {
			console.log(
				"Error connecting the database. Please check the database connection handling...\n Here is the error stack:- ",
				error
			);
		}
	}

	async handleConnectionClose() {
		console.log("Closing database connection");
		if (mongoose.connection.readyState !== 0) {
			await mongoose.connection.close();
			console.log("MongoDB connection closed");
		}
	}
}

export const databaseConnect = new DatabaseConnection();
