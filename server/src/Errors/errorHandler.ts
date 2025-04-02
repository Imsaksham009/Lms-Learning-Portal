import { TypeError } from "../Types/error";

export class AppError extends Error implements TypeError {
	status: number;
	constructor(status: number, message: string = "Something went wrong") {
		super();
		this.message = message;
		this.status = status;
	}
}
