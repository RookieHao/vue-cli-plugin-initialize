## vue-cli-plugin-initialize

本工具主要集成 vue-cli 项目初始化的一些功能.  
比如: 开发/打包的多环境配置、请求封装、vuex 模块的导入导出(按照约定的目录结构存放 store 文件，就能自动导入)、mockjs 的集成、全局组件的自动注册、通用工具方法、commit 规范、webpack 的配置等等...  
结合各类需求，进行可选配置的初始化项目,补充 vue-cli 内部插件未涉及到的部分。

## 安装

```
vue add initialize
```

OR

```
npm install vue-cli-plugin-initialize -D
vue invoke initialize
```

## 使用说明

1. 扩展 check::env 命令  
   **来由:** 项目实际开发过程中,可能需要部署多个环境的线上版本。  
   比如我们公司项目开发过程中,项目打包会有以下几种情形:

   - 部署在开发服务器用于开发自测，联调。(development)
   - 部署在测试服务器上提测。(test)
   - 部署在验收服务器上验收。(vf)
   - 部署在生产服务器正式上线。(production)

   面对这种需求,在不同的服务器上部署会有不同的配置,比如接口 baseURL、接口签名参数、文件服务器地址等等。  
   vue-cli-service 自带的 --mode 选项就可以满足我们的配置需求,但还有个问题就是,--mode 的设定会影响打包结果。  
   比如 `vue-cli-service build --mode development`,运行这个命令打包确实读取的是 development 环境的配置文件,但是 vue-cli 内置的一些 production 模式优化配置也失去了。

   **解决:** 针对以上问题，插件扩展了 check::env 命令。

   ```$xslt
     vue-cli-service check::env --service [env]
   ```

   通过 check::env 命令的 service 参数指定加载哪个环境的配置。至此--mode 的设定不再影响配置文件的读取。

   **说明:**

   ```$xslt
   插件内置(production,development,test,vf)四个环境。可根据需要自行增减(命名随意,创建对应的.env.[env]文件并配置script脚本即可)
   ```

持续更新中...
