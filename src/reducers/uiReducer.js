import {OPEN_POPUP} from './../constants/UIActions';

const initialState = {
    popupOpen:''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POPUP:
            return {...state,
                    popupOpen:action.popupId}
        default:
            return {...state}
    }
};

export default reducer;