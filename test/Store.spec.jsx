"use strict";

import expect from "expect";
import {Dispatcher} from "flux";
import Store, {EVENT_CHANGE} from "../src/Store";
import JsonStore from "../src/stores/JsonStore";
import LocalStore from "../src/stores/LocalStore";
import SessionStore from "../src/stores/SessionStore";

describe("Store", () => {

    let store, dispatcher;

    before(() => {
        dispatcher = new Dispatcher();
        store = new Store(dispatcher, (payload) => {
            store.emitOnChange(payload.action);
        }, {});
    });

    it("::setItem", (done) => {
        store.once(EVENT_CHANGE, (action) => {
            expect(action).toEqual("::setItem");
            expect(store.getItem("test")).toEqual("hello, world!");
            done();
        });
        store.setItem("test", "hello, world!");
        dispatcher.dispatch({action: "::setItem"});
    });

    it("::setItems", (done) => {
        store.once(EVENT_CHANGE, (action) => {
            expect(action).toEqual("::setItems");
            expect(store.getItem("test1")).toEqual(1);
            expect(store.getItem("test2")).toEqual(2);
            expect(store.getItem("test3")).toEqual(3);
            done();
        });
        store.setItems({
            test1: 1,
            test2: 2,
            test3: 3
        });
        dispatcher.dispatch({action: "::setItems"});
    });

    it("::delItems", (done) => {
        store.once(EVENT_CHANGE, (action) => {
            expect(action).toEqual("::delItems");
            expect(store.getItem("test")).toExist();
            expect(store.getItem("test1")).toNotExist();
            expect(store.getItem("test2")).toExist();
            expect(store.getItem("test3")).toNotExist();
            done();
        });
        store.delItems("test1", "test3");
        dispatcher.dispatch({action: "::delItems"});
    });

    it("::pushItem", (done) => {
        store.once(EVENT_CHANGE, (action) => {
            expect(action).toEqual("::pushItem");

            let list = store.getItem("list");
            expect(list).toExist();
            expect(list.length).toEqual(3);
            done();
        });
        store.pushItem("list", "a");
        store.pushItem("list", "b");
        store.pushItem("list", "c");
        dispatcher.dispatch({action: "::pushItem"});
    });

    it("::setIndexedItem", (done) => {
        store.once(EVENT_CHANGE, (action) => {
            expect(action).toEqual("::setIndexedItem");

            let list = store.getItem("list");
            expect(list).toExist();
            expect(list[1]).toEqual("changed");
            done();
        });
        store.setIndexedItem("list", 1, "changed");
        dispatcher.dispatch({action: "::setIndexedItem"});
    });

    it("::delIndexedItem", (done) => {
        store.once(EVENT_CHANGE, (action) => {
            expect(action).toEqual("::delIndexedItem");

            let list = store.getItem("list");
            expect(list).toExist();
            expect(list.length).toEqual(2);
            expect(list[0]).toEqual("changed");
            done();
        });
        store.delIndexedItem("list", "a");
        dispatcher.dispatch({action: "::delIndexedItem"});
    });

    it("::cleanUp", (done) => {
        store.once(EVENT_CHANGE, (action) => {
            expect(action).toEqual("::cleanUp");
            expect(store.getItem("test")).toNotExist();
            expect(store.getItem("test2")).toNotExist();
            expect(store.getItem("list")).toNotExist();
            done();
        });
        store.cleanUp();
        dispatcher.dispatch({action: "::cleanUp"});
    });

    describe("JsonStore", () => {
        before(() => {
            dispatcher = new Dispatcher();
            store = new JsonStore(dispatcher, (payload) => {
                store.emitOnChange(payload.action);
            }, {});
        });

        it("::setItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setItem");

                expect(store.getItem("test")).toEqual("hello, world!");
                expect(store.stored.test).toEqual('"hello, world!"');

                done();
            });
            store.setItem("test", "hello, world!");
            dispatcher.dispatch({action: "::setItem"});
        });

        it("::setItems", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setItems");

                expect(store.getItem("test1")).toEqual(1);
                expect(store.stored.test1).toEqual(1);

                expect(store.getItem("test2")).toEqual(2);
                expect(store.stored.test2).toEqual(2);

                expect(store.getItem("test3")).toEqual(3);
                expect(store.stored.test3).toEqual(3);

                done();
            });
            store.setItems({
                test1: 1,
                test2: 2,
                test3: 3
            });
            dispatcher.dispatch({action: "::setItems"});
        });

        it("::delItems", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::delItems");

                expect(store.getItem("test")).toExist();
                expect(store.stored.test).toExist();
                expect(store.getItem("test1")).toNotExist();
                expect(store.stored.test1).toNotExist();
                expect(store.getItem("test2")).toExist();
                expect(store.stored.test2).toExist();
                expect(store.getItem("test3")).toNotExist();
                expect(store.stored.test3).toNotExist();

                done();
            });
            store.delItems("test1", "test3");
            dispatcher.dispatch({action: "::delItems"});
        });

        it("::pushItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::pushItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list.length).toEqual(3);
                expect(store.stored.list).toEqual(JSON.stringify(list));

                done();
            });
            store.pushItem("list", "a");
            store.pushItem("list", "b");
            store.pushItem("list", "c");
            dispatcher.dispatch({action: "::pushItem"});
        });

        it("::setIndexedItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setIndexedItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list[1]).toEqual("changed");

                list = JSON.parse(store.stored.list);
                expect(list[1]).toEqual("changed");

                done();
            });
            store.setIndexedItem("list", 1, "changed");
            dispatcher.dispatch({action: "::setIndexedItem"});
        });

        it("::delIndexedItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::delIndexedItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list.length).toEqual(2);
                expect(list[0]).toEqual("changed");

                list = JSON.parse(store.stored.list);
                expect(list[0]).toEqual("changed");

                done();
            });
            store.delIndexedItem("list", "a");
            dispatcher.dispatch({action: "::delIndexedItem"});
        });

        it("::cleanUp", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::cleanUp");
                expect(store.getItem("test")).toNotExist();
                expect(store.getItem("test2")).toNotExist();
                expect(store.getItem("list")).toNotExist();
                done();
            });
            store.cleanUp();
            dispatcher.dispatch({action: "::cleanUp"});
        });
    });

    describe("LocalStore", () => {
        before(() => {
            localStorage.clear();
            dispatcher = new Dispatcher();
            store = new LocalStore(dispatcher, (payload) => {
                store.emitOnChange(payload.action);
            });
        });

        it("is using localStorage", () => {
            expect(store.stored).toEqual(localStorage);
        });

        it("::setItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setItem");

                expect(store.getItem("test")).toEqual("hello, world!");
                expect(localStorage.test).toEqual('"hello, world!"');

                done();
            });
            store.setItem("test", "hello, world!");
            dispatcher.dispatch({action: "::setItem"});
        });

        it("::setItems", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setItems");

                expect(store.getItem("test1")).toEqual(1);
                expect(localStorage.test1).toEqual(1);

                expect(store.getItem("test2")).toEqual(2);
                expect(localStorage.test2).toEqual(2);

                expect(store.getItem("test3")).toEqual(3);
                expect(localStorage.test3).toEqual(3);

                done();
            });
            store.setItems({
                test1: 1,
                test2: 2,
                test3: 3
            });
            dispatcher.dispatch({action: "::setItems"});
        });

        it("::delItems", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::delItems");

                expect(store.getItem("test")).toExist();
                expect(localStorage.test).toExist();
                expect(store.getItem("test1")).toNotExist();
                expect(localStorage.test1).toNotExist();
                expect(store.getItem("test2")).toExist();
                expect(localStorage.test2).toExist();
                expect(store.getItem("test3")).toNotExist();
                expect(localStorage.test3).toNotExist();

                done();
            });
            store.delItems("test1", "test3");
            dispatcher.dispatch({action: "::delItems"});
        });

        it("::pushItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::pushItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list.length).toEqual(3);
                expect(localStorage.list).toEqual(JSON.stringify(list));

                done();
            });
            store.pushItem("list", "a");
            store.pushItem("list", "b");
            store.pushItem("list", "c");
            dispatcher.dispatch({action: "::pushItem"});
        });

        it("::setIndexedItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setIndexedItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list[1]).toEqual("changed");

                list = JSON.parse(localStorage.list);
                expect(list[1]).toEqual("changed");

                done();
            });
            store.setIndexedItem("list", 1, "changed");
            dispatcher.dispatch({action: "::setIndexedItem"});
        });

        it("::delIndexedItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::delIndexedItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list.length).toEqual(2);
                expect(list[0]).toEqual("changed");

                list = JSON.parse(localStorage.list);
                expect(list[0]).toEqual("changed");

                done();
            });
            store.delIndexedItem("list", "a");
            dispatcher.dispatch({action: "::delIndexedItem"});
        });

        it("::cleanUp", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::cleanUp");

                expect(store.getItem("test")).toNotExist();
                expect(localStorage.test).toNotExist();
                expect(store.getItem("test2")).toNotExist();
                expect(localStorage.test2).toNotExist();
                expect(store.getItem("list")).toNotExist();
                expect(localStorage.list).toNotExist();

                done();
            });
            store.cleanUp();
            dispatcher.dispatch({action: "::cleanUp"});
        });

    });

    describe("SessionStore", () => {
        before(() => {
            sessionStorage.clear();
            dispatcher = new Dispatcher();
            store = new SessionStore(dispatcher, (payload) => {
                store.emitOnChange(payload.action);
            });
        });

        it("is using sessionStorage", () => {
            expect(store.stored).toEqual(sessionStorage);
        });

        it("::setItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setItem");

                expect(store.getItem("test")).toEqual("hello, world!");
                expect(sessionStorage.test).toEqual('"hello, world!"');

                done();
            });
            store.setItem("test", "hello, world!");
            dispatcher.dispatch({action: "::setItem"});
        });

        it("::setItems", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setItems");

                expect(store.getItem("test1")).toEqual(1);
                expect(sessionStorage.test1).toEqual(1);

                expect(store.getItem("test2")).toEqual(2);
                expect(sessionStorage.test2).toEqual(2);

                expect(store.getItem("test3")).toEqual(3);
                expect(sessionStorage.test3).toEqual(3);

                done();
            });
            store.setItems({
                test1: 1,
                test2: 2,
                test3: 3
            });
            dispatcher.dispatch({action: "::setItems"});
        });

        it("::delItems", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::delItems");

                expect(store.getItem("test")).toExist();
                expect(sessionStorage.test).toExist();
                expect(store.getItem("test1")).toNotExist();
                expect(sessionStorage.test1).toNotExist();
                expect(store.getItem("test2")).toExist();
                expect(sessionStorage.test2).toExist();
                expect(store.getItem("test3")).toNotExist();
                expect(sessionStorage.test3).toNotExist();

                done();
            });
            store.delItems("test1", "test3");
            dispatcher.dispatch({action: "::delItems"});
        });

        it("::pushItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::pushItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list.length).toEqual(3);
                expect(sessionStorage.list).toEqual(JSON.stringify(list));

                done();
            });
            store.pushItem("list", "a");
            store.pushItem("list", "b");
            store.pushItem("list", "c");
            dispatcher.dispatch({action: "::pushItem"});
        });

        it("::setIndexedItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::setIndexedItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list[1]).toEqual("changed");

                list = JSON.parse(sessionStorage.list);
                expect(list[1]).toEqual("changed");

                done();
            });
            store.setIndexedItem("list", 1, "changed");
            dispatcher.dispatch({action: "::setIndexedItem"});
        });

        it("::delIndexedItem", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::delIndexedItem");

                let list = store.getItem("list");
                expect(list).toExist();
                expect(list.length).toEqual(2);
                expect(list[0]).toEqual("changed");

                list = JSON.parse(sessionStorage.list);
                expect(list[0]).toEqual("changed");

                done();
            });
            store.delIndexedItem("list", "a");
            dispatcher.dispatch({action: "::delIndexedItem"});
        });

        it("::cleanUp", (done) => {
            store.once(EVENT_CHANGE, (action) => {
                expect(action).toEqual("::cleanUp");

                expect(store.getItem("test")).toNotExist();
                expect(sessionStorage.test).toNotExist();
                expect(store.getItem("test2")).toNotExist();
                expect(sessionStorage.test2).toNotExist();
                expect(store.getItem("list")).toNotExist();
                expect(sessionStorage.list).toNotExist();

                done();
            });
            store.cleanUp();
            dispatcher.dispatch({action: "::cleanUp"});
        });

    });

});
