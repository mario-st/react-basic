"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DELETE = exports.EDIT = exports.ADD = exports.LOAD = exports.PENDING_DELETE = exports.PENDING_EDIT = exports.PENDING_ADD = exports.PENDING_LOAD = undefined;

var _Ajax = require('./Ajax');

var _Ajax2 = _interopRequireDefault(_Ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PENDING_LOAD = exports.PENDING_LOAD = 'pending_load';
var PENDING_ADD = exports.PENDING_ADD = 'pending_add';
var PENDING_EDIT = exports.PENDING_EDIT = 'pending_edit';
var PENDING_DELETE = exports.PENDING_DELETE = 'pending_delete';

var LOAD = exports.LOAD = 'load';
var ADD = exports.ADD = 'add';
var EDIT = exports.EDIT = 'edit';
var DELETE = exports.DELETE = 'delete';

var Actions = (function () {
    function Actions(url, request, dispatcher) {
        _classCallCheck(this, Actions);

        this._dispatcher = dispatcher;
        this._ajax = new _Ajax2.default(request, dispatcher);
        this._url = url;
    }

    _createClass(Actions, [{
        key: 'setUrl',
        value: function setUrl(url) {
            this._url = url;
        }
    }, {
        key: 'load',
        value: function load(id) {
            this._dispatcher.dispatch({ action: PENDING_LOAD });
            this._ajax.get(LOAD, this._url + (id || ""));
        }
    }, {
        key: 'add',
        value: function add(payload) {
            this._dispatcher.dispatch({ action: PENDING_ADD, data: payload });
            this._ajax.post(ADD, this._url + "create", null, payload);
        }
    }, {
        key: 'edit',
        value: function edit(payload) {
            this._dispatcher.dispatch({ action: PENDING_EDIT, data: payload });
            this._ajax.put(EDIT, this._url + "update", null, payload);
        }
    }, {
        key: 'del',
        value: function del(id) {
            this._dispatcher.dispatch({ action: PENDING_DELETE });
            this._ajax.del(DELETE, this._url + "delete/" + (id || ""));
        }
    }]);

    return Actions;
})();

exports.default = Actions;
//# sourceMappingURL=Actions.js.map
