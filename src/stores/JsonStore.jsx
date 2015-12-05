"use strict";

import Store from '../Store';
import mapValues from "lodash/object/mapValues";

class SessionStore extends Store {

    constructor (dispatcher, register, storage) {
        super(dispatcher, register, storage);
    }

    _createListIfNeeded (key) {
        if (!this.stored[ key ]) {
            this.stored[ key ] = "[]";
        }
    }

    _getJsonArray (key) {
        return JSON.parse(this.stored[ key ] || "[]");
    }

    setItem (key, value) {
        super.setItem(key, JSON.stringify(value));
    }

    setItems (obj) {
        super.setItems(mapValues(obj, (value) => JSON.stringify(value)));
    }

    getItem (key) {
        return JSON.parse(super.getItem(key) || "null");
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