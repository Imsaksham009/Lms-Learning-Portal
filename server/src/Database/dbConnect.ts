import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const dbUrl: string = process.env.DB_URL || "";
		if (!dbUrl) {
			throw new Error("DB_URL is not defined in environment variables");
		}

		await mongoose.connect(dbUrl);
		console.log("Database Connected");
	} catch (error) {
		console.error("Database connection error:", error);
		process.exit(1);
	}
};

export default connectDB;
