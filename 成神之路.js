 /**
  * Vue成神之路:
  * 
  * <div id="app">
  *     <div>   // 两种使用
  *         {{msg}} 
  *         {{msg.toUpperCase()}}
  *     </div>
  * 
  *      // 指令: 
  *         v-model    ---   表单     --- 获取表单值(实时) ---  <input type="text" v-model="msg"> 
  *         v-bind     ---   url、key --- 在标签属性加     ---  简写: :href :key :class :style
  *         v-on       ---   事件     --- 加事件           ---  简写: @click="show" ( 在methods定义show ) | 可传参:@click="show1($event, 'xxx')"   
  *         v-if       ---   去掉DOM  --- 控制显示内容                                                      装饰符:@click.prevent="xxx" 禁默认行为
  *         v-else-if  ---            --- 控制显示内容                                                            @click.stop="xxx"     禁冒泡
  *         v-else     ---            --- 控制显示内容
  *         v-show     ---   display  --- 控制显示内容
  *         v-for      ---   数组、对象--- 控制显示内容(遍历生成) ---  <li v-for="(per, index) in Persons" :key="per.id"> / <li v-for="(value, key, index) in Object">
  *              
  * </div>
  * 
  * 
  * 
  * <script type="text/javascript">
  *     const vm = new Vue({
  * 
  *         el: '#app',     // 入口(选择器)
  * 
  *         data: { },      // 数据
  * 
  *         methods: { },   // 事件
  * 
  *         computed: {     // 计算属性(双向绑定，变化而变化)
  *             fulName(){} 
  *         }   
  * 
  *         watch: { name(val){} }      // 局部监听
  *     })
  *     
  *     vm.$watch({'name',fn })         // 全局监听,监听属性name变化,val:实时name
  * </script>
  */




/**
 * 修改代码模板:
 *      !! 初始代码
 * 
 * 修改配置:
 *      文件路径显示绝对路径
 *      设置中Mouse Wheel Zoom设置放大缩小
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
 *      启动:Alt + B
 *      右键启动
 *      debugger from chrome
 *      文件夹图标: VScode icons(文件-首选项-文件图标)
 * 
 * 
 */

