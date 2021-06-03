import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { types } from '../types/types';

export const eventStartAddNew = (event) => async (dispatch, getState) => {
    try {
        const { uid, name } = getState().auth;

        const resp = await fetchConToken('events', event, 'POST');
        const body = await resp.json();

        if (body.ok) {
            dispatch(eventAddNew({
                ...event,
                id: body.evento.id,
                user: {
                    _id: uid,
                    name
                }
            }));
        }
    } catch (error) {
        console.log(error);
    }
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActive
});

export const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventStartLoading = () => async (dispatch) => {
    try {
        const resp = await fetchConToken('events');
        const body = await resp.json();
        if (body.ok) {
            dispatch(eventLoaded(prepareEvents(body.eventos)));
        }
    } catch (error) {
        console.log(error);
    }
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events,
});

export const eventStartUpdate = (event) => async (dispatch) => {
    try {
        const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
        const body = await resp.json();
        if (body.ok) {
            dispatch(eventUpdated(event));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    } catch (error) {
        console.log(error);
    }
};

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});