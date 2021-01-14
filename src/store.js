import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
	notification: notificationReducer,
	blogs: blogsReducer,
	user: userReducer
});

const store = createStore(reducer, composeWithDevTools(
	applyMiddleware(thunk)
));

export default store;