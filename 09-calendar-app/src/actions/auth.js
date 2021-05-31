import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const startLogin = (email, password) => async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST');
    const { ok, token, uid, name, msg } = await resp.json();

    if (ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(login({
            uid,
            name,
        }));
    } else {
        Swal.fire('Error', msg, 'error');
    }
};

export const startRegister = (email, password, rname) => async (dispatch) => {
    const resp = await fetchSinToken('auth/new', { email, password, name: rname }, 'POST');
    const { ok, token, uid, name, msg } = await resp.json();

    if (ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(login({
            uid,
            name,
        }));
    } else {
        Swal.fire('Error', msg, 'error');
    }
};

export const startChecking = () => async (dispatch) => {
    const resp = await fetchConToken('auth/renew');
    const { ok, token, uid, name, msg } = await resp.json();

    if (ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(login({
            uid,
            name,
        }));
    } else {
        dispatch(checkingFinish());
    }
};

const checkingFinish = () => ({
    type: types.authCheckingFinish
});

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

export const startLogout = () => (dispatch) => {
    localStorage.clear();
    dispatch(logout());
};

export const logout = () => ({
    type: types.authLogout,
});
