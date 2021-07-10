export class Helper {
	static canSubmit(fields: any): boolean {
		return Object.keys(fields).some((x) => fields[x].invalid);
	}
}
