import { ICustomer, ICustomerMultiStepForm, Mapper } from '../shared';
import { CustomerFormAction, CustomerFormActionTypes } from './customer-form-actions';

const initialState = Mapper.initializeCustomer({ id: 0 } as ICustomer);

export function customerFormReducer(state = initialState, action: CustomerFormActionTypes): ICustomerMultiStepForm {
	switch (action.type) {
		case CustomerFormAction.Initialize:
			return { ...state, ...action.payload };
		case CustomerFormAction.UpdateStep:
			state.steps.map((item) => (action.payload.stepId === item.stepId ? action.payload : item));
			return { ...state };
		case CustomerFormAction.SetStep:
			state.currentStepId = action.payload;
			return { ...state };
		default:
			return state;
	}
}

export function getStep(state: ICustomerMultiStepForm, stepId: number): any {
	return state.steps.filter((x) => x.stepId === stepId)[0];
}
