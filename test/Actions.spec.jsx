"use strict";

import config from "./Actions.mock";
import Actions, {
    PENDING_ADD,
    ADD,
    PENDING_DELETE,
    DELETE,
    PENDING_EDIT,
    EDIT,
    PENDING_LOAD,
    LOAD
} from "../src/Actions";
import {Dispatcher} from "flux";
import mocker from "superagent-mock";
import request from "superagent";
import expect from "expect";

var handleErrors = (callback) => {
    return (payload) => {
        if (payload.action === "error") {
            throw payload.err;
        }
        callback.call(this, payload);
    };
};

describe("Actions", () => {
    var superagentMock;

    before(() => superagentMock = mocker(request, config));
    after(() => superagentMock.unset());

    it("::add", () => {
        let dispatcher = new Dispatcher();
        let act        = new Actions("https://domain.example/create", request, dispatcher);
        let hero       = {
            "name"       : "Saitama",
            "description": "Saitama (サイタマ, Saitama) is the main protagonist of OnePunch-Man and the most powerful hero alive."
        };

        dispatcher.register(handleErrors((payload) => {
            switch (payload.action) {
                case PENDING_ADD:
                    expect(payload.data).toExist();
                    expect(payload.data._id).toNotExist();
                    break;
                case ADD:
                    expect(payload.data.body).toExist();
                    expect(payload.data.body._id).toExist();
                    expect(payload.data.body.name).toEqual(hero.name);
                    expect(payload.data.body.description).toEqual(hero.description);
                    break;
                case "error":
                    throw payload.err;
                    break;
            }
        }));

        act.add(hero);
    });

    it("::load handle result list", () => {
        let dispatcher = new Dispatcher();
        let action     = new Actions("https://domain.example/", request, dispatcher);
        dispatcher.register(handleErrors((payload) => {
            switch (payload.action) {
                case PENDING_LOAD:
                    expect(payload.data).toNotExist();
                    break;
                case LOAD:
                    expect(payload.data.body.length).toEqual(1);
                    break;
                case "error":
                    throw payload.err;
                    break;
            }
        }));
        action.load();
    });

    it("::edit", () => {
        let dispatcher = new Dispatcher();
        let act        = new Actions("https://domain.example/update", request, dispatcher);
        let hero       = {
            "_id"        : 1,
            "name"       : "Saitama",
            "description": "Say it in less than 10 words!"
        };

        dispatcher.register(handleErrors((payload) => {
            switch (payload.action) {
                case PENDING_EDIT:
                    expect(payload.data).toExist();
                    expect(payload.data._id).toExist();
                    break;
                case EDIT:
                    expect(payload.data.body).toExist();
                    expect(payload.data.body._id).toExist();
                    expect(payload.data.body.name).toEqual(hero.name);
                    expect(payload.data.body.description).toEqual(hero.description);
                    break;
                case "error":
                    throw payload.err;
                    break;
            }
        }));

        act.edit(hero._id, hero);
    });

    it("::load(1) handle single result", () => {
        let dispatcher = new Dispatcher();
        let action     = new Actions("https://domain.example/", request, dispatcher);
        dispatcher.register(handleErrors((payload) => {
            switch (payload.action) {
                case PENDING_LOAD:
                    expect(payload.data).toNotExist();
                    break;
                case LOAD:
                    expect(payload.data.body).toExist();
                    expect(payload.data.body._id).toExist();
                    expect(payload.data.body.name).toExist();
                    expect(payload.data.body.description).toEqual("Say it in less than 10 words!");
                    break;
                case "error":
                    throw payload.err;
                    break;
            }
        }));
        action.load(1);
    });

    it("::del", () => {
        let dispatcher = new Dispatcher();
        let action     = new Actions("https://domain.example/delete/", request, dispatcher);
        dispatcher.register(handleErrors((payload) => {
            switch (payload.action) {
                case PENDING_DELETE:
                    expect(payload.data).toNotExist();
                    break;
                case DELETE:
                    expect(payload.data.ok).toExist();
                    expect(payload.data.status).toEqual(204);
                    expect(payload.data.body).toNotExist();
                    break;
                case "error":
                    throw payload.err;
                    break;
            }
        }));
        action.del(1);
    });

    it("::load(1) handle empty result", () => {
        let dispatcher = new Dispatcher();
        let action     = new Actions("https://domain.example/", request, dispatcher);
        dispatcher.register(handleErrors((payload) => {
            switch (payload.action) {
                case PENDING_LOAD:
                    expect(payload.data).toNotExist();
                    break;
                case LOAD:
                    expect(payload.data.ok).toExist();
                    expect(payload.data.status).toEqual(204);
                    expect(payload.data.body).toNotExist();
                    break;
                case "error":
                    throw payload.err;
                    break;
            }
        }));
        action.load(1);
    });

    it("::load handle empty result list", () => {
        let dispatcher = new Dispatcher();
        let action     = new Actions("https://domain.example/", request, dispatcher);
        dispatcher.register(handleErrors((payload) => {
            switch (payload.action) {
                case PENDING_LOAD:
                    expect(payload.data).toNotExist();
                    break;
                case LOAD:
                    expect(payload.data.ok).toExist();
                    expect(payload.data.status).toEqual(204);
                    expect(payload.data.body).toNotExist();
                    break;
                case "error":
                    throw payload.err;
                    break;
            }
        }));
        action.load();
    });

});