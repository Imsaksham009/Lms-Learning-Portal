export interface TypeError extends Error {
	status: number;
	path?: string;
	code?: number | string;
	keyValue?: any;
}
