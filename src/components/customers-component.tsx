import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../store';
import { ICustomer } from '../shared';

interface IProps {
	customers: ICustomer[];
}

export class CustomersComponent extends Component<IProps, {}> {
	render() {
		return (
			<Fragment>
				<div className="my-card">
					<div className="my-card-header">Customers</div>
					<div className="my-card-body">
						<Link to={{ pathname: `/customer/${0}` }}>
							<button type="button" className="btn btn-primary float-right" style={{ marginBottom: '20px' }}>
								Add New
							</button>
						</Link>

						<table className="table">
							<thead className="thead-light">
								<tr>
									<th scope="col">#</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Middle Name</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.props.customers.map((item, i) => (
									<tr key={i}>
										<th scope="row">{item.id}</th>
										<td>{item.firstName}</td>
										<td>{item.lastName}</td>
										<td>{item.middleName}</td>
										<td>
											<Link to={{ pathname: `/customer/${item.id}` }}>Edit</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	customers: state.customers,
});

export default connect(mapStateToProps, {})(CustomersComponent);
