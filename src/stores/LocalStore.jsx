"use strict";

import Store from "./JsonStore";

class LocalStore extends Store {

    constructor (dispatcher, register) {
        super(dispatcher, register, window.localStorage);
    }

}

export default LocalStore;