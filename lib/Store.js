"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EVENT_CHANGE = undefined;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EVENT_CHANGE = exports.EVENT_CHANGE = 'change';

var Store = (function (_EventEmitter) {
    _inherits(Store, _EventEmitter);

    function Store(dispatcher, register, storage) {
        _classCallCheck(this, Store);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Store).call(this));

        _this.stored = storage || {};
        dispatcher.register(register);
        return _this;
    }

    _createClass(Store, [{
        key: 'emitOnChange',
        value: function emitOnChange(action) {
            if (this.changed) {
                this.changed = false;
                this.emit(EVENT_CHANGE, action);
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(fn) {
            this.on(EVENT_CHANGE, fn);
        }
    }, {
        key: 'offChange',
        value: function offChange(fn) {
            this.removeListener(EVENT_CHANGE, fn);
        }
    }, {
        key: 'getItem',
        value: function getItem(key) {
            return this.stored[key];
        }
    }, {
        key: 'setItem',
        value: function setItem(key, value) {
            if (this.stored[key] !== value) {
                this.stored[key] = value;
                this.changed = true;
            }
        }
    }, {
        key: '_createListIfNeeded',
        value: function _createListIfNeeded(key) {
            if (!this.stored[key]) {
                this.stored[key] = [];
            }
        }
    }, {
        key: 'pushItem',
        value: function pushItem(key, value) {
            this._createListIfNeeded(key);
            this.stored[key].push(value);
            this.changed = true;
        }
    }, {
        key: 'setIndexedItem',
        value: function setIndexedItem(key, index, value) {
            this._createListIfNeeded(key);
            if (value !== this.stored[key][index]) {
                this.stored[key][index] = value;
                this.changed = true;
            }
        }
    }, {
        key: 'delIndexedItem',
        value: function delIndexedItem(key, value) {
            this._createListIfNeeded(key);
            var index = this.stored[key].indexOf(value);
            if (index > -1) {
                this.stored[key].splice(index, 1);
                this.changed = true;
            }
        }
    }, {
        key: 'setItems',
        value: function setItems(obj) {
            var _this2 = this;

            var keys = Object.keys(obj).filter(function (value, key) {
                return _this2.stored[key] !== value;
            }, this);
            keys.forEach(function (key) {
                return _this2.stored[key] = obj[key];
            }, this);
            this.changed = keys.length > 0;
        }
    }, {
        key: 'delItems',
        value: function delItems() {
            var _this3 = this;

            for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
                keys[_key] = arguments[_key];
            }

            keys = keys.filter(function (key) {
                return _this3.stored[key];
            }, this);
            keys.forEach(function (key) {
                return delete _this3.stored[key];
            }, this);
            this.changed = keys.length > 0;
        }
    }, {
        key: 'cleanUp',
        value: function cleanUp() {
            this.stored = {};
            this.changed = true;
        }
    }]);

    return Store;
})(_events2.default);

exports.default = Store;
//# sourceMappingURL=Store.js.map
