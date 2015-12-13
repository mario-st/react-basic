"use strict";

import EventEmitter from "events";

export const EVENT_CHANGE = "change";

class Store extends EventEmitter {

    /**
     * initializes an instance of a store
     * @param {*} dispatcher
     * @param {Function} register
     * @param {*} storage
     */
    constructor (dispatcher, register, storage) {
        super();
        this.stored = storage || {};
        dispatcher.register(register);
    }

    /**
     * execute change event if something was changed in the store
     * @param {*} action
     */
    emitOnChange (action) {
        if (this.changed) {
            this.changed = false;
            this.emit(EVENT_CHANGE, action);
        }
    }

    /**
     * add event listener on change event
     * @param {Function} fn
     */
    onChange (fn) {
        this.on(EVENT_CHANGE, fn);
    }

    /**
     * remove event listener from change event
     * @param {Function} fn
     */
    offChange (fn) {
        this.removeListener(EVENT_CHANGE, fn);
    }

    /**
     * get an item from the store
     * @param {String} key
     * @returns {*}
     */
    getItem (key) {
        return this.stored[ key ];
    }

    /**
     * add an item to the store
     * @param {String} key
     * @param {*} value
     */
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

    /**
     * append an item to a list inside of the store
     * @param {String} key
     * @param {*} value
     */
    pushItem (key, value) {
        this._createListIfNeeded(key);
        this.stored[ key ].push(value);
        this.changed = true;
    }

    /**
     * set an item in a list of items by index
     * @param {String} key
     * @param {Number} index
     * @param {*} value
     */
    setIndexedItem (key, index, value) {
        this._createListIfNeeded(key);
        if (value !== this.stored[ key ][ index ]) {
            this.stored[ key ][ index ] = value;
            this.changed                = true;
        }
    }

    /**
     * removes an item from a list of items by index
     * @param {String} key
     * @param {*} value
     */
    delIndexedItem (key, value) {
        this._createListIfNeeded(key);
        let index = this.stored[ key ].indexOf(value);
        if (index > -1) {
            this.stored[ key ].splice(index, 1);
            this.changed = true;
        }
    }

    /**
     * insert multiple items in the store
     * @param {Object} obj
     */
    setItems (obj) {
        var keys = Object.keys(obj).filter((value, key) => this.stored[ key ] !== value, this);
        keys.forEach((key) => this.stored[ key ] = obj[ key ], this);
        this.changed = keys.length > 0;
    }

    /**
     * remove multiple items in the store
     * @param {String[]} keys
     */
    delItems (...keys) {
        keys = keys.filter((key) => this.stored[ key ], this);
        keys.forEach((key) => delete this.stored[ key ], this);
        this.changed = keys.length > 0;
    }

    /**
     * remove every item in the store
     */
    cleanUp () {
        this.stored  = {};
        this.changed = true;
    }

}

export default Store;