"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Store2 = require("../Store");

var _Store3 = _interopRequireDefault(_Store2);

var _mapValues = require("lodash/object/mapValues");

var _mapValues2 = _interopRequireDefault(_mapValues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionStore = (function (_Store) {
    _inherits(SessionStore, _Store);

    function SessionStore(dispatcher, register, storage) {
        _classCallCheck(this, SessionStore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SessionStore).call(this, dispatcher, register, storage));
    }

    _createClass(SessionStore, [{
        key: "_createListIfNeeded",
        value: function _createListIfNeeded(key) {
            if (!this.stored[key]) {
                this.stored[key] = "[]";
            }
        }
    }, {
        key: "_getJsonArray",
        value: function _getJsonArray(key) {
            return JSON.parse(this.stored[key] || "[]");
        }
    }, {
        key: "setItem",
        value: function setItem(key, value) {
            _get(Object.getPrototypeOf(SessionStore.prototype), "setItem", this).call(this, key, JSON.stringify(value));
        }
    }, {
        key: "setItems",
        value: function setItems(obj) {
            _get(Object.getPrototypeOf(SessionStore.prototype), "setItems", this).call(this, (0, _mapValues2.default)(obj, function (value) {
                return JSON.stringify(value);
            }));
        }
    }, {
        key: "getItem",
        value: function getItem(key) {
            return JSON.parse(_get(Object.getPrototypeOf(SessionStore.prototype), "getItem", this).call(this, key) || "null");
        }
    }, {
        key: "pushItem",
        value: function pushItem(key, value) {
            var arr = this._getJsonArray(key);
            arr.push(value);
            this.stored[key] = JSON.stringify(arr);
            this.changed = true;
        }
    }, {
        key: "setIndexedItem",
        value: function setIndexedItem(key, index, value) {
            this._createListIfNeeded(key);
            var arr = this._getJsonArray(key);
            if (value !== arr[index]) {
                arr[index] = value;
                this.stored[key] = JSON.stringify(arr);
                this.changed = true;
            }
        }
    }, {
        key: "delIndexedItem",
        value: function delIndexedItem(key, value) {
            this._createListIfNeeded(key);
            var arr = this._getJsonArray(key);
            var index = arr.indexOf(value);
            if (index > -1) {
                arr.splice(index, 1);
                this.stored[key] = JSON.stringify(arr);
                this.changed = true;
            }
        }
    }]);

    return SessionStore;
})(_Store3.default);

exports.default = SessionStore;
//# sourceMappingURL=JsonStore.js.map
