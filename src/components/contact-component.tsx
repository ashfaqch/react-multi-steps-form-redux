import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { AppState, getStep, setStep, updateStep } from '../store';
import { ContactField, ContactModel, Field, Helper, Step } from '../shared';
import FormBreadcrumb from './form-breadcrumb';
import FormNavigation from './form-navigation';

interface IProps {
	model: ContactModel;
	updateStep: typeof updateStep;
	setStep: typeof setStep;
}
interface IState {
	input: ContactField;
	showError: boolean;
}

export class ContactComponent extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			input: new ContactField(),
			showError: false,
		};
	}

	componentDidMount() {
		const { field } = this.props.model;
		this.setState(
			{
				input: {
					email: field.email,
					phone: field.phone,
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
							<Col md={6}>
								<FormGroup>
									<Label for={input.email.name}>{input.email.label}</Label>
									<Input type="text" id={input.email.name} name={input.email.name} value={input.email.value} onChange={this.changeHandler} />
									{showError && input.email.invalid && <p className="error-message">{input.email.error}</p>}
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<FormGroup>
									<Label for={input.phone.name}>{input.phone.label}</Label>
									<Input type="text" id={input.phone.name} name={input.phone.name} value={input.phone.value} onChange={this.changeHandler} />
									{showError && input.phone.invalid && <p className="error-message">{input.phone.error}</p>}
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
			case input.email.name:
				Field.setValue(input.email, value);
				break;
			case input.phone.name:
				Field.setValue(input.phone, value);
				break;
			default:
				break;
		}

		this.validateInputs();
	};

	validateInputs(): void {
		const { input } = this.state;

		input.email = Field.hasValue(input.email);
		input.phone = Field.hasValue(input.phone);

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

		field.email = input.email;
		field.phone = input.phone;

		Promise.resolve(this.props.updateStep(this.props.model)).then(() => {
			this.props.setStep(Step.Review);
		});
	}
}

const mapStateToProps = (state: AppState) => ({
	model: getStep(state.customerForm, Step.Contact),
});

export default connect(mapStateToProps, { updateStep, setStep })(ContactComponent);
