# react-native-isomorphism
react-native-isomorphism
### 基于最新版本 React-Native 实现三端同构实践, 具体可查看博客链接:https://blog.csdn.net/u013718120/article/details/105573588
React Native三端同构皆在🈯️在不改动 React Native 代码下，公用一套代码架构, 在浏览器中实现同样的展示、交互、功能。

在实际开发过程中, 尤其创业公司, 需求的迭代周期是非常快的, 并且由于人力成本等因素, 单独为每个平台实现一套代码的代价是极大的。如何实现一套代码多端平台运行，就变得非常重要。而 React Native 三端同构就能轻松解决这个问题。同时, 可以使开发者花费更多的时间在功能开发上, 保证了开发团队轻、快、高的目标实现。

实现原理
做过 react-native 开发的同学肯定对 react-native 的框架不陌生, react-native 是基于 React 实现，基于React封装了一套可在Android、iOS平台同时运行的组件。经过 编译、解析、 render 后会以虚拟 DOM 的形式存储在内存中, 所以基于 React Dom 我们可以实现对应平台的不同实现



目前业界提供了几种实现方式:

reactxp

支持 ios、android、web、windows 。提供的api 较少, 平台支持度不高

JD Taro

taro 不仅支持 web，还支持编译成小程序，但是目前平台支持度也不是特别高，api支持度低，建议在支持小程序的场景下使用

react-native-web

react-native-web 官方对其称对原项目没有任何侵入性，无需改动原来的代码，只需在项目中加入一些 web 构建配置即可构建运行出和 react-native 一致的效果。并且结合 react-native 的支持度非常高, 建议使用此方案。

应用场景
基于 React Native 实现三端同构的应用场景包括：

在 React Native 页面崩溃时用对应的 Web 页，保证用户可以正常使用页面。
对于需要分享到社交网络如微信朋友圈、微博的页面，不可避免地需要 Web 网页。
....
怎么做?
react-native-web 实现原理是将 react-native 组件生成web页面对应的标签元素。并且通过构建工具，实现 Write Once, Run Anywhere。接下来对于现有的 react-native 项目，如何将 react-native-web 进行整合, 我们一一说来。

(1) 创建 react-native 应用

     关于 react-native 项目的初始化方式就不再多说了, 可以查看 官方文档 来了解更多

(2) 使用 create-react-app 创建 web 应用

     Create React App 是一个官方支持的创建 React 单页应用程序的方法。它提供了一个零配置的现代构建设置。

npx create-react-app my-web-app
(3) 将 (2) 步创建的 react web 工程中的 public、src 目录导入 (1) 步 创建的 rn 工程

(4) 用过 npm 或 yarn  安装以下依赖

"react-art": "^16.13.1" // art 图形渲染
"react-dom": "^16.13.1" // react 组件到 web 组件到解析、渲染
"react-router-dom": "^5.1.2" // react web 导航
"react-router-modal": "^1.5.2" // react web modal router
"react-native-web": "^0.12.2" // react-native 解析成 web 组件
(5) package.json 文件中添加以下 scripts

// react-native
"android": "react-native run-android",
"ios": "react-native run-ios",
"start": "react-native start",
// web
"start-web": "react-scripts start",
"build-web": "react-scripts build",
"test-web": "react-scripts test",
"eject-web": "react-scripts eject"
以上步骤完成后, 将 App.js 文件 剪切到src目录, 并且在 src/index.js 文件中指向 App.js 文件, 此时我们可以使用 yarn start-web 来启动, react-native-web 即可帮我们将App.js解析成 web 端的对应实现, 并在浏览器中展示。

路由机制
实际开发中, 一个页面的应用几乎是非常少的。如果涉及多页面交互, 就离不开路由栈的支持。路由栈的存在可以帮助我们轻松实现页面间的跳转、返回、弹出、参数传递等常见交互。

react-native中主流的路由库使用最多、社区最活跃当属 react-navigation。react-navigation 路由机制类似于栈，每次 push 一个新页面，就会将其存储在路由栈中，页面退出，栈中移除。

react-web 路由代表当属 react-router-dom，该框架只会加载一个路由页面(PWA)，跳转即匹配一个路由, 实现页面之间的切换, 有点类似 Android 中的 Fragment。所以，针对两种不同路由机制，需要在 web、rn 之间使用不同的路由配置。同时, 也面临了一个问题: 导航、传参、跳转方式 在这两个导航库中存在着很大不同, API的使用也几乎完全不一样。例如:  在 rn 平台中,  我们使用 react-navigation 的navigation.navigate 函数实现界面间的跳转, 并且可以借助 navigate 函数的第二个参数实现页面之间的参数传递。而在 web 端, 跳转一个页面需要使用 history.push 函数来完成, 参数的传递也是完全不同, 需要将参数在 url 中进行定义。

如何保持一致性的使用方式，是我们接下来要解决的问题。为了兼容两端,  以 react-navigation 的 api 为基准,  封装 web 端的跳转方式, 将其与 react-navigation 的使用方式保持一致。

(1) navigate 跳转

在 rn 端的跳转方式使用如下:

const { navigation } = this.props;
navigation.navigate('目标页面', params);
在 web 端, 自定义 navigate 方法

  const navigate = (toScene, params) => {
    const {navigationOptions} = routeMap[toScene];
    const isRouteModal = navigationOptions.modal;
    let routePath = navigationOptions.path;
    // 将:param? 替换成对应参数
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((param) => {
        const re = RegExp(`:${param}\\??`);
        routePath = routePath.replace(re, escape(params[param]));
      });
    }
    //从url中删除空参数 : 和 ? 之间的每个字符串都带有实际值
    routePath = routePath.replace(/\/:(.*?)(?=\/|$)/g, '');
    if (!isRouteModal) {
      history.push(routePath);
    } else {
      // 检查网址是否以斜杠结尾
      const slash = /\/$/.test(match.url) ? '' : '/';
      // 浏览器中的当前网址+斜杠+带有参数的模式网址
      routePath = match.url + slash + routePath;
      // 从网址中删除*
      routePath = routePath.replace(/\*\/?/g, '');
      history.push(routePath);
    }
  };
(2) getParam 获取参数

在 rn 端的获取参数方式使用如下: 

const { navigation } = this.props;
navigation.getParam('xxx');
在 web 端, 自定义 getParam 方法 

// 获取参数
const getParam = (param, alternative) => {
  return match.params[param] || alternative;
};
(3) goBack 返回上一页

 在 rn 端的返回上一页方式使用如下: 

const { navigation } = this.props;
navigation.goBack();
在 web 端, 自定义 goBack 方法  

// 返回
const goBack = () => {
  history.goBack();
};
(4) 回退到路由栈的某个页面

在 react-navigation 中，可以使用 pop 回到导航栈中的前 n 个页面。但是在 react-router 中 并未提供这样的功能，因为在react-router 中并不存在栈的概念。为了解决这个问题，需要引入一个自定义的 pop 函数。 

react-native 端:

import {StackActions} from 'react-navigation';
 
const pop = ({navigation, n}) => {
  navigation.dispatch(StackActions.pop({n}));
};
 
export default pop;
web 端:

const pop = ({ screen, navigation }) => {
  navigation.navigate(screen)
}
 
export default pop
使用方式:

// screen 用于web端跳转
// n 用于指定 rn 端回退的层级
// navigation 为当前路由
pop({screen: 'FirstScreen', n: 2, navigation})
模态框
在 react-native 端实现 Dialog 非常简单, 并且也可以使用react-navigation, 定义modal模式, 即可实现从下向上滑出的模态页面, web 端需要借助 react-router-modal 来实现类似的模态效果

const RouteMap = {
  Modal: {
    screen: ModalScene,
    navigationOptions: {
        path: '*/basemodal',
        modal: true //路由会用 ModalRoute 路由组件来渲染
    }
  }
}
然后将 <ModalContainer /> 添加到 render 中 即可。

状态管理
redux 或者 mobx，都可以支持复用, 建议选择 mobx

适配 NativeModules
React Native 开发的 App 中经常会出现 React Native 官方提供的 Native Modules

够用的情况，这时你会在项目中开发自己的 Native Modules，然后在 JavaScript 中去调用自己的 Native Modules。这在 ReactNative 环境下运行没有问题，但转成 Web 后执行时会报错说 Native Modules 上找不到对应的模块，这时因为在浏览器环境下是不存在这些自定义的 Native Modules。为了让页面能正常在浏览器中运行，需要为 Web 平台也实现一份自定义的 Native Modules，实现方法可以在 Web 平台的执行入口的最开头注入以下 polyfill，内容如清单 6 所示：

NativeModules polyfill.js

import { NativeModules } from 'react-native';
import MyModule from './MyModule'; // 实现自定义 Native Modules 的地方
 
NativeModules.MyModule = MyModule; // 挂载 MyModule
这段代码的作用是把针对 Web 平台编写的自定义原生模块挂载到 Native Modules 对象上成为其属性，以让 JavaScript 代码在访问自定义 Native Modules 时访问到针对 Web 平台编写模块。

平台区分
虽然 react-native-web 可以很好的支持大部分使用场景，但在一些特殊情况下也需要我们根据不同平台来决定使用不同的实现方式，例如一些特定平台下支持的api，区分不同平台的方式有以下三种：

1. Platform.OS

import { Platform } from 'react-native';
 
if(Platform.OS === 'web'){
  // Web
} else if (Platform.OS === 'android') {
    // Android
} else if(Platform.OS === 'ios'){
  // iOS
}
2. Platform.select

react-native 端提供来 Platform.select 来根据不同平台加载对应平台代码,

Platform.select({
  ios: () => {},
  android: () => {},
  web: () => {},
});
3. .web.js

Web 模式下会优先加载.web.js文件, .web.js 文件不存在时使用 .js 文件。 和 react-native 中的 .android.js、.ios.js 作用相同

index.android.js
index.ios.js
index.web.js
总结
经过上述的实践, 我们基本完成了基于 react-native 的三端同构, 回到最初我们提到的同构的应用场景

在 React Native 页面崩溃时用对应的 Web 页，保证用户可以正常使用页面。
对于需要分享到社交网络如微信朋友圈、微博的页面，不可避免地需要 Web 网页。
....
其实还有很多的功能应用场景可以使用同构来轻松解决, 同样, 不足的地方也很明显, 平台的区分、react-native-web Api的支持、导航库的支持等等, 还需要我们根据实际的开发需求来针对性的进行自定义、补充实现。同时, 基于当前的架构, 我也会不断完善。

以上就是关于 react-native 三端同构的全部内容, 更多内容可查看源码
————————————————
版权声明：本文为CSDN博主「Songlcy」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u013718120/article/details/105573588
