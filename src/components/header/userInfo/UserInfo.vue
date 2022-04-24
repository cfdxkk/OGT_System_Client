<template>
  <div class="userInfoHeaderBox">
    <div id="signInBox" class="signInBox" v-if="!logged" @click="openSignInPopup">登录</div>
    <div id="signUpBox" class="signUpBox" v-if="!logged" @click="openSignUpPopup">注册</div>

    <div class="userInfo" v-if="logged">
      <div class="userNameBox">
        <div class="userNameEllipsisBox" @click="goToUserInfoPage()">
          {{this.username}}
        </div>
      </div>
    </div>

    <div class="signPopup" v-if="signInVisible" @click.self="closeSignInPopup">
      <div class="signPopupBox">

        <div class="userSignText">用户登录</div>

        <div class="usernameInputBox">
          <input type="text" id="userNameSignInInput" class="userNameInput" placeholder="在此输入用户名">
        </div>

        <div class="passwordInputBox">
          <input type="password" id="passwordSignInInput" class="passwordInput" placeholder="在此输入密码">
        </div>

        <div class="signButton" @click="login">
          登录
        </div>
        <div class="closeButton" @click="closeSignInPopup">
          取消
        </div>

      </div>
    </div>

    <div class="signPopup" v-if="signUpVisible" @click.self="closeSignUpPopup">
      <div class="signPopupBox">

        <div class="userSignText">用户注册</div>

        <div class="usernameInputBox">
          <input type="text" id="userNameSignUpInput" class="userNameInput" placeholder="在此输入用户名">
        </div>

        <div class="passwordInputBox">
          <input type="password" id="passwordSignUpInput" class="passwordInput" placeholder="在此输入密码">
        </div>

        <div class="signButton" @click="register">
          注册
        </div>
        <div class="closeButton" @click="closeSignUpPopup">
          取消
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data: () => {
    return {
      signInVisible: false,
      signUpVisible: false,
      logged: false,

      username: '',


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

    getGroupListUrl(){ return "http://" + this.$store.state.serverAddress + "/group?userId="},
    checkTokenUrl(){ return "http://" + this.$store.state.serverAddress + "/user/tokenCheck"},

    userInfoUrl(){ return "http://" + this.$store.state.serverAddress + "/user/info?uuid="},
  },
  methods: {
    openSignInPopup: function (){
      this.signInVisible = true
    },
    closeSignInPopup: function (){
      this.signInVisible = false
    },
    openSignUpPopup: function (){
      this.signUpVisible = true
    },
    closeSignUpPopup: function (){
      this.signUpVisible = false
    },

    //登录，能往cookie里存储token
    login(){

      this.clearCookie()

      let username = document.getElementById('userNameSignInInput').value
      let password = document.getElementById('passwordSignInInput').value

      let loginData = {
        username,
        password
      }

      this.Axios.post(this.loginURL,loginData).then(data => {
        this.username = username
        this.userId = data.data.split('-')[0]
        if(data.data !== 'error password or unregister user'){
          let cookieStr = "userinfo="+username+"-"+data.data+"; expires=Thu, 18 Dec 2043 12:00:00 GMT"
          document.cookie = cookieStr
          this.signInVisible = false
          this.logged = true
          this.checkLoginStatus()
        }
      })
    },
    //注册
    register(){

      let username = document.getElementById('userNameSignUpInput').value
      let password = document.getElementById('passwordSignUpInput').value

      let registerData = {
        username,
        password
      }

      this.Axios.post(this.registerURL,registerData).then(data => {
        console.log('register status', data.data)
        this.signUpVisible = false
      })
    },
    getUserInfo() {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        this.Axios.get(this.userInfoUrl + userId).then(userinfo => {
          this.$store.commit('updateUserInfo', userinfo.data)
        })
      }
    },
    checkLoginStatus (){
      // 获取cookie
      let cookie = document.cookie
      if (cookie !== ''){
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1){
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let username = cookieArray[0]
        let UUID = cookieArray[1]
        let token = cookieArray[2]

        let checkTokenData = {
          userId: UUID,
          userToken: token
        }

        this.Axios.post(this.checkTokenUrl,checkTokenData).then(data => {
          if (data.data === true){
            this.username = username
            this.logged = true
            this.Axios.get(this.getGroupListUrl + UUID).then(groups => {
              this.$store.commit('updateGroupList',groups.data)
            })
          }
          this.getUserInfo()
          this.connectWsServer()
        })

      }

    },
    connectWsServer() {
      //判断当前浏览器是否支持WebSocket
      if('WebSocket' in window){
        console.log('当前浏览器支持websocket')

        let cookie = document.cookie
        if (cookie !== '') {
          // 从cookie中获取uuid和token
          let trueCookie = ''
          cookie.split('; ').forEach(ogtCookie => {
            if (ogtCookie.indexOf('userinfo=') !== -1){
              trueCookie = ogtCookie
            }
          })
          let cookieArray = (trueCookie.split('=')[1]).split('-');
          let wsUsername = cookieArray[0]
          let wsUUID = cookieArray[1]
          let wsToken = cookieArray[2]

          let trueWsURL = `ws://${this.$store.state.wsServerAddress}/websocket/${wsUsername}/${wsUUID}/${wsToken}`
          console.log('wsUrl', trueWsURL)
          this.websocket = new WebSocket(trueWsURL);

          //连接发生错误的回调方法
          this.websocket.onerror = () => {
            console.log("error")
          }
          //连接成功建立的回调方法
          this.websocket.onopen = () => {
            console.log("open")
          }
          //接收到消息的回调方法
          this.websocket.onmessage = event => {
            console.log("============= message back =============")
            // this.setMessageInnerHTML(event.data);
            console.log(event.data)
            let messageArrayString = event.data
            if (messageArrayString !== null && messageArrayString !== ''){

              let messageArray = event.data.split(' >clip_:< ')

              let groupIdFrom = messageArray[0]
              let uuidFrom = messageArray[1]
              let usernameFrom = messageArray[2]
              let messageType = messageArray[3]
              let message = messageArray[4]
              let messageNoInGroup = messageArray[5]



              let messagePrivate = {
                selfMessage: true,
                messageNoInGroup,
                groupIdFrom,
                uuidFrom,
                usernameFrom,
                messageType,
                message,
              }

              // 接收到的消息插入到自己的indexeddb中
              this.Dexie.groupMessages.where('groupIdFrom').equals(groupIdFrom).toArray().then(groupMessages => {  // 根据groupId获取indexedDB原来的数据
                if (groupMessages.length === 0){  // 如果indexedDB里没有这个群组的消息数据, 插入刚发送的消息
                  // 插入到indexedDB中
                  this.Dexie.groupMessages.put({
                    'groupIdFrom': groupIdFrom,
                    'messages': [messagePrivate]
                  })
                  // 如果是当前活跃的群聊
                  if (this.$route.path.split('/').slice(-1)[0] === groupIdFrom) {
                    // 加入到vuex活动群组消息中
                    this.$store.commit('updateActiveGroupMessage', [messagePrivate])
                  }
                } else { // 如果indexedDB里有这个群组的历史数据，把刚发送的新消息拼接到原来的消息尾部，然后再插入(一个群聊最多50条)

                  // 计算出正确的消息顺序号
                  messagePrivate.messageNoInGroup = parseInt(groupMessages[0].messages.slice(-1)[0].messageNoInGroup) + 1 + ''
                  let newOfflineMessages = groupMessages[0].messages.concat([messagePrivate]).slice(-50)

                  // 插入到indexedDB中
                  this.Dexie.groupMessages.put({
                    'groupIdFrom': groupIdFrom,
                    'messages': newOfflineMessages
                  })

                  // 如果是当前活跃的群聊
                  if (this.$route.path.split('/').slice(-1)[0] === groupIdFrom) {
                    // 加入到vuex活动群组消息中
                    this.$store.commit('updateActiveGroupMessage', newOfflineMessages)
                  }
                }
              })

              if(messagePrivate.messageType === '2') {  // 如果消息类型是2

                let eventArray = messagePrivate.message.split(' >c10y_:< ')

                // 插入到vuex活动群聊事件中
                let groupEvent = {
                  endTime: parseInt(eventArray[1]),
                  eventColor: eventArray[4],
                  eventId: 0,
                  eventImg: [],
                  eventText: eventArray[3],
                  eventTitle: eventArray[2],
                  startTime: parseInt(eventArray[0]),
                  userAvatar: eventArray[5],
                  userName: messagePrivate.usernameFrom,
                  userType: 0,
                }


                // 把发送的这条事件与 vuex 里之前的消息组合并
                let newOfflineEvent = this.$store.state.activeGroupEvent.concat([groupEvent])
                // 加入到vuex活动群组事件中
                this.$store.commit('updateActiveGroupEvent', newOfflineEvent)
              }
            }
          }
          //连接关闭的回调方法
          this.websocket.onclose = () => {
            console.log("close")
            trueWsURL = this.$store.state.wsServerAddress
          }
        }


      }
      else{
        alert('Not support websocket')
      }
    },
    goToUserInfoPage() {

      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let userId = cookieArray[1]


        this.$router.push(`/user/${userId}`)
      }

    },
    clearCookie() {
      // 清除cookie
      let keys = document.cookie.match(/[^ =;]+(?==)/g);
      if(keys) {
        for(let i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()+";path=/"
      }
    }

  },
  mounted() {
    this.checkLoginStatus()
  }
}
</script>

<style scoped>
.userInfoHeaderBox {
  --create-box-little-gray-white: #F5F5F5FF;
  --create-box-little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --add-event-box-blue: #19275DFF;

  --group-input-back-ground-color: #2F3D6AFF;
}

.userInfoHeaderBox {
  position: absolute;
  top: var(--zero-pixel);
  right: var(--zero-pixel);

  height: 100%;

  color: white;
}

.signInBox {
  position: absolute;
  right: 20px;

  height: 100%;
  width: 40px;

  cursor: pointer;

  display: grid;
  align-items: center;
}

.signUpBox {
  position: absolute;
  right: 60px;

  height: 100%;
  width: 40px;

  cursor: pointer;

  display: grid;
  align-items: center;
}

.userInfo {
  position: absolute;
  right: 20px;
  height: 100%;
  width: 150px;
}

.userNameBox {
  height: 100%;
  width: 100%;

  display: grid;
  align-items: center;
  justify-items: end;
}

.userNameEllipsisBox {
  width: 100%;

  text-align: right;

  text-overflow:ellipsis; /* 文字超出长度会被截取并添加... */
  white-space: nowrap;
  overflow: hidden;

  cursor: pointer;

  display: block;
}


.signPopup {
  position: fixed;
  left: var(--zero-pixel);
  top: var(--zero-pixel);

  height: var(--full-screen-height);
  width: var(--full-screen-width);

  background-color: #000000AA;

  z-index: var(--top-layer);

  display: grid;
  align-items: center;
  justify-items: center;
}
.signPopupBox {
  height: 300px;
  width: 400px;
  border-radius: 10px 10px;

  background-color: var(--event-blue);

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}


.userSignText {
  color: var(--create-box-little-blue-white);
  font-size: 30px;
  font-family: var(--default-font);
}



.usernameInputBox {
  /*position: relative;*/
  /*top: 20px;*/
  /*left: 40px;*/

  margin-top: 10px;
  width: 300px;
  height: 50px;

  border-radius: 5px 5px;
  background-color: var(--create-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}

.userNameInput {
  width: 97.5%;
  height: 88%;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
}
.userNameInput::-webkit-input-placeholder {
  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
}



.passwordInputBox {
  /*position: relative;*/
  /*top: 40px;*/
  /*left: 40px;*/

  margin-top: 10px;
  width: 300px;
  height: 50px;

  border-radius: 5px 5px;
  background-color: var(--create-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}

.passwordInput {
  width: 97.5%;
  height: 88%;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
}
.passwordInput::-webkit-input-placeholder {
  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
}



.signButton {
  /*position: relative;*/
  /*top: 8px;*/
  /*left: 40px;*/

  margin-top: 10px;
  margin-left: 5px;
  width: 100px;
  height: 40px;

  margin-bottom: 30px;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
  border: 2px solid var(--create-box-little-blue-white);
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
  cursor: pointer;

  display: grid;
  align-items: center;
  justify-items: center;
}

.signButton:hover {
  color: var(--create-box-little-gray-white);
  border: 2px solid var(--create-box-little-gray-white);
}



.closeButton {
  /*position: relative;*/
  /*top: 8px;*/
  /*left: 40px;*/

  margin-top: 10px;
  margin-right: 5px;
  width: 100px;
  height: 40px;

  margin-bottom: 30px;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
  border: 2px solid var(--create-box-little-blue-white);
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
  cursor: pointer;

  display: grid;
  align-items: center;
  justify-items: center;
}

.closeButton:hover {
  background-color: var(--danger-dark-red-alpha);
  color: var(--danger-red);
  border: 2px solid var(--danger-dark-red);
}
</style>