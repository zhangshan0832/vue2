import babel from 'rollup-plugin-babel' // 让rollup打包的时候可以采用babel
// 选用rollup的原因是因为打包js类库 体积小 rollup主要就是专注打包js模块的
export default {
    input: "./src/index.js", // 打包的入口
    output: {
        file: 'dist/vue.js', // 打包后的文件存放在output中 iife(global)
        format: 'umd', // 统一模块规范 支持 commonjs amd (Window.Vue)
        name: 'Vue',
        sourcemap: true // 为了增加调试功能
    },
    plugins: [
        babel({
            exclude: 'node_module/**', // 不去编译 node_module 下的文件 
        })
    ]
}