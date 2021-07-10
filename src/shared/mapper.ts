import { ICustomer } from './customer-model';
import { Step } from './enums';
import { ICustomerMultiStepForm, FormStep, AccountModel, AddressModel, ContactModel, ReviewModel } from './customer-multi-step-model';

export class Mapper {
	static initializeCustomer(customer: ICustomer): ICustomerMultiStepForm {
		const steps = [] as FormStep[];
		steps.push(this.toAccount(new AccountModel(Step.Account), customer));
		steps.push(this.toAddress(new AddressModel(Step.Address), customer));
		steps.push(this.toContact(new ContactModel(Step.Contact), customer));
		steps.push(this.toReview(new ReviewModel(Step.Review), customer));
		return {
			customerId: customer.id,
			currentStepId: 0,
			steps: steps,
		} as ICustomerMultiStepForm;
	}

	static toAccount(form: AccountModel, customer: ICustomer): AccountModel {
		if (customer.id === 0) {
			return form;
		}

		form.field.firstName.value = customer.firstName;
		form.field.lastName.value = customer.lastName;
		form.field.middleName.value = customer.middleName;
		return form;
	}

	static toAddress(form: AddressModel, customer: ICustomer): AddressModel {
		if (customer.id === 0) {
			return form;
		}

		form.field.street.value = customer.street;
		form.field.city.value = customer.city;
		form.field.state.value = customer.state;
		form.field.zip.value = customer.zip;
		return form;
	}

	static toContact(form: ContactModel, customer: ICustomer): ContactModel {
		if (customer.id === 0) {
			return form;
		}

		form.field.email.value = customer.email;
		form.field.phone.value = customer.phone;
		return form;
	}

	static toReview(form: ReviewModel, customer: ICustomer): ReviewModel {
		if (customer.id === 0) {
			return form;
		}

		form.field.reviewed.value = '';
		return form;
	}

	static toCustomer(form: ICustomerMultiStepForm): ICustomer {
		const account = form.steps.filter((x) => x.stepId === Step.Account)[0] as AccountModel;
		const address = form.steps.filter((x) => x.stepId === Step.Address)[0] as AddressModel;
		const contact = form.steps.filter((x) => x.stepId === Step.Contact)[0] as ContactModel;

		const customer = {
			id: form.customerId,
			firstName: account.field.firstName.value,
			lastName: account.field.lastName.value,
			middleName: account.field.middleName.value,

			street: address.field.street.value,
			city: address.field.city.value,
			state: address.field.state.value,
			zip: address.field.zip.value,

			email: contact.field.email.value,
			phone: contact.field.phone.value,
		} as ICustomer;

		return customer;
	}
}
