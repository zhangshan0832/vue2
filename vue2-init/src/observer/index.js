import { isArray, isObject } from '../utils.js'
import { arrayMethods } from "./array.js"
class Observe {
    constructor(value) {
        // 不让__ob__被遍历到
        // value.__ob__ = this 
        Object.defineProperty(value, '__ob__', {
            value: this,
            enumerable: false // 标识这个属性不能被列举出来 不能被循环到
        })
        if (isArray(value)) {
            value.__proto__ = arrayMethods
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    walk(target) {
        Object.keys(target).forEach(key => {
            defineReactive(target, key, target[key])
        })
    }
    observeArray(data) { // 递归遍历数组，对数组内部的对象再次重写 [[]] [{}]
        data.forEach(item => observe(item))
    }

}
function defineReactive(target, key, value) {
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue == value) return
            observe(newValue) // 设置的值如果是对象 继续进行劫持
            value = newValue
        }
    })
}
export function observe(data) {
    // data 就是我们用户传入的数据 我们需要对他进行观测
    if (!isObject(data)) {
        return
    }
    if (data.__ob__) {
        return
    }
    // 后续我们要知道是否这个对象被观测过了
    return new Observe(data) // xxx instanceof Observe
}