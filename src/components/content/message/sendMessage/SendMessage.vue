<template>
  <div id="sentMessageBox" class="sentMessageBox">
    <div id="sentMessageInputBox" class="sentMessageInputBox">
      <input id="sentMessageInput" type="text" class="sentMessageInput">
      <div id="sentMessageSentButton" class="sentMessageSentButton" @click="sentMessage">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendMessage",
  data: () => {
    return{
      // hostAddress: "150.158.98.146:8888",
      hostAddress: "localhost:8888",
    }
  },
  computed: {
    registerURL(){ return "http://" + this.hostAddress + "/user/register"},
    loginURL(){ return "http://" + this.hostAddress + "/user/login"},
    selectURL(){ return "http://" + this.hostAddress + "/user/info"},

    wsURL(){ return "ws://" + this.hostAddress + "/websocket/"},
    sendMessageUrl(){ return "http://" + this.hostAddress + "/message/messagefilterandcluster"},

    offlineMessageUrl(){ return "http://" + this.hostAddress + "/messagepull/getofflinemessage"},

    groupMessageUrl() {return "http://" + this.hostAddress + "/group/message"}
  },
  methods: {
    sentMessageBoxInAnime() {
      let sentMessageBox = document.getElementById('sentMessageBox')
      sentMessageBox.animate(
          [
            {backgroundColor: '#00000000'},
            {backgroundColor: 'var(--event-back-ground-blue)'}
          ], {
            duration: 200,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in-out"
          }
      )
    },
    sentMessageBoxOutAnime() {
      let sentMessageBox = document.getElementById('sentMessageBox')
      sentMessageBox.animate(
          [
            {backgroundColor: 'var(--event-back-ground-blue)'},
            {backgroundColor: '#00000000'},
          ], {
            duration: 300,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in-out"
          }
      )
    },
    sentMessageButtonInAnime() {
      let sentMessageSentButton = document.getElementById('sentMessageSentButton')
      sentMessageSentButton.animate(
          [
            {
              color: '#C5CCEFFC',
              backgroundColor: '#243E62FF'
            },
            {
              color: '#EFEFF6FC',
              backgroundColor: '#103456FF'
            }
          ], {
            duration: 100,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in-out"
          }
      )
    },
    sentMessageButtonOutAnime() {
      let sentMessageSentButton = document.getElementById('sentMessageSentButton')
      sentMessageSentButton.animate(
          [
            {
              color: '#EFEFF6FC',
              backgroundColor: '#103456FF'
            },
            {
              color: '#C5CCEFFC',
              backgroundColor: '#243E62FF'
            }
          ], {
            duration: 200,
            iterations: 1,
            fill: "forwards",
            easing: "ease-in-out"
          }
      )
    },
    sentMessage() {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和tokey
        let cookieArray = (cookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]

        // 获取输入的信息文本
        let messageInput = document.getElementById('sentMessageInput').value
        // 从路由中获取群聊ID
        let groupId = this.$route.path.split('/').slice(-1)[0]
        let message = {
          groupIdFrom: groupId,
          uuidFrom: userId,
          token: token,
          messageType: '1',
          message: messageInput,

        }
        this.Axios.post(this.groupMessageUrl, message).then( data => {
          console.log(data.data);
        })

      }
    }
  },
  mounted() {
    let sentMessageBox = document.getElementById('sentMessageBox')
    sentMessageBox.addEventListener('mouseenter', this.sentMessageBoxInAnime)
    sentMessageBox.addEventListener('mouseleave', this.sentMessageBoxOutAnime)
    let sentMessageSentButton = document.getElementById('sentMessageSentButton')
    sentMessageSentButton.addEventListener('mouseenter', this.sentMessageButtonInAnime)
    sentMessageSentButton.addEventListener('mouseleave', this.sentMessageButtonOutAnime)
  },
  unmounted() {
    // let sentMessageBox = document.getElementById('sentMessageBox')
    // sentMessageBox.removeEventListener('mouseenter', this.sentMessageBoxInAnime,false)
    // sentMessageBox.removeEventListener('mouseleave', this.sentMessageBoxOutAnime,false)
    // let sentMessageSentButton = document.getElementById('sentMessageSentButton')
    // sentMessageSentButton.removeEventListener('mouseenter', this.sentMessageButtonInAnime,false)
    // sentMessageSentButton.removeEventListener('mouseleave', this.sentMessageButtonOutAnime,false)
  }
}
</script>

<style scoped>
.sentMessageBox {
  position: absolute;
  left: var(--zero-pixel);
  bottom: var(--zero-pixel);

  height: 70px;
  width: 100%;

  /*background-color: greenyellow;*/

  display: flex;
  justify-content: center;
  align-items: center;

}

.sentMessageInputBox {
  height: 40px;
  width: 99%;

  border-radius: 7px 7px;

  background-color: var(--search-bar);

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sentMessageInput {
  width: calc(100% - 100px);
  height: 35px;

  margin-left: 10px;

  font-size: 17px;

  border: 0;
  outline:none;

  background-color: #00000000;
  /*background-color: red;*/
  color: #C5CCEFFC;

}
.sentMessageSentButton {
  width: 70px;
  height: 30px;

  margin-right: 10px;

  border-radius: 7px 7px;
  background-color: #243E62FF;
  color: #C5CCEFFC;

  cursor: pointer;

  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>