import { FormStep, ICustomerMultiStepForm } from '../shared';

export enum CustomerFormAction {
	Initialize = '[Customer Form] Initialize',
	UpdateStep = '[Customer Form] Update Step',
	SetStep = '[Customer Form] Set Step',
}

export function initialize(data: ICustomerMultiStepForm) {
	return {
		type: CustomerFormAction.Initialize,
		payload: data,
	};
}

export function updateStep(data: FormStep) {
	return {
		type: CustomerFormAction.UpdateStep,
		payload: data,
	};
}

export function setStep(data: number) {
	return {
		type: CustomerFormAction.SetStep,
		payload: data,
	};
}

interface ICustomerFormActionInitialize {
	type: CustomerFormAction.Initialize;
	payload: ICustomerMultiStepForm;
}

interface ICustomerFormActionUpdateStep {
	type: CustomerFormAction.UpdateStep;
	payload: FormStep;
}

interface ICustomerFormActionSetStep {
	type: CustomerFormAction.SetStep;
	payload: number;
}

export type CustomerFormActionTypes = ICustomerFormActionInitialize | ICustomerFormActionUpdateStep | ICustomerFormActionSetStep;
