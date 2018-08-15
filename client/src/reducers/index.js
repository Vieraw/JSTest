import { combineReducers } from 'redux';
import recordReducer from './recordReducer';

export default combineReducers({
    records: recordReducer
})