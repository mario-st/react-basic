"use strict";

import expect from "expect";
import request from "superagent";
import mocker from "superagent-mock";
import {Dispatcher} from "flux";
import config from "./Ajax.mock";
import Ajax, {ERR_DEFAULT, ERR_TIMEOUT, HEADER_DATA_TYPE, NOT_AUTHORIZED, TIMEOUT} from "../src/Ajax";

describe("Ajax", () => {
    var superagentMock;

    before(() => superagentMock = mocker(request, config));
    after(() => superagentMock.unset());

    it("::get", () => {
        let dispatcher = new Dispatcher();
        let ajax = new Ajax(request, dispatcher);
        let heroName = "Harley Quinn";

        dispatcher.register((payload) => {
            expect(payload.action).toEqual("test");
            expect(payload.data).toExist();
            expect(payload.data.ok).toBeTruthy();
            expect(payload.data.status).toEqual(200);
            expect(payload.data.body).toEqual("Your hero: " + heroName);
        });

        ajax.get("test", "https://domain.example/hero", { superhero: heroName });
    });

    it("::post", () => {
        let dispatcher = new Dispatcher();
        let ajax = new Ajax(request, dispatcher);
        let heroName = "Harley Quinn";

        dispatcher.register((payload) => {
            expect(payload.action).toEqual("test");
            expect(payload.data).toExist();
            expect(payload.data.ok).toBeTruthy();
            expect(payload.data.status).toEqual(200);
            expect(payload.data.body).toEqual("The heros name is Harley Quinn and his/her villain is called Batman. The heros likes the Joker.");
        });

        ajax.post("test", "https://domain.example/hero/add", { superhero: heroName }, {
            preferences: "the Joker",
            villain: "Batman"
        });
    });

});