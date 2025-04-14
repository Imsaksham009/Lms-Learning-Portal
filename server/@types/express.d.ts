// Create this file at @types/express/index.d.ts
import { IUser } from "../../src/Models/User/userModel";

declare global {
	namespace Express {
		interface Request {
			user?: IUser | null;
		}
	}
}
