"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stores = exports.TIMEOUT = exports.NOT_AUTHORIZED = exports.HEADER_DATA_TYPE = exports.ERR_TIMEOUT = exports.ERR_DEFAULT = exports.EVENT_CHANGE = exports.Store = exports.Ajax = undefined;

var _Ajax = require("./Ajax");

var _Ajax2 = _interopRequireDefault(_Ajax);

var _Store = require("./Store");

var _Store2 = _interopRequireDefault(_Store);

var _LocalStore = require("./stores/LocalStore");

var _LocalStore2 = _interopRequireDefault(_LocalStore);

var _SessionStore = require("./stores/SessionStore");

var _SessionStore2 = _interopRequireDefault(_SessionStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Ajax = _Ajax2.default;
exports.Store = _Store2.default;
exports.EVENT_CHANGE = _Store.EVENT_CHANGE;
exports.ERR_DEFAULT = _Ajax.ERR_DEFAULT;
exports.ERR_TIMEOUT = _Ajax.ERR_TIMEOUT;
exports.HEADER_DATA_TYPE = _Ajax.HEADER_DATA_TYPE;
exports.NOT_AUTHORIZED = _Ajax.NOT_AUTHORIZED;
exports.TIMEOUT = _Ajax.TIMEOUT;
var stores = exports.stores = { LocalStore: _LocalStore2.default, SessionStore: _SessionStore2.default };
//# sourceMappingURL=index.js.map
