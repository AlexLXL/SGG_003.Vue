/**
 * 快速迭代脚手架vue-cli: (3.x移动css/reset.css和html到public文件夹)
 *       2.x ▁  3.x ● 
 * 
 *      ▁ 配置自动打开页面 (./config/index.js-autoOpenBrowser)
 *      ▁ 配置exlintrc检测 (eslintrc.js的rules    package.jon的rules加)
 * 
 * 
 *      ● HTML --- ①meta适配 ②样式重置 ③解决移动端0.3s点击延迟, fastclick库
 * 
 * 
 *      ● 建文件夹( api、router路由器、store状态管理、common混合、components、pages路由组件、filter过滤器、mock模拟后台数据)
 *      ● 下包
 *          stylus              ---   npm install stylus stylus-loader
 *          路由、ajax           ---   npm install vue-router axios
 *          vuex、swiper、dayjs  ---   npm install vuex swiper dayjs
 *          Mint UI(按需加载)    ---    npm i mint-ui -S   **  npm install babel-plugin-component -D
 * 
 * 
 *      ● 模板api (根据代理配置prefix)
 *      ● 模板路由, main.js引入
 *      ● 模板Vuex, main.js引入
 * 
 * 
 *      ● 配置代理(手动) ***2.x上  3.x下***
 *        ===config/index.js===                                                  
 *         proxyTable: {
 *           '/api': {
 *             target: 'http://localhost:5000',  // 目标服务器
 *             changeOrigin: true, // 支持跨域
 *             pathRewrite: {
 *               '^/api': '' // 删除/api
 *             }
 *           }
 *         }, 
 *        ===config/index.js===
 *        const prefix = process.env.NODE_ENV === "development" ? "/api" : "http://localhost:5000"
 * 
 * 
 *        *** 新建vue.config.js***
 *          module.exports = {                                // 向外暴露一个webpack配置对象        https://cli.vuejs.org/zh/guide/webpack.html
 *            configureWebpack: {
 *              resolve: {                                    // 使用vue.esm.js                   这个配置从2.x的build/webpack.base.conf拿
 *                extensions: ['.js', '.vue', '.json'],
 *                alias: {
 *                  'vue$': 'vue/dist/vue.esm.js',
 *                }
 *              },
 *              devServer: {                                  // 代理和自动打开网页                  https://cli.vuejs.org/zh/config/#devserver-proxy
 *                proxy: 'http://localhost:5000',
 *                open: true // 自动打开网页也可以在package.json的scripts命令后加 --open
 *              }
 *            }
 *          }
 *        *** config/index.js***
 *        const prefix = process.env.NODE_ENV === "development" ? "" : "http://localhost:5000"
 * 
 * ------------------------------------------------------------------------------------------------------------------------------------
 * 
 * swiper轮播图: 
 * 
 *  import Swiper from "swiper";  // 导入Swiper
 * 
 *  var mySwiper = new Swiper(".swiper-container", {  // 实例化的方式使用(页面加载完成之后、watch不能使用时因为watch里的代码是同步的，而发请求更新数据刷新页面是异步的)
 *     loop: true, // 循环模式选项                              | 配合**vm.$nextTick(callback)使用** --- 在下次 DOM 更新循环结束之后执行延迟回调。                        
 *     pagination: {                                                    | watch+vm.$nextTick(callback)                                                
 *       el: ".swiper-pagination"                                       | this.$store.dispatch('actions',() => {vm.$nextTick(callback)} )             
 *     }                                                                | await this.$store.dispatch('actions') 后, 再写 this.$nextTick(callback)         
 *   });
 * 
 * 
 * 
 * 
 * 
 * 
 */