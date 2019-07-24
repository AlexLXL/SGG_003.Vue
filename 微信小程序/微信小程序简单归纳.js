/**
 * appID : wxd01f5ac5922a9a67
 * 文档: https://developers.weixin.qq.com/miniprogram/dev/framework/    
 *  
 * 建项目 ￣￣￣￣↓
 *               app.json **(指南/起步/小程序代码构成/json配置)** ￣￣￣￣↓
 *                  |                                                   pages文件夹/建page
 *                  |
 *                  |{    
 *                     "pages": [
 *                       "pages/index/index",
 *                       "pages/logs/logs"
 *                     ],
 *                     "window": {
 *                        **(框架/页面配置)**
 *                       "backgroundTextStyle": "light",      
 *                       "navigationBarBackgroundColor": "#fff",
 *                                                  |________________→ → →页面设置不同颜色, 在自己的json文件内加{ "navigationBarBackgroundColor": "#8ed145" }
 *                       "navigationBarTitleText": "WeChat",
 *                       "navigationBarTextStyle": "black"
 *                     },
 *                     "sitemapLocation": "sitemap.json",
 *                   **(框架/全局配置)**   ---   ***tabBar(框架/小程序配置/全局配置/tabBar)  -配置position和list  -设置tabBar后相应路由要wx.switchTab来切换***
 *                                              ***那些page在tabBar的配置里设置了就并排显示，由于index没有配置，而且在app.json的"pages"排第一，所以最先出现且没有下导航***
 *                   }
 *  
 * -------------------------------------------------------------------------------------------------
 * 
 *    模板的使用 (框架/WXML语法参考/模板，引入)  --- 新建page--删js和json文件--app.json里取消相应的page导入
 *          模板html:
 *              <template name="msgItem"></template>包裹
 *          Page使用模板:
 *              <import src="/item.wxml"/>
 *              <template is="item" data="{{...item}}"/> 
 * 
 *          ***=================== =====***
 *             html导入模板：
 *                 <import src="/pages/listTemplate/listTemplate.wxss"/>
 *             css导入模板：
 *                 @import '/pages/template/template.wxss';
 *             js导入数据：
 *                 const datas = require('../../datas/list-data.js')
 *          ***==================== ====***
 * 
 * -------------------------------------------------------------------------------------------------
 *    事件 (指南/小程序框架/事件系统)
 *              <view catchtap="handleTap1"></view> --- catchtap：不冒泡的点击事件
 *              <view bindtap="handleTap1"></view>  --- bindtap： 冒泡的点击事件
 *              (回调写在js里和data同级)
 * 
 *    ***========================***
 *    传参问题:
 *             事件传参 data-xxx="yyy"          <view data-hi="WeChat" catchtap="tapName"> Click me! </view>
 *             回调通过 event 接收参数          tapName(event){const index = event.currentTarget.dataset.index}
 *             
 *             路由跳转 传参                    wx.navigateTo({ url: '/pages/detail/detail?index=' + index })
 *             page接收路由参数                 onLoad: function (options) {} 的 options为 接收对象
 *    ***========================***
 * 
 * -------------------------------------------------------------------------------------------------
 *    路由跳转 (api/路由)                   | 这种写法是导入index里所有名为index的文件(整个page)
 *              wx.navigateTo({ url: '/pages/index/index' }) --- 能返回
 *              wx.redirectTo({})                            --- 不能返回
 * 
 * -------------------------------------------------------------------------------------------------
 *    swiper轮播 (组件/视图容器/swiper)
 *              <swiper>
 *                <swiper-item>
 *                  <image src="/images/01.jpg"></image>
 *                </swiper-item>
 *                <swiper-item>
 *                  <image src="/images/02.jpg"></image>
 *                </swiper-item>
 *              </swiper>
 * 
 * -------------------------------------------------------------------------------------------------
 * 
 *    保存数据的方法:
 *    
 *    Storage(API/数据缓存)  --- 永久保存
 *          wx.setStorage(Object object)
 *          wx.getStorageSync(string key)      同步，能立刻拿到，直接可以用
 *          
 *          wx.getStorage(Object object)       异步，会导致没法立刻拿到，不能立刻打印
 * 
 * 
 *    app获取数据(框架/框架接口/小程序App)  --- 运行时全局保存
 *          var appData = getApp()                              获取app data
 *          appData.data.isPlayMusic = this.data.isPlay         设置app data
 * 
 * 
 * -------------------------------------------------------------------------------------------------
 *    提示框(api/界面/交互)    wx.showToast(Object object)
 *    操作菜单(api/界面/交互)  wx.showActionSheet
 *       | 从下面弹出的一行行的菜单
 * 
 *    背景音乐(api/媒体/背景音频)
 *          wx.playBackgroundAudio(Object object)   开始
 *          wx.pauseBackgroundAudio(Object object)  暂停
 * 
 *          wx.onBackgroundAudioPlay(function callback)  监听音乐开始暂停 (后台播放为主，手机下拉下来那个播放暂停  ---  用于改变图标的开始暂停，配合appData来使用)
 *          wx.onBackgroundAudioPause(function callback) 
 * 
 * -------------------------------------------------------------------------------------------------
 * 
 * -------------------------------------------------------------------------------------------------
 * 
 * // ***修改数据使用this.setDate({ data:value }) 的方法*** (类似React)
 * // vx:for  vx:if  vx:key
 * 
 */

 // view--div   text--span css的page表示当前页面、1rpx = 1物理像素 = 0.5px/0.333px (取决dpr)
 // 没有数据代理,要this.data.xxx   wxd01f5ac5922a9a67
 // project.config.json和sitemap.json是重新引入项目的时候编辑器自己加的