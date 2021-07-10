import { Field } from './field';

export interface ICustomerMultiStepForm {
	customerId: number;
	currentStepId: number;
	steps: FormStep[];
}

export class FormStep {
	stepId: number = 0;
}

// Step models

export class AccountModel extends FormStep {
	title: string;
	field: AccountField;
	constructor(stepId: number) {
		super();
		this.stepId = stepId;
		this.title = `Customer's Account Information:`;
		this.field = new AccountField();
	}
}

export class AddressModel extends FormStep {
	title: string;
	field: AddressField;
	constructor(stepId: number) {
		super();
		this.stepId = stepId;
		this.title = `Customer's Address Information:`;
		this.field = new AddressField();
	}
}

export class ContactModel extends FormStep {
	title: string;
	field: ContactField;
	constructor(stepId: number) {
		super();
		this.stepId = stepId;
		this.title = `Customer's Contact Information:`;
		this.field = new ContactField();
	}
}

export class ReviewModel extends FormStep {
	title: string;
	field: ReviewField;
	constructor(stepId: number) {
		super();
		this.stepId = stepId;
		this.title = `Review Customer's Information:`;
		this.field = new ReviewField();
	}
}

// Step Field models

export class AccountField {
	firstName: Field;
	lastName: Field;
	middleName: Field;
	constructor() {
		this.firstName = new Field('firstName', 'First Name');
		this.lastName = new Field('lastName', 'Last Name');
		this.middleName = new Field('middleName', 'Middle Name');
	}
}

export class AddressField {
	street: Field;
	city: Field;
	state: Field;
	zip: Field;
	constructor() {
		this.street = new Field('street', 'Street');
		this.city = new Field('city', 'City');
		this.state = new Field('state', 'State');
		this.zip = new Field('zip', 'Zip');
	}
}

export class ContactField {
	email: Field;
	phone: Field;
	constructor() {
		this.email = new Field('email', 'Email');
		this.phone = new Field('phone', 'Phone');
	}
}

export class ReviewField {
	reviewed: Field;
	constructor() {
		this.reviewed = new Field('reviewed', 'Reviewed and Verified');
	}
}
