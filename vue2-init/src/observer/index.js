class Observe {
    constructor(value) {
        this.walk(value)
    }
    walk(target) {
        Object.keys(target).forEach(key => {
            defineReactive(target, key, target[key])
        })
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
    if (typeof data !== 'object' || data == null) {
        return
    }
    // 后续我们要知道是否这个对象被观测过了
    return new Observe(data) // xxx instanceof Observe
}