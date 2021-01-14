import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
	notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(
	applyMiddleware(thunk)
));

export default store;