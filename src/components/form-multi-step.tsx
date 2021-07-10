import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AppState, initialize } from '../store';
import { ICustomer, ICustomerMultiStepForm, Step, Error, Mapper } from '../shared';
import AccountComponent from './account-component';
import AddressComponent from './address-component';
import ContactComponent from './contact-component';
import ReviewComponent from './review-component';
import AppError from '../structure-components/app-error';

interface IProps extends RouteComponentProps<{ id: string }> {
	customers: ICustomer[];
	customerForm: ICustomerMultiStepForm;
	initialize: typeof initialize;
}
interface IState {
	id: string;
	isBusy: boolean;
	error: Error;
}
export class FormMultiStep extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			isBusy: true,
			error: new Error(),
		};
	}

	componentDidMount() {
		this.initializeCustomer();
	}

	render() {
		if (this.state.isBusy) {
			return <>Loading...</>;
		}

		if (this.state.error.hasError) {
			return <AppError message={this.state.error.message} />;
		}

		const heading = Number(this.state.id) > 0 ? 'Edit Customer' : 'New Customer';

		const selectedComponent = () => {
			switch (this.props.customerForm.currentStepId) {
				case Step.Account:
					return <AccountComponent />;
				case Step.Address:
					return <AddressComponent />;
				case Step.Contact:
					return <ContactComponent />;
				case Step.Review:
					return <ReviewComponent history={this.props.history} />;
				default:
					return <></>;
			}
		};

		return (
			<Fragment>
				<div className="my-card">
					<div className="my-card-header">{heading}</div>
					<div className="my-card-body">
						<>{selectedComponent()}</>
					</div>
				</div>
			</Fragment>
		);
	}

	initializeCustomer(): void {
		const customerId = Number(this.state.id);

		if (isNaN(customerId)) {
			console.log('customer id is invalid');
			this.setState({ isBusy: false, error: Error.setError(this.state.error, `${this.state.id} is not a valid id.`) });
		}

		if (customerId === 0) {
			this.setFormData({ id: 0 } as ICustomer);
		} else {
			const customer = this.props.customers.filter((x) => x.id === customerId)[0];
			if (!customer) {
				console.log('customer id is invalid');
				this.setState({ isBusy: false, error: Error.setError(this.state.error, `${this.state.id} is not a valid id.`) });
			}

			this.setFormData(customer);
		}
	}

	setFormData(customer: ICustomer): void {
		let customerObject = Object.assign({} as ICustomer, customer);
		const customerForm = Mapper.initializeCustomer(customerObject);

		Promise.resolve(this.props.initialize(customerForm)).then(() => {
			this.setState({ isBusy: false });
		});
	}
}

const mapStateToProps = (state: AppState) => ({
	customers: state.customers,
	customerForm: state.customerForm,
});

export default connect(mapStateToProps, { initialize })(FormMultiStep);
