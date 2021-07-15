import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initState = {
    modalOpen: false,
};

describe('Pruebas en uiReducer', () => {
    test('Debe de retornar el estado por defecto', () => {
        const state = uiReducer(initState, {});

        expect( state ).toEqual(initState);
    });

    test('Debe de abrir y cerrar el modal', () => {
        const openModal = uiOpenModal();

        let state = uiReducer(initState, openModal);

        expect( state ).toEqual({ modalOpen: true });

        const closeModal = uiCloseModal();

        state = uiReducer(initState, closeModal);

        expect( state ).toEqual({ modalOpen: false });
    });
});
