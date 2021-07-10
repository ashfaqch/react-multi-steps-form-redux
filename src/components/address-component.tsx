import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { AppState, getStep, setStep, updateStep } from '../store';
import { AddressField, AddressModel, Field, Helper, Step } from '../shared';
import FormBreadcrumb from './form-breadcrumb';
import FormNavigation from './form-navigation';

interface IProps {
	model: AddressModel;
	updateStep: typeof updateStep;
	setStep: typeof setStep;
}
interface IState {
	input: AddressField;
	showError: boolean;
}

export class AddressComponent extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			input: new AddressField(),
			showError: false,
		};
	}

	componentDidMount() {
		const { field } = this.props.model;
		this.setState(
			{
				input: {
					street: field.street,
					city: field.city,
					state: field.state,
					zip: field.zip,
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
									<Label for={input.street.name}>{input.street.label}</Label>
									<Input type="text" id={input.street.name} name={input.street.name} value={input.street.value} onChange={this.changeHandler} />
									{showError && input.street.invalid && <p className="error-message">{input.street.error}</p>}
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={4}>
								<FormGroup>
									<Label for={input.city.name}>{input.city.label}</Label>
									<Input type="text" id={input.city.name} name={input.city.name} value={input.city.value} onChange={this.changeHandler} />
									{showError && input.city.invalid && <p className="error-message">{input.city.error}</p>}
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<FormGroup>
									<Label for={input.state.name}>{input.state.label}</Label>
									<Input type="text" id={input.state.name} name={input.state.name} value={input.state.value} onChange={this.changeHandler} />
									{showError && input.state.invalid && <p className="error-message">{input.state.error}</p>}
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={3}>
								<FormGroup>
									<Label for={input.zip.name}>{input.zip.label}</Label>
									<Input type="text" id={input.zip.name} name={input.zip.name} value={input.zip.value} onChange={this.changeHandler} />
									{showError && input.zip.invalid && <p className="error-message">{input.zip.error}</p>}
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
			case input.street.name:
				Field.setValue(input.street, value);
				break;
			case input.city.name:
				Field.setValue(input.city, value);
				break;
			case input.state.name:
				Field.setValue(input.state, value);
				break;
			case input.zip.name:
				Field.setValue(input.zip, value);
				break;
			default:
				break;
		}

		this.validateInputs();
	};

	validateInputs(): void {
		const { input } = this.state;

		input.street = Field.hasValue(input.street);
		input.city = Field.hasValue(input.city);
		input.state = Field.hasValue(input.state);
		input.zip = Field.hasValue(input.zip);

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

		field.street = input.street;
		field.city = input.city;
		field.state = input.state;
		field.zip = input.zip;

		Promise.resolve(this.props.updateStep(this.props.model)).then(() => {
			this.props.setStep(Step.Contact);
		});
	}
}

const mapStateToProps = (state: AppState) => ({
	model: getStep(state.customerForm, Step.Address),
});

export default connect(mapStateToProps, { updateStep, setStep })(AddressComponent);
