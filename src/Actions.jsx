"use strict";

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

export default class Actions {
    constructor (url, request, dispatcher) {
        this._dispatcher = dispatcher;
        this._ajax       = new Ajax(request, dispatcher);
        this._url        = url;
    }

    load (id) {
        this._dispatcher.dispatch({ action: PENDING_LOAD });
        this._ajax.get(LOAD, this._url + (id || ""));
    }

    add (payload) {
        this._dispatcher.dispatch({ action: PENDING_ADD, data: payload });
        this._ajax.post(ADD, this._url + "create", null, payload);
    }

    edit (payload) {
        this._dispatcher.dispatch({ action: PENDING_EDIT, data: payload });
        this._ajax.put(EDIT, this._url + "update", null, payload);
    }

    del (id) {
        this._dispatcher.dispatch({ action: PENDING_DELETE });
        this._ajax.del(DELETE, this._url + "delete/" + (id || ""));
    }
}
