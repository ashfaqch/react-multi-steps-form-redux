import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, NavLink, Row } from 'reactstrap';
import { ICustomerMultiStepForm, Step } from '../shared';
import { AppState, setStep, updateStep } from '../store';

interface IProps {
	customerForm: ICustomerMultiStepForm;
	updateStep: typeof updateStep;
	setStep: typeof setStep;
}

export class FormBreadcrumb extends Component<IProps, {}> {
	render() {
		const { customerForm } = this.props;

		const isDisabled = (stepId: number) => {
			const step = customerForm.steps.filter((x) => x.stepId === stepId)[0];
			return step.stepId > customerForm.currentStepId ? true : false;
		};

		const styleLink = (stepId: number) => {
			if (customerForm.currentStepId === stepId) {
				return 'active';
			} else {
				return 'inactive';
			}
		};

		return (
			<Fragment>
				<Row>
					<Col sm={12}>
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<NavLink className={styleLink(Step.Account)} onClick={() => this.onClickGoStep(Step.Account)} disabled={isDisabled(Step.Account)}>
										Account
									</NavLink>
								</li>
								<li className="breadcrumb-item">
									<NavLink className={styleLink(Step.Address)} onClick={() => this.onClickGoStep(Step.Address)} disabled={isDisabled(Step.Address)}>
										Address
									</NavLink>
								</li>
								<li className="breadcrumb-item">
									<NavLink className={styleLink(Step.Contact)} onClick={() => this.onClickGoStep(Step.Contact)} disabled={isDisabled(Step.Contact)}>
										Contact
									</NavLink>
								</li>
								<li className="breadcrumb-item">
									<NavLink className={styleLink(Step.Review)} disabled={isDisabled(Step.Review)}>
										Review
									</NavLink>
								</li>
							</ol>
						</nav>
					</Col>
				</Row>
			</Fragment>
		);
	}

	onClickGoStep(stepId: number): void {
		this.props.setStep(stepId);
	}
}

const mapStateToProps = (state: AppState) => ({
	customerForm: state.customerForm,
});

export default connect(mapStateToProps, { updateStep, setStep })(FormBreadcrumb);
