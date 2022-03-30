(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      this.walk(value);
    }

    _createClass(Observe, [{
      key: "walk",
      value: function walk(target) {
        Object.keys(target).forEach(function (key) {
          defineReactive(target, key, target[key]);
        });
      }
    }]);

    return Observe;
  }();

  function defineReactive(target, key, value) {
    Object.defineProperty(target, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        observe(newValue); // 设置的值如果是对象 继续进行劫持

        value = newValue;
      }
    });
  }

  function observe(data) {
    // data 就是我们用户传入的数据 我们需要对他进行观测
    if (_typeof(data) !== 'object' || data == null) {
      return;
    } // 后续我们要知道是否这个对象被观测过了


    return new Observe(data); // xxx instanceof Observe
  }

  function initState(vm) {
    var options = vm.$options; // 先props 再methods 再data 再 computed 再watch

    if (options.props) ;

    if (options.methods) ;

    if (options.data) {
      initData(vm);
    }

    if (options.computed) ;

    if (options.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data; // 需要对用户提供的data属性把他的所有属性进行重写 增添get和set，只能拦截已经存在的属性

    console.log(data);
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      console.log(options);
      var vm = this;
      vm.$options = options;
      initState(vm);
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
