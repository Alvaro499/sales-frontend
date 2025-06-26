export interface ErrorResponse {
	message: string;
	code: number;
	params?: string;
}
export type OkResponse = {
	status: string;
};

export type Response = {
	result: string;
};
