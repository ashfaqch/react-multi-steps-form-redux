import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink } from 'reactstrap';

interface IProps {}
interface IState {
	collapsed: boolean;
}

export class AppNavbar extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	toggleNavbar = () => {
		this.setState({ collapsed: !this.state.collapsed });
	};

	render() {
		return (
			<>
				<Navbar color="dark" dark expand="md" style={{ marginBottom: '10px' }}>
					<NavbarBrand tag={Link} to="/">
						My App
					</NavbarBrand>
					<NavbarToggler onClick={this.toggleNavbar} />
					<Collapse isOpen={this.state.collapsed} navbar>
						<Nav className="mr-auto" navbar>
							<NavItem>
								<NavLink tag={Link} to="/customers">
									Customers
								</NavLink>
							</NavItem>
						</Nav>
						<NavbarText></NavbarText>
					</Collapse>
				</Navbar>
			</>
		);
	}
}
export default AppNavbar;
