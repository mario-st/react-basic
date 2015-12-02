"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Actions = exports.DELETE = exports.EDIT = exports.ADD = exports.LOAD = exports.PENDING_DELETE = exports.PENDING_EDIT = exports.PENDING_ADD = exports.PENDING_LOAD = exports.MENU_DELETE = exports.MENU_EDIT = exports.LIST_SELECT = undefined;

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

var _Ajax = require("./Ajax");

var _Ajax2 = _interopRequireDefault(_Ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LIST_SELECT = exports.LIST_SELECT = 'list_select';

var MENU_EDIT = exports.MENU_EDIT = 'menu_edit';
var MENU_DELETE = exports.MENU_DELETE = 'menu_delete';

var PENDING_LOAD = exports.PENDING_LOAD = 'pending_load';
var PENDING_ADD = exports.PENDING_ADD = 'pending_add';
var PENDING_EDIT = exports.PENDING_EDIT = 'pending_edit';
var PENDING_DELETE = exports.PENDING_DELETE = 'pending_delete';

var LOAD = exports.LOAD = 'load';
var ADD = exports.ADD = 'add';
var EDIT = exports.EDIT = 'edit';
var DELETE = exports.DELETE = 'delete';

var Actions = exports.Actions = (function () {
    function Actions(url, request, dispatcher) {
        _classCallCheck(this, Actions);

        this._dispatcher = dispatcher;
        this._ajax = new _Ajax2.default(request, dispatcher);
        this._url = url;
    }

    _createClass(Actions, [{
        key: "select",
        value: function select(payload) {
            this._dispatcher.dispatch({ action: LIST_SELECT, data: payload });

            // TODO
        }
    }, {
        key: "menu",
        value: function menu(action, payload) {
            this._dispatcher.dispatch({ action: action, data: payload });

            // TODO
        }
    }, {
        key: "add",
        value: function add(payload) {
            this._dispatcher.dispatch({ action: PENDING_ADD, data: payload });

            // TODO
        }
    }, {
        key: "edit",
        value: function edit(payload) {
            this._dispatcher.dispatch({ action: PENDING_EDIT, data: payload });

            // TODO
        }
    }, {
        key: "del",
        value: function del(payload) {
            this._dispatcher.dispatch({ action: PENDING_DELETE, data: payload });

            // TODO
        }
    }]);

    return Actions;
})();
//# sourceMappingURL=Actions.js.map
