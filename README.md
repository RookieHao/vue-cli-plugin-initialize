## vue-cli-plugin-initialize
本工具主要集成vue-cli项目初始化的一些功能.  
比如: 开发/打包的多环境配置、请求封装、vuex模块的导入导出(按照约定的目录结构存放store文件，就能自动导入)、mockjs的集成、全局组件的自动注册、通用工具方法、commit规范、webpack的配置等等...  
结合各类需求，进行可选配置的初始化项目,补充vue-cli内部插件未涉及到的部分。

1. 扩展check::env命令  
   **来由:** 项目实际开发过程中,可能需要部署多个环境的线上版本。  
   比如我们公司项目开发过程中,项目打包会有以下几种情形:
   - 部署在开发服务器用于开发自测，联调。(development)
   - 部署在测试服务器上提测。(test)
   - 部署在验收服务器上验收。(vf)
   - 部署在生产服务器正式上线。(production)  
   
   面对这种需求,在不同的服务器上部署会有不同的配置,比如接口baseURL、接口签名参数、文件服务器地址等等。  
   vue-cli-service自带的 --mode选项就可以满足我们的配置需求,但还有个问题就是,--mode的设定会影响打包结果。  
   比如 `vue-cli-service build --mode development`,运行这个命令打包确实读取的是development环境的配置文件,但是vue-cli内置的一些production模式优化配置也失去了。  
   
   **解决:** 针对以上问题，插件扩展了check::env命令。
   ```$xslt
     vue-cli-service check::env --service [env]
   ```
   通过check::env 命令的service参数指定加载哪个环境的配置。至此--mode的设定不再影响配置文件的读取。  
   
   **说明:**
   ```$xslt
   插件内置(production,development,test,vf)四个环境。可根据需要自行增减(命名随意,创建对应的.env.[env]文件并配置script脚本即可)
   ```
   
持续更新中...