"use strict";

export const TIMEOUT          = 10000;
export const HEADER_DATA_TYPE = "application/json";
export const ERR_TIMEOUT      = "timeout";
export const ERR_DEFAULT      = "error";
export const NOT_AUTHORIZED   = "not_authorized";

class Ajax {

    constructor (request, dispatcher, timeout) {
        this._req        = request;
        this._dispatcher = dispatcher;
        this._timeout    = timeout || TIMEOUT;
        this._pending    = {};
    }

    get (key, url, query, timeout) {
        return this._send(key, url, (fullUrl) => this._genRequest('get', fullUrl, query, null, timeout));
    }

    post (key, url, query, body, timeout) {
        return this._send(key, url, (fullUrl) => this._genRequest('post', fullUrl, query, body, timeout));
    }

    put (key, url, query, body, timeout) {
        return this._send(key, url, (fullUrl) => this._genRequest('put', fullUrl, query, body, timeout));
    }

    del (key, url, query, timeout) {
        return this._send(key, url, (fullUrl) => this._genRequest('del', fullUrl, query, null, timeout));
    }

    static _createUrl (url) {
        return url;
    }

    _genRequest (method, url, query, body, timeout) {
        let req = this._req[ method ](url);
        if (query) {
            req.query(query);
        }
        if (body) {
            req.send(body);
        }
        return req.timeout(timeout || this._timeout).set('Accept', HEADER_DATA_TYPE);
    }

    _dispatch (key, response) {
        this._dispatcher.dispatch({
            action: key,
            data  : response
        });
    }

    _dispatchResponse (key) {
        return (err, response) => {
            if (err && err.timeout === ERR_TIMEOUT) {
                this._dispatch(ERR_TIMEOUT, response);
            } else if (response.status === 400) {
                this._dispatch(NOT_AUTHORIZED, response);
            } else if (!response.ok) {
                this._dispatch(ERR_DEFAULT, response);
            } else {
                this._dispatch(key, response);
            }
        };
    }

    _abortPendingRequest (key) {
        let pending = this._pending[ key ];
        if (pending) {
            pending._callback = () => {
            };
            pending.abort();
            this._pending[ key ] = null;
        }
    }

    _send (key, url, fn) {
        this._abortPendingRequest(key);
        let req = this._pending[ key ] = fn.call(this, Ajax._createUrl(url));
        req.end(this._dispatchResponse(key));
        return req;
    }

}

export default Ajax;