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
 *                   **(框架/全局配置)**
 *                   }
 *  
 *    • 事件 (指南/小程序框架/事件系统)
 *              <view catchtap="handleTap1"></view> --- catchtap：不冒泡的点击事件
 *              <view bindtap="handleTap1"></view>  --- bindtap： 冒泡的点击事件
 *              (回调写在js里和data同级)
 * 
 *    • 路由 (api/路由)
 *              wx.navigateTo({ url: '/login' }) --- 能返回
 *              wx.redirectTo({})                --- 不能返回
 * 
 *    • swiper轮播 (组件/视图容器/swiper)
 *              <swiper>
 *                <swiper-item>
 *                  <image src="/images/01.jpg"></image>
 *                </swiper-item>
 *                <swiper-item>
 *                  <image src="/images/02.jpg"></image>
 *                </swiper-item>
 *              </swiper>
 * 
 * 
 */

 // view--div   text--p css的page表示当前页面、rpx = 0.5px
 // 没有数据代理,要this.data.xxx   wxd01f5ac5922a9a67
 // project.config.json和sitemap.json是重新引入项目的时候编辑器自己加的