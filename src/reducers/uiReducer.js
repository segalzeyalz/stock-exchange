import { OPEN_POPUP, CLOSE_POPUP, UPDATE_DETAILS } from './../constants/UIActions';

const initialState = {
    popupOpen:'',
    name:'',
    symbol:'',
    Btn:'',
    quantity:'',
    price:''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POPUP:
            return {...state,
                    popupOpen:true,
                    name:action.name,
                    symbol:action.symbol,
                    Btn:action.Btn
                }
        case CLOSE_POPUP:
                return {
                    popupOpen:'',
                    name:'',
                    symbol:'',
                    Btn:''
                }
        case UPDATE_DETAILS:
                return {...state,
                    [action.name]:action.val
                }
        default:
            return {...state}
    }
};

export default reducer;