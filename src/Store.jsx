"use strict";

import EventEmitter from 'events';

export const EVENT_CHANGE = 'change';

export class Store extends EventEmitter {

    constructor (dispatcher, register, storage) {
        super();
        this.stored = storage || {};
        dispatcher.register(register);
    }

    emitOnChange (action) {
        if (this.changed) {
            this.changed = false;
            this.emit(EVENT_CHANGE, action);
        }
    }

    onChange (fn) {
        this.on(EVENT_CHANGE, fn);
    }

    offChange (fn) {
        this.removeListener(EVENT_CHANGE, fn);
    }

    getItem (key) {
        return this.stored[ key ];
    }

    setItem (key, value) {
        if (this.stored[ key ] !== value) {
            this.stored[ key ] = value;
            this.changed       = true;
        }
    }

    _createListIfNeeded (key) {
        if (!this.stored[ key ]) {
            this.stored[ key ] = [];
        }
    }

    pushItem (key, value) {
        this._createListIfNeeded(key);
        this.stored[ key ].push(value);
        this.changed = true;
    }

    setIndexedItem (key, index, value) {
        this._createListIfNeeded(key);
        if (value !== this.stored[ key ][ index ]) {
            this.stored[ key ][ index ] = value;
            this.changed                = true;
        }
    }

    delIndexedItem (key, value) {
        this._createListIfNeeded(key);
        let index = this.stored[ key ].indexOf(value);
        if (index > -1) {
            this.stored[ key ].splice(index, 1);
            this.changed = true;
        }
    }

    setItems (obj) {
        var keys = Object.keys(obj).filter((value, key) => this.stored[ key ] !== value, this);
        keys.forEach((key) => this.stored[ key ] = obj[ key ], this);
        this.changed = keys.length > 0;
    }

    delItems (...keys) {
        keys = keys.filter((key) => this.stored[ key ], this);
        keys.forEach((key) => delete this.stored[ key ], this);
        this.changed = keys.length > 0;
    }

    cleanUp () {
        this.stored  = {};
        this.changed = true;
    }

}