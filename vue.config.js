// vue.config.js，在前端通过代理 proxy 解决跨域问题
module.exports = {
    // 选项...
    // devServer: {
    //     proxy: { //配置跨域
    //         '/rest': {
    //             target: 'http://localhost:8088', //这里后台的地址模拟的;应该填写你们真实的后台地址端口
    //             changOrigin: true, //允许跨域
    //             pathRewrite: {

    //                 '^/rest': '/rest'
    //             }
    //         },
    //     }
    // },
    //打包后本地浏览器成功打开index.html文件的必要设置，以下三个设置，还有在路由js文件中删去history模式。
    // 不设置这三个东西、保留history模式然后打包，项目也可以正常部署到服务器正常显示网页
    // publicPath: "./", // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
    // outputDir: "dist", //打包时生成的生产环境构建文件的目录
    // assetsDir: 'public', // 放置生成的静态资源 (js、css、img、fonts)
}

/* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                    实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
                   */