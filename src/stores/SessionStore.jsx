"use strict";

import Store from '../Store';

class SessionStore extends Store {

    constructor (dispatcher, register) {
        super(dispatcher, register, window.sessionStorage);
    }

    _createListIfNeeded (key) {
        if (!this.stored[ key ]) {
            this.stored[ key ] = "[]";
        }
    }

    _getJsonArray (key) {
        return JSON.parse(this.stored[ key ] || "[]");
    }

    pushItem (key, value) {
        let arr = this._getJsonArray(key);
        arr.push(value);
        this.stored[ key ] = JSON.stringify(arr);
        this.changed       = true;
    }

    setIndexedItem (key, index, value) {
        this._createListIfNeeded(key);
        let arr = this._getJsonArray(key);
        if (value !== arr[ index ]) {
            arr[ index ]       = value;
            this.stored[ key ] = JSON.stringify(arr);
            this.changed       = true;
        }
    }

    delIndexedItem (key, value) {
        this._createListIfNeeded(key);
        let arr   = this._getJsonArray(key);
        let index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
            this.stored[ key ] = JSON.stringify(arr);
            this.changed       = true;
        }
    }

    cleanUp () {
        this.stored.clear();
        this.changed = true;
    }

}

export default SessionStore;