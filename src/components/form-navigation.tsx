import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ICustomerMultiStepForm } from '../shared';
import { AppState, setStep } from '../store';

interface IProps {
	customerForm: ICustomerMultiStepForm;
	submitButtonText: string;
	setStep: typeof setStep;
}

export class FormNavigation extends Component<IProps, {}> {
	render() {
		return (
			<Fragment>
				<Row>
					{this.props.customerForm.currentStepId > 0 && (
						<Col sm={4}>
							<Button type="button" color="secondary" style={{ width: '85px' }} onClick={this.goBack}>
								Back
							</Button>
						</Col>
					)}

					{this.props.customerForm.currentStepId === 0 && (
						<Col sm={4}>
							<Button type="button" color="secondary" style={{ width: '85px' }} tag={Link} to="/customers">
								Exit
							</Button>
						</Col>
					)}

					<Col sm={4}>
						<Button type="submit" color="secondary" style={{ width: '85px' }}>
							{this.props.submitButtonText}
						</Button>
					</Col>
				</Row>
			</Fragment>
		);
	}

	goBack = () => {
		if (this.props.customerForm.currentStepId > 0) {
			this.props.setStep(this.props.customerForm.currentStepId - 1);
		}
	};
}

const mapStateToProps = (state: AppState) => ({
	customerForm: state.customerForm,
});

export default connect(mapStateToProps, { setStep })(FormNavigation);
