import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
	message?: string;
}

export class AppError extends Component<IProps, {}> {
	render() {
		return (
			<>
				<h2>We apologize. Something has gone wrong.</h2>
				{this.props.message && <p style={{ color: 'red' }}>{this.props.message}</p>}
				<p>
					<Link to="/">Go to Dashboard</Link>
				</p>
			</>
		);
	}
}

export default AppError;
