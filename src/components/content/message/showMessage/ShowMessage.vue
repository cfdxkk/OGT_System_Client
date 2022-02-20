<template>
  <div>
    <button @click="getOfflineMessage">获取离线消息</button>
  </div>
</template>

<script>
export default {
  name: "ShowMessage",
  data: () => {
    return {
      // hostAddress: "150.158.98.146:8888",
      hostAddress: "localhost:8888",


      message: []
    }
  },
  computed: {
    registerURL(){ return "http://" + this.hostAddress + "/user/register"},
    loginURL(){ return "http://" + this.hostAddress + "/user/login"},
    selectURL(){ return "http://" + this.hostAddress + "/user/info"},

    wsURL(){ return "ws://" + this.hostAddress + "/websocket/"},
    sendMessageUrl(){ return "http://" + this.hostAddress + "/message/messagefilterandcluster"},

    offlineMessageUrl(){ return "http://" + this.hostAddress + "/messagepull/getofflinemessage"},

    groupMessageUrl() {return "http://" + this.hostAddress + "/group/message"},

    groupOfflineMessageUrl() {return "http://" + this.hostAddress + "/group/offlineMessage"}
  },
  methods: {
    getOfflineMessage() {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和tokey
        let cookieArray = (cookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]

        // 从路由中获取群聊ID
        let groupId = this.$route.path.split('/').slice(-1)[0]

        let groupMessageUserInfo = {
          uuidTo: userId,
          groupIdFrom: groupId,
          token

        }

        this.Axios.post(this.groupOfflineMessageUrl, groupMessageUserInfo).then(offlineMessage => {
          console.log("offlineMessage is: ", offlineMessage.data)
        })
      }
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>