"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocalStore = undefined;

var _Store2 = require("../Store");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalStore = exports.LocalStore = (function (_Store) {
    _inherits(LocalStore, _Store);

    function LocalStore(dispatcher, register) {
        _classCallCheck(this, LocalStore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LocalStore).call(this, dispatcher, register, window.localStorage));
    }

    _createClass(LocalStore, [{
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
    }, {
        key: "cleanUp",
        value: function cleanUp() {
            this.stored.clear();
            this.changed = true;
        }
    }]);

    return LocalStore;
})(_Store2.Store);
//# sourceMappingURL=LocalStore.js.map
