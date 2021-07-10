import { ICustomer } from '../shared';
import { CustomerAction, CustomerActionTypes } from './customer-actions';

const customers = [
	{
		id: 1,
		firstName: 'Joe',
		lastName: 'Dow',
		middleName: '',
		street: '1100 Congress Ave',
		city: 'Austin',
		state: 'TX',
		zip: '78701',
		email: 'joe.dow@email.com',
		phone: '1234567890',
	} as ICustomer,
] as ICustomer[];

const initialState = customers;

export function customerReducer(state = initialState, action: CustomerActionTypes): ICustomer[] {
	switch (action.type) {
		case CustomerAction.CustomerInsert:
			return [...state, action.payload];
		case CustomerAction.CustomerUpdate:
			let newState = [...state];
			newState = state.map((item) => (action.payload.id === item.id ? action.payload : item));
			return [...newState];
		default:
			return state;
	}
}
