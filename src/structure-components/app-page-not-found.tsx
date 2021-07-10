import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class AppPageNotFound extends Component {
	render() {
		return (
			<>
				<h2>Page Not Found!</h2>
				<p>
					<Link to="/">Go to Dashboard</Link>
				</p>
			</>
		);
	}
}

export default AppPageNotFound;
