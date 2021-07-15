import { types } from '../../types/types';

describe('Pruebas en types.js', () => {
    test('Los types deben de ser iguales', () => {
        expect( types ).toEqual({
            uiOpenModal: '[UI] Open Modal',
            uiCloseModal: '[UI] Close Modal',
        
            eventAddNew: '[event] Add new',
            eventStartAddNew: '[event] Start add new',
            eventSetActive: '[event] Set active',
            eventLogout: '[event] Clean events',
            eventClearActive: '[event] Clear active',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events loaded',
        
            authChecking: '[auth] Checking login state',
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
        });
    });
});
