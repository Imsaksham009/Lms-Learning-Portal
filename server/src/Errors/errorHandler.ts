import { ErrorWithStatus } from "../Types/error";

export class AppError extends Error implements ErrorWithStatus {
	status: number;
	constructor(status: number, message: string = "Something went wrong") {
		super();
		this.message = message;
		this.status = status;
	}
}
