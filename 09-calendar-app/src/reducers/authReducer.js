import { types } from '../types/types';

const initialState = {
    checking: true,
    // uid: null,
    // name: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authChecking:
            return {
                ...state,
            };
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false,
            };
        case types.authStartLogin:
            return {
                ...state,
            };
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false,
            };
        case types.authStartRegister:
            return {
                ...state,
            };
        case types.authStartTokenRenew:
            return {
                ...state,
            };
        case types.authLogout:
            return {
                checking: false,
            };
        default:
            return state;
    }
};
