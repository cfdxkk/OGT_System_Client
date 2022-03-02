<template>
  <div>

    <h2 style="color: var(--white)">Welcome - {{this.$route.path.split('/').slice(-1)[0]}}</h2>

    <button @click="select">测试数据</button>
    <button @click="getAndSaveMessage">测试IndexedDB</button>
    <button @click="testGetOfflineMessage">测试离线消息</button>
    <button @click="testGroupMessage">测试群聊消息</button>

    <div id="registerPart">
      <p>here we test register</p>
      账号：<input id="registerUserName" type="text" />
      <br/>
      密码：<input id="registerPassword" type="text" />
      <br/>
      <button @click="register">注册</button>
      <div id="registerMessage"></div>
    </div>

    <div id="loginPart">
      <p>here we test login</p>
      账号：<input id="loginUserName" type="text" />
      <br/>
      密码：<input id="loginPassword" type="text" />
      <br/>
      <button @click="login">登录</button>
      <div id="loginMessage"></div>
      <div id="usernameBox"></div>
    </div>

    <div id="wsPart">
      <p>here we test ws</p>
      <input id="text" type="text" />
      <br/>
      <button @click="connect">connect</button>
      <button @click="send">Send</button>
      <button @click="closeWebSocket">Close</button>
      <div id="wsMessage1"></div>
    </div>

    <div id="wsMessageSentPart">
      <p>here we test ws sent message to user 精准的消息推</p>
      目标用户ID：<input style="margin-left: 10px;" id="uuidTo" type="text" />
      <br/>
      目标用户NO：<input style="margin-left: 1px;" id="uunoTo" type="text" />
      <br/>
      消息类型：<input style="margin-left: 27px;" id="wsmessagetype" type="text" />
      <br/>
      消息：<input style="margin-left: 59px;" id="wsmessage" type="text" />
      <br/>
      <button @click="sendMessage2User(0)">Send</button>
      <button @click="sendMessage2User(1)">Send Forever</button>
      <div id="wsMessage2"></div>
    </div>

  </div>
</template>

<script>

export default {
  name: "MessageTestPage",
  data: () => {
    return {
      // hostAddress: "150.158.98.146:8888",
      hostAddress: "localhost:8888",

      websocket: null,

      messageData: {},

      db: null,
      message: []
    }
  },
  computed: {
    registerURL(){ return "http://" + this.$store.state.serverAddress + "/user/register"},
    loginURL(){ return "http://" + this.$store.state.serverAddress + "/user/login"},
    selectURL(){ return "http://" + this.$store.state.serverAddress + "/user/info"},

    wsURL(){ return "ws://" + this.$store.state.wsServerAddress + "/websocket/"},
    sendMessageUrl(){ return "http://" + this.$store.state.serverAddress + "/message/messagefilterandcluster"},

    offlineMessageUrl(){ return "http://" + this.$store.state.serverAddress + "/messagepull/getofflinemessage"},

    groupMessageUrl() {return "http://" + this.$store.state.serverAddress + "/group/message"}
  },
  methods: {

    //注册
    register(){

      let username = document.getElementById('registerUserName').value
      let password = document.getElementById('registerPassword').value

      let registerData = {
        username,
        password
      }

      this.Axios.post(this.registerURL,registerData).then(data => {
        console.log('register status', data.data)
      })
    },
    //登录，能往cookie里存储token
    login(){
      let username = document.getElementById('loginUserName').value
      let password = document.getElementById('loginPassword').value

      let loginData = {
        username,
        password
      }

      this.Axios.post(this.loginURL,loginData).then(data => {
        console.log('login data', data.data)
        document.getElementById('usernameBox').innerHTML = username
        let cookieStr = "userinfo="+username+"-"+data.data+"; expires=Thu, 18 Dec 2043 12:00:00 GMT"
        document.cookie=cookieStr;
        console.log('cookie',document.cookie)
      })
    },
    //测试API
    select(){
      this.Axios.get(this.selectURL).then(data => {
        console.log(data);
      })
    },
    //链接ws服务器
    connect() {
      //判断当前浏览器是否支持WebSocket
      if('WebSocket' in window){
        console.log('当前浏览器支持websocket')
        let cookieArray = (document.cookie.split('=')[1]).split('-');
        let wsUsername = cookieArray[0]
        let wsUUID = cookieArray[1]
        let wsToken = cookieArray[2]

        let _this = this
        this.Axios.get(this.offlineMessageUrl+`?uuid=${wsUUID}`).then(result => {
          console.log(result.data)
          _this.getAndSaveMessage(result.data)
        })

        let trueWsURL = `${this.wsURL}${wsUsername}/${wsUUID}/${wsToken}`
        console.log('wsurl', trueWsURL)
        this.websocket = new WebSocket(trueWsURL);

        //连接发生错误的回调方法
        this.websocket.onerror = () => {
          this.setMessageInnerHTML("error");
        }
        //连接成功建立的回调方法
        this.websocket.onopen = () => {
          this.setMessageInnerHTML("open");
        }
        //接收到消息的回调方法
        this.websocket.onmessage = event => {
          console.log("============= message back =============")
          this.setMessageInnerHTML(event.data);
        }
        //连接关闭的回调方法
        this.websocket.onclose = () => {
          this.setMessageInnerHTML("close");
          trueWsURL = this.wsURL
        }
      }
      else{
        alert('Not support websocket')
      }
    },
    //关闭连接
    closeWebSocket(){
      this.websocket.close();
    },
    //发送消息
    send(){
      let message = document.getElementById('text').value;
      this.websocket.send(message);
    },
    //向目标用户精准发送消息
    sendMessage2User(flag){

      // 获取输入和cookie中的数据
      let cookieArray = (document.cookie.split('=')[1]).split('-');

      let uuidfrom = cookieArray[1]
      let uuidto = document.getElementById('uuidTo').value;
      let uunoto = document.getElementById('uunoTo').value;
      let token = cookieArray[2]
      let messagetype = document.getElementById('wsmessagetype').value;
      let message = document.getElementById('wsmessage').value;

      // 拼接数据对象

      if(flag === 1){
        // post Forever

        let flag = 1
        const intervalTime = 1000
        let postInterval = setInterval(() => {

          // 拼接数据对象
          this.messageData = {
            uuidfrom,
            uuidto,
            uunoto,
            token,
            messagetype,
            message: message+flag
          }

          console.log("正在执行第 " + flag + "次POST")
          this.Axios.post(this.sendMessageUrl,this.messageData,).then(data => {
            console.log('消息发送结果: ', data)
          })
          if(flag === 10000){
            clearInterval(postInterval)
          }
          flag++

        }, intervalTime);
      } else {
        // post

        // 拼接数据对象
        this.messageData = {
          uuidfrom,
          uuidto,
          uunoto,
          token,
          messagetype,
          message
        }

        this.Axios.post(this.sendMessageUrl,this.messageData,).then(data => {
          console.log('消息发送结果: ', data)
        })
      }
    },
    //将消息显示在网页上
    setMessageInnerHTML(innerHTML) {
      console.log('——————————————————————————————————————————')
      console.log(innerHTML)
      console.log('——————————————————————————————————————————')
      document.getElementById('wsMessage1').innerHTML += innerHTML + '<br/>';
    },
    //请求离线消息以及indexedDB消息存储
    getAndSaveMessage(newOfflineMessage) {

      // let _this = this


      // In the following line, you should include the prefixes of implementations you want to test.
      let indexedDBObj = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      // DON'T use "var indexedDB = ..." if you're not in a function.
      // Moreover, you may need references to some window.IDB* objects:
      window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction
      window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
      // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)


      // 检查可用性
      if (!indexedDBObj) {
        window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
      }

      // 打开数据库
      let request = indexedDBObj.open("ogtMessageIDB", 2)

      // 打开失败的回调
      request.onerror = () => {
        // Do something with request.errorCode!
        console.log("open indexedDB ogtMessageIDB error")
      };

      // 第一次打开或者数据库版本有更新时的回调(触发此回调后仍然会触发onsuccess)
      request.onupgradeneeded = (event) => {
        this.db = event.target.result;

        // 判断表格是否已经存在，若不存在则新建
        if (!this.db.objectStoreNames.contains("ogtMessage")) {
          // 建立一个对象仓库来存储消息，我们选择 messages_from 作为键（key path）
          this.db.createObjectStore("ogtMessage", { keyPath: "messages_from", autoIncrement: true });
        }
      };

      // 打开数据库成功的回调
      request.onsuccess = (event) => {
        this.db = event.target.result;

        // 整理服务器来的离线消息
        let dataArr = [];
        newOfflineMessage.map(mapItem => {
          if (dataArr.length === 0) {
            dataArr.push({  [mapItem.messageFrom]: [mapItem] })
          } else {
            let res = dataArr.some(item=> {//判断相同来源，有就添加到相同来源的项
              if (mapItem.messageFrom === Object.keys(item)[0]) {
                console.log("same",item)
                item[Object.keys(item)[0]].push(mapItem)
                return true
              }
            })
            if (!res) {//如果没找相同日期添加一个新对象
              dataArr.push({ [mapItem.messageFrom]: [mapItem] })
            }
          }
        })
        console.log('dataArr is wtf?',dataArr)




        // 创建一个事务，类型：IDBTransaction
        let transaction = this.db.transaction(["ogtMessage"], 'readwrite')
        // 通过事务来获取IDBObjectStore
        let store = transaction.objectStore("ogtMessage")
        // 从idb中获得所有数据
        let allRecordsStore = store.getAll()
        // 获取数据成功的回调
        allRecordsStore.onsuccess = () => {
          // 取得数据
          let idbMessage = allRecordsStore.result.slice(-50)
          console.log("idbMessage-------------",idbMessage)

          let mergeMessage = []  // 最后整理后的消息数组

          // 验证是否从idb取到值了(因为idb里有可能是空的)
          if(idbMessage == null || idbMessage.length === 0){
            console.log('没取到')
            // 没取到就把遍历取到的离线消息数据并插入到idb中
            dataArr.forEach(messages => {
              // 转换整理成适合idb存储的格式
              let IndexedDBRightMessage = {
                // 根据messages_from分组
                'messages_from' : Object.keys(messages)[0],
                // 截取当前messages_from来源发送来的后50条消息
                'messages': Object.values(messages)[0].slice(-50)
              }
              console.log("before add is ",IndexedDBRightMessage)
              // 存储到Idb
              store.add(IndexedDBRightMessage)
              // 把转换后的消息插入到整理后的消息数组中
              mergeMessage.push(IndexedDBRightMessage)
              IndexedDBRightMessage.messages.forEach(allMessage => {
                document.getElementById('wsMessage1').innerHTML += `收到来自 ${IndexedDBRightMessage.messages_from} 的离线消息: ${allMessage.message} ` + `<br/>`;
              })

            })
            // 把整理后的消息显示在桌面上(实际上不会这么做，只有点开一个聊天时才会触发这个)
            // _this.showIDBMessage2Page(mergeMessage)
          } else {  // 从idb中成功得到了数据
            //把新离线消息插入到idb中
            dataArr.forEach(messages => {
              // 获取新离线消息中的消息from
              let messagesFrom = Object.keys(messages)[0]
              console.log("messagesFrom",messagesFrom)
              let offlineMessages = Object.values(messages)[0]
              console.log('offlineMessages',offlineMessages)
              // 在idb中根据from寻找
              let messageObjSearchFromMessageFrom = store.get(messagesFrom)
              messageObjSearchFromMessageFrom.onsuccess = () => {
                let messageObjSearchFromMessageFromResult = messageObjSearchFromMessageFrom.result
                if(messageObjSearchFromMessageFromResult !== undefined || messageObjSearchFromMessageFromResult !== null){
                  // 如果找到了
                  console.log("找到了")
                  // 根据上面根据message_from找到的message对象得到messages
                  let messageSearchFromMessageFrom = messageObjSearchFromMessageFromResult.messages
                  console.log("??????????????messageObjSearchFromMessageFrom is: ",messageObjSearchFromMessageFrom)
                  // 把新离线消息插入到idb消息中
                  offlineMessages.forEach(offlineMessage => {
                    messageSearchFromMessageFrom.push(offlineMessage)
                  })
                  // 转换整理成适合idb存储的格式
                  let IndexedDBRightMessage = {
                    // 根据messages_from分组
                    'messages_from' : messagesFrom,
                    // 截取后50条消息
                    'messages': messageSearchFromMessageFrom.slice(-50)
                  }
                  console.log("before update, date is:",IndexedDBRightMessage)
                  // 插入回idb
                  store.put(IndexedDBRightMessage)
                  // 把转换后的消息插入到整理后的消息数组中
                  mergeMessage.push(IndexedDBRightMessage)

                  IndexedDBRightMessage.messages.forEach(allMessage => {
                    document.getElementById('wsMessage1').innerHTML += `收到来自 ${IndexedDBRightMessage.messages_from} 的离线消息: ${allMessage.message} ` + `<br/>`;
                  })

                } else { // 如果没找到
                  // 转换整理成适合idb存储的格式
                  let IndexedDBRightMessage = {
                    // 根据messages_from分组
                    'messages_from' : messagesFrom,
                    // 截取后50条消息
                    'messages': offlineMessages.slice(-50)
                  }
                  // 插入回idb
                  store.put(IndexedDBRightMessage)
                  // 把转换后的消息插入到整理后的消息数组中
                  mergeMessage.push(IndexedDBRightMessage)
                  IndexedDBRightMessage.messages.forEach(allMessage => {
                    document.getElementById('wsMessage1').innerHTML += `收到来自 ${IndexedDBRightMessage.messages_from} 的离线消息: ${allMessage.message} ` + `<br/>`;
                  })
                }
              }

            })
            // _this.showIDBMessage2Page(mergeMessage)
          }
        }
      }
    },
    //整理并展示获取的离线消息
    showIDBMessage2Page(message){

      console.log(message)

      let _this = this
      // alert(message)
      //   alert('aa')
        message.forEach(mess => {
          _this.setMessageInnerHTML("在您离线时，您收到了来自" + mess.messages_from + `的如下消息:</br>`)
          mess.messages.forEach(realMassage => {
            _this.setMessageInnerHTML(realMassage + `</br>`)
          })
        })

    },
    //测试获取离线消息
    testGetOfflineMessage() {

      let cookieArray = (document.cookie.split('=')[1]).split('-');
      let uuid = cookieArray[1]

      this.Axios.get(this.offlineMessageUrl+`?uuid=${uuid}`).then(result => {
        console.log(result.data())
        result.data().forEach(message => {
          console.log(message.message);
        })
      })
      console.log("testGetOfflineMessage end")
    },
    // 测试群聊消息
    testGroupMessage() {

      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let cookieArray = (cookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]
        let message = {
          groupIdFrom: '273b0fcfee4048df91890422511c7da1',
          uuidFrom: userId,
          token: token,
          messageType: '1',
          message: 'aaaaaaaaaaaaaa',

        }
        this.Axios.post(this.groupMessageUrl, message).then( data => {
          console.log(data.data);
        })

      }

    }
  },
  mounted() {
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = () => {
      this.websocket.close();
    }
  }
}
</script>

<style scoped>

#registerPart{
  background-color: salmon;
}
#loginPart{
  background-color: powderblue;

  margin-top: 20px;
}
#wsPart{
  background-color: pink;

  margin-top: 20px;
}
#wsMessageSentPart{
  background-color: khaki;

  margin-top: 20px;
}

</style>