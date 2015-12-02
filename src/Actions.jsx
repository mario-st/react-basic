"use strict";

import request from "superagent";
import Ajax from './Ajax';

export const LIST_SELECT = 'list_select';

export const MENU_EDIT   = 'menu_edit';
export const MENU_DELETE = 'menu_delete';

export const PENDING_ADD    = 'pending_add';
export const PENDING_EDIT   = 'pending_edit';
export const PENDING_DELETE = 'pending_delete';

export const ADD    = 'add';
export const EDIT   = 'edit';
export const DELETE = 'delete';

export class AtomActions {
    constructor (request, dispatcher) {
        this._dispatcher = dispatcher;
        this._ajax       = new Ajax(request, dispatcher);
    }

    select (payload) {
        this._dispatcher.dispatch({ action: LIST_SELECT, data: payload });
    }

    menu (action, payload) {
        this._dispatcher.dispatch({ action: action, data: payload });
    }

    add (payload) {
        this._dispatcher.dispatch({ action: ADD, data: payload });
    }

    edit (payload) {
        this._dispatcher.dispatch({ action: EDIT, data: payload });
    }

    del (payload) {
        this._dispatcher.dispatch({ action: DELETE, data: payload });
    }
}
