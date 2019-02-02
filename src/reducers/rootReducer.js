import {
    combineReducers
} from 'redux';

import stocksReducer from './stocksReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
    stocks: stocksReducer,
    UI: uiReducer
});

export default rootReducer;