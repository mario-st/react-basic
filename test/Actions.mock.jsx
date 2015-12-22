"use strict";

import url from "url";
import startsWith from "lodash/string/startsWith";
import findIndex from "lodash/array/findIndex";

var parse = (match) => {
    let urlData = null;
    let results = {
        query   : null,
        pathname: null
    };
    if (match && match.length) {
        urlData          = url.parse(match[ 0 ], true);
        results.query    = urlData.query;
        results.pathname = urlData.pathname;
    }
    return results;
};

export default [
    {
        _nextId    : 0,
        _savedItems: [],

        /**
         * regular expression of URL
         */
        pattern: 'https://domain.example(.*)',

        /**
         * returns the data
         * @param match array Result of the resolution of the regular expression
         * @param params
         * @param headers
         */
        fixtures: function (match, params, headers) {
            let {pathname} = parse(match);
            let parts = pathname.split("/");
            let id, index;

            console.log(pathname);

            switch (pathname) {
                case "/create":
                    id    = ++this._nextId;
                    index = this._savedItems.length;
                    this._savedItems.push(Object.assign({ _id: id }, params));
                    return this._savedItems[ index ];
                    break;
                case "/update":
                    id    = params._id;
                    index = findIndex(this._savedItems, "_id", id);
                    return (this._savedItems[ index ] = params);
                    break;
                default:
                    if (startsWith(pathname, "/delete")) {
                        id = parseInt(parts[ 2 ]);
                        if (isFinite(id)) {
                            index = findIndex(this._savedItems, "_id", id);
                            this._savedItems.splice(index, 1);
                        }
                        return;
                    } else {
                        id = parseInt(parts[ 1 ]);
                        if (isFinite(id)) {
                            index = findIndex(this._savedItems, "_id", id);
                            return this._savedItems[ index ];
                        } else {
                            return this._savedItems.length ? this._savedItems : false;
                        }
                    }
            }
        },

        /**
         * returns the result of the GET request
         *
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        get: function (match, data) {
            return {
                status: data ? 200 : 204,
                ok    : true,
                body  : data
            };
        },

        /**
         * returns the result of the POST request
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        post: function (match, data) {
            return {
                ok    : true,
                status: data ? 200 : 204,
                body  : data
            };
        },

        /**
         * returns the result of the PUT request
         * @param match array Result of the resolution of the regular expression
         * @param data  mixed Data returns by `fixtures` attribute
         */
        put: function (match, data) {
            return {
                ok    : true,
                status: data ? 200 : 204,
                body  : data
            };
        },

        delete: function () {
            return {
                ok    : true,
                status: 204
            };
        }
    }
];