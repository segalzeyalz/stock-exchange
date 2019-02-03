import {OPEN_POPUP, CLOSE_POPUP} from './../constants/UIActions';

const initialState = {
    popupOpen:''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POPUP:
            return {...state,
                    popupOpen:true}
        case CLOSE_POPUP:
                return {
                    popupOpen:''
                }
        default:
            return {...state}
    }
};

export default reducer;