"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TIMEOUT = exports.TIMEOUT = 10000;
var HEADER_DATA_TYPE = exports.HEADER_DATA_TYPE = "application/json";
var ERR_TIMEOUT = exports.ERR_TIMEOUT = "timeout";
var ERR_DEFAULT = exports.ERR_DEFAULT = "error";
var NOT_AUTHORIZED = exports.NOT_AUTHORIZED = "not_authorized";

var Ajax = (function () {
    function Ajax(request, dispatcher, timeout) {
        _classCallCheck(this, Ajax);

        this._req = request;
        this._dispatcher = dispatcher;
        this._timeout = timeout || TIMEOUT;
        this._pending = {};
    }

    _createClass(Ajax, [{
        key: "get",
        value: function get(key, url, query, timeout) {
            var _this = this;

            return this._send(key, url, function (fullUrl) {
                return _this._genRequest('get', fullUrl, query, null, timeout);
            });
        }
    }, {
        key: "post",
        value: function post(key, url, query, body, timeout) {
            var _this2 = this;

            return this._send(key, url, function (fullUrl) {
                return _this2._genRequest('post', fullUrl, query, body, timeout);
            });
        }
    }, {
        key: "put",
        value: function put(key, url, query, body, timeout) {
            var _this3 = this;

            return this._send(key, url, function (fullUrl) {
                return _this3._genRequest('put', fullUrl, query, body, timeout);
            });
        }
    }, {
        key: "del",
        value: function del(key, url, query, timeout) {
            var _this4 = this;

            return this._send(key, url, function (fullUrl) {
                return _this4._genRequest('del', fullUrl, query, null, timeout);
            });
        }
    }, {
        key: "_genRequest",
        value: function _genRequest(method, url, query, body, timeout) {
            var req = this._req[method](url);
            if (query) {
                req.query(query);
            }
            if (body) {
                req.send(body);
            }
            return req.timeout(timeout || this._timeout).set('Accept', HEADER_DATA_TYPE);
        }
    }, {
        key: "_dispatch",
        value: function _dispatch(key, response) {
            this._dispatcher.dispatch({
                action: key,
                data: response
            });
        }
    }, {
        key: "_dispatchResponse",
        value: function _dispatchResponse(key) {
            var _this5 = this;

            return function (err, response) {
                if (err && err.timeout === ERR_TIMEOUT) {
                    _this5._dispatch(ERR_TIMEOUT, response);
                } else if (response.status === 400) {
                    _this5._dispatch(NOT_AUTHORIZED, response);
                } else if (!response.ok) {
                    _this5._dispatch(ERR_DEFAULT, response);
                } else {
                    _this5._dispatch(key, response);
                }
            };
        }
    }, {
        key: "_abortPendingRequest",
        value: function _abortPendingRequest(key) {
            var pending = this._pending[key];
            if (pending) {
                pending._callback = function () {};
                pending.abort();
                this._pending[key] = null;
            }
        }
    }, {
        key: "_send",
        value: function _send(key, url, fn) {
            this._abortPendingRequest(key);
            var req = this._pending[key] = fn.call(this, Ajax._createUrl(url));
            req.end(this._dispatchResponse(key));
            return req;
        }
    }], [{
        key: "_createUrl",
        value: function _createUrl(url) {
            return url;
        }
    }]);

    return Ajax;
})();

exports.default = Ajax;
//# sourceMappingURL=Ajax.js.map
