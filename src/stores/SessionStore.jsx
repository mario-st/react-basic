"use strict";

import Store from "./JsonStore";

class LocalStore extends Store {

    constructor (dispatcher, register) {
        super(dispatcher, register, window.sessionStorage);
    }

}

export default LocalStore;