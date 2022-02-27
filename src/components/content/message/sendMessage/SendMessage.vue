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
    registerURL(){ return "http://" + this.$store.state.serverAddress + "/user/register"},
    loginURL(){ return "http://" + this.$store.state.serverAddress + "/user/login"},
    selectURL(){ return "http://" + this.$store.state.serverAddress + "/user/info"},

    wsURL(){ return "ws://" + this.$store.state.wsServerAddress + "/websocket/"},
    sendMessageUrl(){ return "http://" + this.$store.state.serverAddress + "/message/messagefilterandcluster"},

    offlineMessageUrl(){ return "http://" + this.$store.state.serverAddress + "/messagepull/getofflinemessage"},

    groupMessageUrl() {return "http://" + this.$store.state.serverAddress + "/group/message"}
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
        let username = cookieArray[0]
        let userId = cookieArray[1]
        let token = cookieArray[2]

        // 获取输入的信息文本
        let messageInput = document.getElementById('sentMessageInput').value
        // 从路由中获取群聊ID
        let groupId = this.$route.path.split('/').slice(-1)[0]
        let message = {
          groupIdFrom: groupId,
          uuidFrom: userId,
          usernameFrom: username,
          token: token,
          messageType: '1',
          message: messageInput,
        }

        let messagePrivate = {
          selfMessage: true,
          messageNoInGroup: 0,
          groupIdFrom: groupId,
          uuidFrom: userId,
          usernameFrom: username,
          messageType: '1',
          message: messageInput,

        }

        console.log('tttttttttttttttttttttttttttttest',messagePrivate);
        let _this = this
        this.Axios.post(this.groupMessageUrl, message).then( result => {
          console.log(result.data);
          if (result.data === true){  // 如果消息发送成功
            // 加入到自己的indexeddb中
            _this.Dexie.groupMessages.where('groupIdFrom').equals(groupId).toArray().then(groupMessages => {  // 根据groupId获取indexedDB原来的数据
              if (groupMessages.length === 0){  // 如果 indexedDB 里没有这个群组的消息数据, 插入刚发送的消息
                // 插入到indexedDB中
                _this.Dexie.groupMessages.put({
                  'groupIdFrom': groupId,
                  'messages': [messagePrivate]
                })
                // 加入到vuex活动群组消息中
                _this.$store.commit('updateActiveGroupMessage', [messagePrivate])
              } else { // 如果indexedDB里有这个群组的历史数据，把刚发送的新消息拼接到原来的消息尾部，然后再插入(一个群聊最多50条)

                // 计算出正确的消息顺序号
                messagePrivate.messageNoInGroup = parseInt(groupMessages[0].messages.slice(-1)[0].messageNoInGroup) + 1 + ''
                let newOfflineMessages = groupMessages[0].messages.concat([messagePrivate]).slice(-50)

                // 插入到indexedDB中
                _this.Dexie.groupMessages.put({
                  'groupIdFrom': groupId,
                  'messages': newOfflineMessages
                })
                // 加入到vuex活动群组消息中
                _this.$store.commit('updateActiveGroupMessage', newOfflineMessages)
              }
            })


          }

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

  height: var(--sent-message-box-height);
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