import {combineReducers} from 'redux';

interface action {
    type: string,
    data?: any
}

const login = (state: {} = {}, action: action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...action.data,
            };
            break;
        default:
            return state;
    }
}
export default combineReducers({
    login
});
