/**
 * 脚手架vue-cli:                 
 *    安装:npm install -g vue-cli
 *        vue init webpack my-project (Set up unit tests ：No，Setup e2e tests with Nightwatch?No)
 * 
 *        npm start 运行
 *        npm run build 打包 
 *        serve -s dist 运行(打包后)
 * 
 *    注意:
 *        检测组件:加<h2>xxx</h2>，脱离子组件，运行看有没h2的内容
 *        data写法: data () { return xx}
 *        组件中的scope: 作用域，如果父子组件都没scope，父组件会用子组件的样式
 * 
 *    组件通信:
 *        | props  ▁▁▁▁  父子之间▁
 *        | 自定义事件  ▁▁▁▁  子 --> 父
 *              | 在父组件: @addTodo="addTodo"
 *              | 在子组件：this.$emit("addTodo", data);
 * 
 *        | 插槽 slot  ▁▁▁▁  父 --> 子 (传递"标签数据")
 * 
 *              | 父组件:
 *                    | <Child>
 *                    |     <div slot="xxx"> 对应的标签结构</div>
 *                    |     <div slot="yyy"> 对应的标签结构</div>
 *                    | </Child>
 * 
 *              | 子组件:
 *                    | <template>
 *                    |     <slot name="xxx" />
 *                    |     <slot name="yyy" />
 *                    | </template>
 * 
 *        | PubSub消息发布/订阅  ▁▁▁▁  任意组件间
 *              | 父组件:
 *                    | mounted: { PubSub.subscribe("eventName",回调函数) 订阅
 *                    | beforeDestroy() { PubSub.unsubscribe(token) }     取消订阅(在实例对象销毁之前)
 * 
 *              | 子组件:
 *                    | methods: { PubSub.publish("eventName", data); } 发布
 * 
 *        | 事件总线$bus  ▁▁▁▁  任意组件间
 *              | main文件实例化前,  Vue.prototype.$bus = new Vue()
 *              | 绑定事件: this.$bus.$on('eventName'，(data)=>{})
 *                触发事件: this.$bus.$emit('eventName'，data)
 *                移除事件: this.$off('eventName')
 * 
 */

/**
  * Vue成神之路:
  * <style type="text/css">
  * 
  *   /* Vue的过渡---结合<transition name="fade">使用 * / ( 开始结束状态默认是初始状态 )
  *   .fade-enter{}           .fade-leave{}     // 开始时状态-出现/消失
  *   .fade-enter-active{}                      // 过程设置transition: xx xs / animation: xx xs;
  *   .fade-enter-to{}                          // 结束时状态       
  *   
  * </style>
  * 
  * <div id="app">
  *     <div>   // 表达式两种使用
  *         {{msg}} 
  *         {{msg.toUpperCase()}}
  *     </div>
  * 
  *     <transition name="fade">
  *         <p v-show="isOk" ref="flag"  v-upper-text="msg">这是P</p>
  *     <transition>
  * 
  *      // 指令:                                                 | checkbox多选中,v-model为true就是选中,也可为['xx','yy']选中xx和yy
  *         v-model    ---   表单     --- 获取表单值(实时)  ---  <input type="text" v-model="msg"> v-model是输入框的值 / 下拉框选中, V-model在select标签，而不是option
  *         v-bind     ---   url、key --- 在标签属性加      ---  简写: :href :key :class :style :value(下拉框的值用id)
  *         v-on       ---   事件     --- 加事件            ---  简写: @click="show" ( 在methods定义show ) | 可传参:@click="show1($event, 'xxx')"   
  *         v-if       ---   去掉DOM  --- 控制显示内容                                                      装饰符:@click.prevent="xxx"  禁默认行为
  *         v-else-if  ---            --- 控制显示内容                                                            @click.stop="xxx"     禁冒泡
  *         v-else     ---            --- 控制显示内容                                                            @keyup.enter="xxx"    键盘事件回车
  *         v-show     ---   display  --- 控制显示内容
  *         v-for      ---   数组、对象--- 控制显示内容(遍历生成) ---  <li v-for="(per, index) in Persons" :key="per.id"> / <li v-for="(value, key, index) in Object">
  * 
  *         v-text     ---            --- 不解析
  *         v-html     ---            --- 向html标签中插入并解析 数据为标签的'<a></a>'
  *         ref        ---            --- 访问元素对象     --- html设置ref="flag",获取:this.$refs.flag.xxx
  *              
  * </div>
  * 
  * 
  * 
  * <script type="text/javascript">
  *     // Vue.filte('formatDate1', (value, option)=>{return})配合管道使用 --- 过滤器
  *            | formatDate1:  过滤器名字
  *            | value:        管道的输入数据
  *            | option:       传参
  * 
  *     // Vue.directive('upper-text', function (el, binding) {}          --- 全局指令-自定义
  *            | el:            理解为使用该指令的DOM元素
  *            | binding:       像是指向    v-自定义属性=“data”    这个html的代码, 抽取成一个对象而已，里面有value指向data
  *            | example:       el.innerText = binding.value.toUpperCase();
  * 
  *     const vm = new Vue({
  * 
  *         el: '#app',     // 入口(选择器)
  * 
  *         data: {},      // 数据(属性)
  * 
  *         methods: {},   // 事件-this.$destroy() // 删除vm
  * 
  *         computed: {     // 计算属性(变化而变化、方法get/对象getset)
  *             fullName(){}
  *             fullName: {
  *               get(){};
  *               set(val){}
  *                 | val --- 表单的value 
  *             } 
  *         }
  * 
  *         beforeCreate(){}    created(){}   // 八个生命周期(beforeDestroy(){ 一般用来删定时器 })
  *         beforeMount(){}     mounted(){}
  *         beforeUpdate(){}    updated(){} 
  *         beforeDestroy(){}   destroyed(){}
  * 
  *         directives: {                     // 内部的自定义指令(只能用自己的data)(当前vm)(注意下面的写法 '')
  *              'lower-text'(el, binding){ 
  *                  el.innerText = binding.value.toLowerCase();
  *              }
  *          } 
  *           
  * 
  *         watch: { name(val){} }            // 局部监视(监视xx改变就做一些操作)
  *           | val就是最新的name                     | 另外一种写法:todos:{ deep: true,handler: function(val) {} }
  * 
  *     })
  *     
  *     vm.$watch( 'name', fn )               // 全局监视,监听属性name变化,val:实时name
  * </script>
  */




/**
 * 修改代码模板:
 *      !! 初始代码
 * 
 * 修改配置:
 *      文件路径显示绝对路径
 *      设置中Mouse Wheel Zoom设置放大缩小
 *      自动保存
 * 
 * 修改了快捷键:
 *      整理代码: Ctrl + shift + l
 *      代码提示: Alt + /
 *      复制一行: Ctrl + d
 *      块注释:Ctrl + shift + /
 *      影藏左边的内容 Alt + 1
 *      选中相同文字 Ctrl + j
 * 
 * 插件:
 *      Alt + B启动:   Open in Browser
 *      右键启动:      View in Browser
 *                    debugger from chrome
 *      文件夹图标:    VScode icons(文件-首选项-文件图标)
 *      Vue提示、ES6提示
 * 
 * 浏览器插件:
 *      Vue Devtools
 * 
 * 
 * 控制台:ctrl + ~
 */

