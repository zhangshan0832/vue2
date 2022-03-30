import { observe } from "./observer/index.js"

export function initState(vm) {
    const options = vm.$options
    // 先props 再methods 再data 再 computed 再watch
    if (options.props) {

    }
    if (options.methods) {

    }
    if (options.data) {
        initData(vm)
    }
    if (options.computed) {
        initComputed(vm)
    }
    if (options.watch) {
        initWatch(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    // 需要对用户提供的data属性把他的所有属性进行重写 增添get和set，只能拦截已经存在的属性
    console.log(data)
    data = vm._data = typeof data === 'function' ? data.call(vm) : data
    observe(data)

}
function initComputed() {

}
function initWatch() {

}