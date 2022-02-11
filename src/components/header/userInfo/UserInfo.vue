<template>
  <div class="userInfoHeaderBox">
    <div id="signInBox" class="signInBox" v-if="!logged" @click="openSignInPopup">登录</div>
    <div id="signUpBox" class="signUpBox" v-if="!logged" @click="openSignUpPopup">注册</div>

    <div class="userInfo" v-if="logged">
      <div class="userNameBox">
        {{this.username}}
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
    registerURL(){ return "http://" + this.hostAddress + "/user/register"},
    loginURL(){ return "http://" + this.hostAddress + "/user/login"},
    selectURL(){ return "http://" + this.hostAddress + "/user/info"},

    wsURL(){ return "ws://" + this.hostAddress + "/websocket/"},
    sendMessageUrl(){ return "http://" + this.hostAddress + "/message/messagefilterandcluster"},

    offlineMessageUrl(){ return "http://" + this.hostAddress + "/messagepull/getofflinemessage"}
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
      let username = document.getElementById('userNameSignInInput').value
      let password = document.getElementById('passwordSignInInput').value

      let loginData = {
        username,
        password
      }

      this.Axios.post(this.loginURL,loginData).then(data => {
        this.username = username
        let cookieStr = "userinfo="+username+"-"+data.data+"; expires=Thu, 18 Dec 2043 12:00:00 GMT"
        document.cookie = cookieStr
        this.signInVisible = false
        this.logged = true
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
      })
    },

  },
  mounted() {
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
}

.userNameBox {
  height: 100%;

  display: grid;
  align-items: center;
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