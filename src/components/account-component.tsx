import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { AppState, getStep, setStep, updateStep } from '../store';
import { AccountField, AccountModel, Field, Helper, Step } from '../shared';
import FormBreadcrumb from './form-breadcrumb';
import FormNavigation from './form-navigation';

interface IProps {
	model: AccountModel;
	updateStep: typeof updateStep;
	setStep: typeof setStep;
}
interface IState {
	input: AccountField;
	showError: boolean;
}

export class AccountComponent extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			input: new AccountField(),
			showError: false,
		};
	}

	componentDidMount() {
		const { field } = this.props.model;
		this.setState(
			{
				input: {
					firstName: field.firstName,
					lastName: field.lastName,
					middleName: field.middleName,
				},
			},
			() => {
				this.validateInputs();
			}
		);
	}

	render() {
		const { input, showError } = this.state;
		return (
			<Fragment>
				<FormBreadcrumb />
				<p className="step-title">{this.props.model.title}</p>
				<Form onSubmit={this.submitHandler} noValidate>
					<div className="step-body">
						<Row>
							<Col md={4}>
								<FormGroup>
									<Label for={input.firstName.name}>{input.firstName.label}</Label>
									<Input type="text" id={input.firstName.name} name={input.firstName.name} value={input.firstName.value} onChange={this.changeHandler} />
									{showError && input.firstName.invalid && <p className="error-message">{input.firstName.error}</p>}
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								<FormGroup>
									<Label for={input.lastName.name}>{input.lastName.label}</Label>
									<Input type="text" id={input.lastName.name} name={input.lastName.name} value={input.lastName.value} onChange={this.changeHandler} />
									{showError && input.lastName.invalid && <p className="error-message">{input.lastName.error}</p>}
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								<FormGroup>
									<Label for={input.middleName.name}>{input.middleName.label}</Label>
									<Input type="text" id={input.middleName.name} name={input.middleName.name} value={input.middleName.value} onChange={this.changeHandler} />
									{showError && input.middleName.invalid && <p className="error-message">{input.middleName.error}</p>}
								</FormGroup>
							</Col>
						</Row>
					</div>
					<div>
						<FormNavigation submitButtonText={'Next'} />
					</div>
				</Form>
			</Fragment>
		);
	}

	changeHandler = (event: any) => {
		const name = event.target.name;
		const value = event.target.value;
		const { input } = this.state;

		switch (name) {
			case input.firstName.name:
				Field.setValue(input.firstName, value);
				break;
			case input.lastName.name:
				Field.setValue(input.lastName, value);
				break;
			case input.middleName.name:
				Field.setValue(input.middleName, value);
				break;
			default:
				break;
		}

		this.validateInputs();
	};

	validateInputs(): void {
		const { input } = this.state;

		input.firstName = Field.hasValue(input.firstName);
		input.lastName = Field.hasValue(input.lastName);

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
		const { input } = this.state;
		const { field } = this.props.model;

		field.firstName = input.firstName;
		field.lastName = input.lastName;
		field.middleName = input.middleName;

		Promise.resolve(this.props.updateStep(this.props.model)).then(() => {
			this.props.setStep(Step.Address);
		});
	}
}

const mapStateToProps = (state: AppState) => ({
	model: getStep(state.customerForm, Step.Account),
});

export default connect(mapStateToProps, { updateStep, setStep })(AccountComponent);
