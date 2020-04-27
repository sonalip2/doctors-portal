import * as types from './actionTypes';

export const setUpdatedPatients = (patients) => {
    return ({
        type: types.SET_UPDATED_PATIENTS,
        payload: patients
    })
}