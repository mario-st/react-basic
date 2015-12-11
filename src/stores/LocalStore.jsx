"use strict";

import Store from "./JsonStore";

class LocalStore extends Store {

    constructor (dispatcher, register) {
        super(dispatcher, register, window.localStorage);
    }

    cleanUp () {
        this.stored.clear();
        this.changed = true;
    }

}

export default LocalStore;