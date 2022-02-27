<template>
    <div class="showMessageBox">
        <message-item v-for="message in activeGroupMessage" :key="message" :message="message"></message-item>
    </div>
</template>

<script>
import messageItem from "@/components/content/message/showMessage/MessageItem";
export default {
  name: "ShowMessage",
  components: {
    messageItem
  },
  data: () => {
    return {
      // hostAddress: "150.158.98.146:8888",
      hostAddress: "localhost:8888"
    }
  },
  computed: {
    activeGroupMessage() {return this.$store.state.activeGroupMessage},


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
  },
  mounted() {

  }
}
</script>

<style scoped>

.showMessageBox {
  position: absolute;
  bottom: var(--sent-message-box-height);
  left: var(--zero-pixel);

  width: 100%;
  height: calc(100vh - var(--sent-message-box-height) - var(--header-height));

  overflow-y: auto;


}

/* 修改滚动条样式 */
.showMessageBox::-webkit-scrollbar {
  width: 6px;
  background-color: var(--event-back-ground-blue);
}
.showMessageBox::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.showMessageBox::-webkit-scrollbar-thumb:hover {
  background-color: #FFFFFF5A;
}
.showMessageBox::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.showMessageBox::-webkit-scrollbar-track:hover {
  background-color: #FFFFFF12;
}

</style>