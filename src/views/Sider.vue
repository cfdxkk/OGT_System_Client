<template>
  <div id="leftSider" class="leftSiderBox">
    <chat-list goto="/search" itemId="search" name="search" btn-type="system"></chat-list>
    <chat-list v-for="group in groupList" :key="group" :goto="'/chat/' + group.groupId" :itemId="group.groupId" :name="group.groupName" btn-type="groups"></chat-list>
    <chat-list goto="/create" itemId="create" name="create" btn-type="system"></chat-list>


  </div>
</template>

<script>
import chatList from "@/components/leftList/ChatListItem";

export default {
  name: "leftSider",
  data: () => {
    return {
      // groupList: [],


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

    getGroupsByNameUrl(){ return "http://" + this.$store.state.serverAddress + "/group/search?groupName="},
    joinGroupUrl(){ return "http://" + this.$store.state.serverAddress + "/group/join"},
    getGroupListUrl(){ return "http://" + this.$store.state.serverAddress + "/group?userId="},

    groupList(){ return this.$store.state.groupList}

  },
  components: {
    chatList
  },
  methods: {
    getGroupList: function (){
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let cookieArray = (cookie.split('=')[1]).split('-');
        let userId = cookieArray[1]

        this.Axios.get(this.getGroupListUrl + userId).then(groups => {
          // console.log('groupsList',groups.data)
          this.$store.commit('updateGroupList', groups.data)
        })
      }
    }
  },
  mounted() {
    this.getGroupList()
  }
}
</script>

<style scoped>
.leftSiderBox {
  width: var(--left-sider-computed-width-small);
  height: calc(var(--full-screen-height) - var(--header-computed-height));

  position: absolute;
  top: var(--header-computed-height);
  left: var(--zero);

  overflow-y: auto;

  background-color: var(--sider-blue);

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.leftSiderBox::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>