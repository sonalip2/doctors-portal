import { SET_UPDATED_PATIENTS } from '../actions/actionTypes';

const initialState = {
    updatedPatients: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_UPDATED_PATIENTS:
            return {
                ...state,
                updatedPatients: action.payload,
            };
        default:
            return state;
    }
};