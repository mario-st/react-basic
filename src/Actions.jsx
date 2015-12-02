"use strict";

import request from "superagent";
import Ajax from './Ajax';

export const LIST_SELECT = 'list_select';

export const MENU_EDIT   = 'menu_edit';
export const MENU_DELETE = 'menu_delete';

export const PENDING_LOAD   = 'pending_load';
export const PENDING_ADD    = 'pending_add';
export const PENDING_EDIT   = 'pending_edit';
export const PENDING_DELETE = 'pending_delete';

export const LOAD   = 'load';
export const ADD    = 'add';
export const EDIT   = 'edit';
export const DELETE = 'delete';

export class Actions {
    constructor (url, request, dispatcher) {
        this._dispatcher = dispatcher;
        this._ajax       = new Ajax(request, dispatcher);
        this._url        = url;
    }

    select (payload) {
        this._dispatcher.dispatch({ action: LIST_SELECT, data: payload });

        // TODO

    }

    menu (action, payload) {
        this._dispatcher.dispatch({ action: action, data: payload });

        // TODO

    }

    add (payload) {
        this._dispatcher.dispatch({ action: PENDING_ADD, data: payload });

        // TODO

    }

    edit (payload) {
        this._dispatcher.dispatch({ action: PENDING_EDIT, data: payload });

        // TODO

    }

    del (payload) {
        this._dispatcher.dispatch({ action: PENDING_DELETE, data: payload });

        // TODO

    }
}
