import { combineReducers } from 'redux';
import leadReducer from './leadReducer';
import scheduleReducer from './scheduleReducer';

const reducers = combineReducers({
    lead: leadReducer,
    schedule:scheduleReducer
})
export default reducers;