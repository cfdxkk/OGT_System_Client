<template>
  <div class="messagePage">
    <send-message></send-message>
    <show-message></show-message>
  </div>
</template>

<script>

import sendMessage from "@/components/content/message/sendMessage/SendMessage";
import showMessage from "@/components/content/message/showMessage/ShowMessage";


export default {
  name: "Message",
  components: {
    sendMessage,
    showMessage
  },
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

    groupMessageUrl() {return "http://" + this.$store.state.serverAddress + "/group/message"},

    groupOfflineMessageUrl() {return "http://" + this.$store.state.serverAddress + "/group/offlineMessage"}
  },
  methods: {
    getOfflineMessage() {

      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let cookieArray = (cookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]

        // 组装post请求体
        let groupMessageUserInfo = {
          uuidTo: userId,
          token
        }

        const _this = this
        this.Axios.post(this.groupOfflineMessageUrl, groupMessageUserInfo).then(offlineMessagesFromGroups => { // 获取离线消息

          let messagesFromGroups = offlineMessagesFromGroups.data

          if (Object.keys(messagesFromGroups).length !== 0){  // 如果有离线消息，则把离线消息放入vuex
            _this.$store.commit('updateOfflineMessage', messagesFromGroups)
          }

          Object.keys(messagesFromGroups).forEach(groupId => {  //如果有离线消息，则遍历出groupId
            _this.Dexie.groupMessages.where('groupIdFrom').equals(groupId).toArray().then(groupMessages => {  // 根据groupId获取indexedDB原来的数据
              if (groupMessages.length === 0){  // 如果indexedDB里没有这个群组的消息数据, 插入获取到的消息(一个群聊最多50条)
                  _this.Dexie.groupMessages.put({
                    'groupIdFrom': groupId,
                    'messages': messagesFromGroups[groupId].slice(-50)
                  })
                if (this.$route.path.split('/').slice(-1)[0] === groupId) {
                  // 加入到vuex活动群组消息中
                  this.$store.commit('updateActiveGroupMessage', messagesFromGroups[groupId])
                }
              } else { // 如果indexedDB里有这个群组的历史数据，把获取到的新消息拼接到原来的消息尾部，然后再插入(一个群聊最多50条)
                let newOfflineMessages = groupMessages[0].messages.concat(messagesFromGroups[groupId]).slice(-50)
                _this.Dexie.groupMessages.put({
                  'groupIdFrom': groupId,
                  'messages': newOfflineMessages
                })
                if (this.$route.path.split('/').slice(-1)[0] === groupId) {
                  // 加入到vuex活动群组消息中
                  this.$store.commit('updateActiveGroupMessage', newOfflineMessages)
                }
              }
            })
          })
        })
      }
    }
  },
  mounted() {
    this.getOfflineMessage()
  }
}
</script>

<style scoped>

.messagePage {
  position: absolute;
  left: var(--zero-pixel);
  top: var(--zero-pixel);


  width: calc(100vw - var(--event-box-computed-width) - var(--left-sider-computed-width-small));
  height: calc(100vh - var(--header-computed-height));
}

</style>