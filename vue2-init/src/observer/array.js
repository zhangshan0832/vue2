let oldArrayPrototype = Array.prototype
export let arrayMethods = Object.create(oldArrayPrototype) // // 让arrayMethods 通过__proto__ 能获取到数组的方法

let methods = [ // 只有这七个方法 可以导致数组发生变化
    'push',
    'shift',
    'unshift',
    'pop',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method => {
    arrayMethods[method] = function (...arg) {
        // 数组新增的属性 要看一下是不是对象 如果是对象 继续进行劫持
        // 需要调用数组原生逻辑
        oldArrayPrototype[method].call(this, ...arg)
        let inserted = null
        let ob = this.__ob__
        switch (method) {
            case 'splice':
                inserted = arg.slice(2)
                break
            case 'push':
            case 'unshift':
                inserted = arg
                break
        }
        if (inserted) ob.observeArray(inserted)

    }
})