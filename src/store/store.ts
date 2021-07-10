import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { customerReducer } from './customer-reducers';
import { customerFormReducer } from './customer-form-reducers';

const rootReducer = combineReducers({
	customers: customerReducer,
	customerForm: customerFormReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	const middlewares = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));
	return store;
}
