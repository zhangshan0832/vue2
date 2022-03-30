(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

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
