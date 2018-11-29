# MalGanis
这个项目是针对中后台的解决方案，指在能够快速构建一个中后台工程。只需要针对不同的公司环境进行简单二次开发即可使用。当然也可以再此基础上进行二次开发创建出脚手架快速构建公司项目。

## 为什么不使用同构
SSR可以使首屏渲染速度更快，而且有利于seo。但是针对中后台项目，我们可能更专注的是业务逻辑与开发效率。我们不希望在SPA和SSR的一些差异上花费太多的时间。甚至舍弃掉一些开源的纯前端组件。我们可能在中后台端更多的使用SPA应用。

## 用户开发目录
```javascript
|- src // 开发目录
    |- components // 用来存放项目公共组件，基础组件库
    |- layout // 页面公共部分
    |- pages // 应用页面文件夹
        |- page // 应用页面
            |- components // 只局限于当前页面的组件，与业务逻辑有较强耦合度，但是没有任何side-effect方便抽离出来
            |- model.js // 当前页面的状态管理处理 model
            |- view.jsx // 视图层 view 页面的展示入口
            |- controller.js // 控制层 联系view和model side-effect
    |- routers // 应用路由管理
        |- index.js // 路由入口
    |- services // 应用请求目录
        |- index.js // 入口
    |- stores // 全局状态管理目录
        |- index.js // 状态管理入口
    |- index.js // 程序入口
|- public
    |- index.html // 项目模板文件
```

## 页面生命周期
* getGlobalInitialState   改变全局初始state
* getPageInitialState     改变页面初始state
* pageBeforeRender  权限鉴定
* pageWillMount     页面将要载入
* pageDidMount      页面载入完毕，document加载完毕
* pageWillUnMount   页面将要跳转

## What means MalGanis
![Mal'Ganis](https://github.com/Arweil/MalGanis/blob/master/malganis.png)

Mal'Ganis是炉石中的一个恶魔，用来增强恶魔属性包括[Jarxxus](https://github.com/Arweil/Jaraxxus)创建出来的地狱火，并且使使用者处于无敌状态。
