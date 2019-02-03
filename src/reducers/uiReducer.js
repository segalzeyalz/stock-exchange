import {OPEN_POPUP, CLOSE_POPUP} from './../constants/UIActions';

const initialState = {
    popupOpen:'',
    name:'',
    symbol:'',
    Btn:''
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
        default:
            return {...state}
    }
};

export default reducer;