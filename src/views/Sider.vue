<template>
  <div id="leftSider" class="leftSiderBox">
    <chat-list goto="/search" name="search" ></chat-list>
    <chat-list v-for="group in groupList" :key="group" :goto="'/chat/' + group.groupId" :name="group.groupName" ></chat-list>
    <chat-list goto="/create" name="create" ></chat-list>


  </div>
</template>

<script>
import chatList from "@/components/leftList/chatListItem";

export default {
  name: "leftSider",
  data: () => {
    return {
      groupList: [],


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

    getGroupsByNameUrl(){ return "http://" + this.hostAddress + "/group/search?groupName="},
    joinGroupUrl(){ return "http://" + this.hostAddress + "/group/join"},
    getGroupListUrl(){ return "http://" + this.hostAddress + "/group?userId="},
  },
  components: {
    chatList
  },
  methods: {
    getGroupList: function (){
      // 从cookie中获取uuid
      let cookieArray = (document.cookie.split('=')[1]).split('-');
      let userId = cookieArray[1]

      this.Axios.get(this.getGroupListUrl + userId).then(groups => {
        console.log('groupsList',groups.data)
        this.groupList = groups.data
      })

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