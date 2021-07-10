import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { AppState, customerInsert, customerUpdate, getStep, setStep, updateStep } from '../store';
import { Field, Helper, ICustomer, ICustomerMultiStepForm, Mapper, ReviewField, ReviewModel, Step } from '../shared';
import styled from 'styled-components';
import FormBreadcrumb from './form-breadcrumb';
import FormNavigation from './form-navigation';

interface IProps {
	model: ReviewModel;
	customers: ICustomer[];
	customerForm: ICustomerMultiStepForm;
	customerInsert: typeof customerInsert;
	customerUpdate: typeof customerUpdate;
	updateStep: typeof updateStep;
	setStep: typeof setStep;
	history: any;
}

interface IState {
	input: ReviewField;
	showError: boolean;
	customer: ICustomer;
	isBusy: boolean;
}

const StylesTable = styled.div`
	table {
		th {
			text-align: right;
			padding-right: 1rem;
		}
	}
`;

export class ReviewComponent extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			input: new ReviewField(),
			showError: false,
			customer: {} as ICustomer,
			isBusy: true,
		};
	}

	componentDidMount() {
		Promise.resolve(Mapper.toCustomer(this.props.customerForm)).then((mappedCustomer: ICustomer) => {
			this.setState(
				{
					customer: mappedCustomer,
					isBusy: false,
				},
				() => {
					this.validateInputs();
				}
			);
		});
	}

	render() {
		const { input, showError, customer, isBusy } = this.state;

		if (isBusy) {
			return <>Loading...</>;
		}

		return (
			<Fragment>
				<FormBreadcrumb />
				<p className="step-title">{this.props.model.title}</p>
				<Form onSubmit={this.submitHandler} noValidate>
					<div className="step-body">
						<StylesTable>
							<table>
								<tbody>
									<tr>
										<th>First Name:</th>
										<td>{customer.firstName}</td>
									</tr>
									<tr>
										<th>Last Name:</th>
										<td>{customer.lastName}</td>
									</tr>
									<tr>
										<th>Middle Name:</th>
										<td>{customer.middleName}</td>
									</tr>
									<tr>
										<th>Street:</th>
										<td>{customer.street}</td>
									</tr>
									<tr>
										<th>City:</th>
										<td>{customer.city}</td>
									</tr>
									<tr>
										<th>State:</th>
										<td>{customer.state}</td>
									</tr>
									<tr>
										<th>Zip:</th>
										<td>{customer.zip}</td>
									</tr>
									<tr>
										<th>Email:</th>
										<td>{customer.email}</td>
									</tr>
									<tr>
										<th>Phone:</th>
										<td>{customer.phone}</td>
									</tr>
								</tbody>
							</table>
						</StylesTable>

						<Row style={{ marginTop: 40 }}>
							<Col>
								<FormGroup check>
									<Label check>
										<Input
											type="checkbox"
											id={input.reviewed.name}
											name={input.reviewed.name}
											checked={input.reviewed.value === 'true' ? true : false}
											onChange={this.changeHandler}
										/>
										<span style={{ marginLeft: 10, verticalAlign: 'text-top' }}>{input.reviewed.label}</span>
									</Label>
								</FormGroup>
								{showError && input.reviewed.invalid && <p className="error-message">{input.reviewed.error}</p>}
							</Col>
						</Row>
					</div>
					<div>
						<FormNavigation submitButtonText={'Submit'} />
					</div>
				</Form>
			</Fragment>
		);
	}

	changeHandler = (event: any) => {
		const target = event.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { input } = this.state;

		switch (name) {
			case input.reviewed.name:
				const reviewed = value === true ? 'true' : 'false';
				Field.setValue(input.reviewed, reviewed);
				break;
			default:
				break;
		}
		this.validateInputs();
	};

	validateInputs(): void {
		const { input } = this.state;
		input.reviewed = Field.hasValue(input.reviewed);
		this.setState({ input: input });
	}

	submitHandler = (event: any) => {
		event.preventDefault();

		if (Helper.canSubmit(this.state.input)) {
			this.setState({ showError: true });
			return;
		} else {
			this.saveHandler();
		}
	};

	saveHandler(): void {
		const { input, customer } = this.state;
		const { field } = this.props.model;

		field.reviewed = input.reviewed;

		if (this.props.customerForm.customerId === 0) {
			const maxId = Math.max(...this.props.customers.map((o) => o.id), 0);
			customer.id = maxId + 1;
			this.props.customerInsert(customer);
		} else {
			this.props.customerUpdate(customer);
		}

		Promise.resolve(this.props.updateStep(this.props.model)).then(() => {
			return this.props.history.push('/customers');
		});
	}
}

const mapStateToProps = (state: AppState) => ({
	model: getStep(state.customerForm, Step.Review),
	customers: state.customers,
	customerForm: state.customerForm,
});

export default connect(mapStateToProps, { customerInsert, customerUpdate, updateStep, setStep })(ReviewComponent);
