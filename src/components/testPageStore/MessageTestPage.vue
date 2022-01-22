<template>
  <div>

    <h2>Welcome</h2>

    <button @click="select">测试数据</button>
    <button @click="connectThenGetMessage">测试IndexedDB</button>

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
      registerURL: "http://localhost:8888/user/register",
      loginURL: "http://localhost:8888/user/login",
      selectURL: "http://localhost:8888/user/info",

      wsURL: "ws://localhost:8888/websocket/",
      sendMessageUrl: "http://localhost:8888/message/messagefilterandcluster",

      websocket: null,

      messageData: {}
    }
  },
  methods: {

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
    select(){
      this.Axios.get(this.selectURL).then(data => {
        console.log(data);
      })
    },
    connect() {
      //判断当前浏览器是否支持WebSocket
      if('WebSocket' in window){
        console.log('当前浏览器支持websocket')
        let cookieArray = (document.cookie.split('=')[1]).split('-');
        let wsUsername = cookieArray[0]
        let wsUUID = cookieArray[1]
        let wsToken = cookieArray[2]

        this.wsURL = `${this.wsURL}${wsUsername}/${wsUUID}/${wsToken}`
        console.log('wsurl', this.wsURL)
        this.websocket = new WebSocket(this.wsURL);

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
        this.websocket.onclose = function(){
          this.setMessageInnerHTML("close");
          this.wsURL = "ws://localhost:8888/websocket/"
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
        const intervalTime = 100
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
      document.getElementById('wsMessage1').innerHTML = innerHTML + '<br/>';
    }
  },
  mounted() {
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function(){
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