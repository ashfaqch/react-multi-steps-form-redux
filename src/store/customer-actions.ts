import { ICustomer } from '../shared';

export enum CustomerAction {
	CustomerInsert = '[Customer] Insert',
	CustomerUpdate = '[Customer] Update',
}

export function customerInsert(data: ICustomer) {
	return {
		type: CustomerAction.CustomerInsert,
		payload: data,
	};
}

export function customerUpdate(data: ICustomer) {
	return {
		type: CustomerAction.CustomerUpdate,
		payload: data,
	};
}

interface ICustomerInsert {
	type: CustomerAction.CustomerInsert;
	payload: ICustomer;
}

interface ICustomerUpdate {
	type: CustomerAction.CustomerUpdate;
	payload: ICustomer;
}

export type CustomerActionTypes = ICustomerInsert | ICustomerUpdate;
