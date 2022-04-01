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

  function isObject(val) {
    return _typeof(val) == 'object' && val !== null;
  }
  var isArray = Array.isArray;

  var oldArrayPrototype = Array.prototype;
  var arrayMethods = Object.create(oldArrayPrototype); // // 让arrayMethods 通过__proto__ 能获取到数组的方法

  var methods = [// 只有这七个方法 可以导致数组发生变化
  'push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      var _oldArrayPrototype$me;

      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      // 数组新增的属性 要看一下是不是对象 如果是对象 继续进行劫持
      // 需要调用数组原生逻辑
      (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(arg));

      var inserted = null;
      var ob = this.__ob__;

      switch (method) {
        case 'splice':
          inserted = arg.slice(2);
          break;

        case 'push':
        case 'unshift':
          inserted = arg;
          break;
      }

      if (inserted) ob.observeArray(inserted);
    };
  });

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      // 不让__ob__被遍历到
      // value.__ob__ = this 
      Object.defineProperty(value, '__ob__', {
        value: this,
        enumerable: false // 标识这个属性不能被列举出来 不能被循环到

      });

      if (isArray(value)) {
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    _createClass(Observe, [{
      key: "walk",
      value: function walk(target) {
        Object.keys(target).forEach(function (key) {
          defineReactive(target, key, target[key]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        // 递归遍历数组，对数组内部的对象再次重写 [[]] [{}]
        data.forEach(function (item) {
          return observe(item);
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
    if (!isObject(data)) {
      return;
    }

    if (data.__ob__) {
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
