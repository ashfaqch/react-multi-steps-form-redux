import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppLayout from './structure-components/app-layout';

const Home = lazy(() => import('./structure-components/app-home'));
const Customers = lazy(() => import('./components/customers-component'));
const Customer = lazy(() => import('./components/form-multi-step'));
const PageNotFound = lazy(() => import('./structure-components/app-page-not-found'));

export class App extends Component {
	render() {
		return (
			<Router>
				<AppLayout>
					<Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/customers" component={Customers} />
							<Route path="/customer/:id" component={Customer} />
							<Route path="*" component={PageNotFound} />
						</Switch>
					</Suspense>
				</AppLayout>
			</Router>
		);
	}
}
export default App;
