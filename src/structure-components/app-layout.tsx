import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AppNavbar from './app-navbar';

export class AppLayout extends Component {
	render() {
		return (
			<>
				<AppNavbar />
				<Container className="container" fluid={true}>
					{this.props.children}
				</Container>
			</>
		);
	}
}

export default AppLayout;
