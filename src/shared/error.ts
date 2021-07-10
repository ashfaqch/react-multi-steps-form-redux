export class Error {
	hasError: boolean;
	message: string;

	constructor() {
		this.hasError = false;
		this.message = '';
	}

	static setError(error: Error, message = ''): Error {
		error.hasError = true;
		error.message = message;
		return error;
	}

	static resetError(error: Error): Error {
		error.hasError = false;
		error.message = '';
		return error;
	}
}
