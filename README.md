## OGT (Order Game Time - 预定游戏时间)
OGT系统是用来与好友预定游戏时间，或由队长来策划并发布活动的一套系统，是我在东软的毕设
***
此存储库为 OGT_System 的Web客户端代码，由 `JavaScript -> Vue` 编写;</br>
实现了用户与用户，用户与群组之间发送消息的基础功能，使用 `IndexedDB` 实现了浏览器端的消息记录缓存

基于:
```
Node.js
Webpack
Vue.js
Vue-router
axios
Websocket
IndexedDB
...
```
***
## 启动项目 Project setup
0. 克隆当前项目，在控制台输入以下命令 (请确认你使用的设备的ssh密钥已与Github链接)</br>
   (Enter following command in your Termina to clone this Repositories)
```
git clone git@github.com:cfdxkk/OGT_System_Client.git
```
1. 根据自己的实际情况修改各种连接的地址且确保[后端API](https://github.com/cfdxkk/OGT_System_API "OGT_System_API")和数据库工作正常</br>
   (Check the [OGT_System_API server](https://github.com/cfdxkk/OGT_System_API "OGT_System_API") and DBs were running alright)
2. 将 `scr/store/index.js` 中的 `wsServerAddress` 和 `serverAddress` 设为合适的地址

   (Make sure the Address of `wsServerAddress` and `serverAddress` in `scr/store/index.js` are Correctly)
3. 在控制台输入下方命令检查node是否正确安装；如果没有，清自行安装 [Node.js](https://nodejs.org/en/)

   (Enter following command in your Termina to check Node.js was installed in your PC. If not, you can [Click Here To Download Node.js](https://nodejs.org/en/))
```
node -v
```
3. 打开终端并定位到正确的目录 (package.json所在的目录)</br>
   (Go-to right folder. U can see package.json)
4. 在控制台输入以下代码安装项目运行依赖</br>
   (Enter following command in your Termina to install, then press Enter key)
```
npm install
```
5. [开发环境] 在控制台输入以下代码编译为开发者及热重载模式</br>
   ([dev mode]Enter following command in your Termina to Compiles and hot-reloads for development)
```
npm run serve
```
6. [生产环境] 在控制台输入以下代码编译为生产环境和(代码体积)压缩格式</br>
   ([product mode]Enter following command in your Termina to Compiles and minifies for production)
```
npm run build
```
***
#### 修复损坏的文件 Lints and fixes files
```
npm run lint
```

#### 进一步了解 Customize configuration
参见 [Configuration Reference](https://cli.vuejs.org/config/).
See [Configuration Reference](https://cli.vuejs.org/config/).
