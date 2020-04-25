import {createStore, applyMiddleware} from 'redux';
//引入Reducer
import Reducer from './reducers';
//引入中间件
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const configureStore = (initialState) => {
    const store = createStoreWithMiddleware(Reducer, initialState);
    return store;
}
export default configureStore()
