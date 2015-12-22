"use strict";

import Ajax from './Ajax';

export const PENDING_LOAD   = 'pending_load';
export const PENDING_SAVE   = 'pending_save';
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

    setUrl (url) {
        this._url = url;
    }

    upload () {
        throw new Error("not implemented, yet.");
    }

    load (query) {
        this._dispatcher.dispatch({ action: PENDING_LOAD });
        if ("object" === query) {
            this._ajax.get(LOAD, this._url, query);
        } else {
            this._ajax.get(LOAD, this._url + query);
        }
    }

    save (payload) {
        let id = payload._id || payload.id;
        this._dispatcher.dispatch({ action: PENDING_SAVE, data: payload });
        if (id) {
            this._ajax.put(EDIT, this._url + id, null, payload);
        } else {
            this._ajax.post(ADD, this._url, null, payload);
        }
    }

    add (payload) {
        this._dispatcher.dispatch({ action: PENDING_ADD, data: payload });
        this._ajax.post(ADD, this._url, null, payload);
    }

    edit (payload) {
        let id = payload._id || payload.id;
        this._dispatcher.dispatch({ action: PENDING_EDIT, data: payload });
        this._ajax.put(EDIT, this._url, null, payload);
    }

    del (id) {
        this._dispatcher.dispatch({ action: PENDING_DELETE });
        this._ajax.del(DELETE, this._url + id);
    }
}
