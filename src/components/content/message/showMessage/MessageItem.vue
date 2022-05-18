<template>
  <div class="message" v-if="this.$props.message.messageType !== '2'">
    <div class="messageUserAvatar">
      <div class="messageUserAvatarBox" :class="'messageSenderAvatar' + this.$props.message.uuidFrom" @click="gotoUserPage(this.$props.message.uuidFrom)"></div>
    </div>
    <div class="messageBox">
      <div class="messageUserInfo" @click="gotoUserPage(this.$props.message.uuidFrom)">{{this.$props.message.usernameFrom}}</div>
      <div class="messageMessage">{{this.$props.message.message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    message: Object
  },
  computed: {
    userInfoUrl(){ return "http://" + this.$store.state.serverAddress + "/user/info?uuid="},
  },
  methods: {
    gotoUserPage(userId) {
      this.$router.push(`/user/${userId}`)
    },
    setMessageSenderAvatar() {

      this.Axios.get(this.userInfoUrl + this.$props.message.uuidFrom).then(userinfo => {
        let userAvatarList = document.getElementsByClassName('messageSenderAvatar' + this.$props.message.uuidFrom)
        console.log('userAvatarList', userAvatarList)
        for(let i = 0; i < userAvatarList.length; i++){
          userAvatarList[i].style.backgroundImage = `url("${userinfo.data.userAvatar}")`
        }
      })

    }
  },
  mounted() {
    this.setMessageSenderAvatar()
  }
}
</script>

<style scoped>

.message {

  /*height: 60px;*/
  width: 100%;

  margin-top: 5px;
  margin-bottom: 5px;

  display: flex;
}

.message:hover {
  background-color: var(--event-blue);
}

.messageUserAvatar {
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.messageUserAvatarBox {
  width: 70%;
  height: 70%;

  clip-path: circle(50%);

  cursor: pointer;

  background-size: cover;
  background-repeat:no-repeat;

  background-color: white;
}

.messageBox {
  width: calc(100% - 60px);
  height: 100%;

  margin-top: 9px;

  /*background-color: red;*/

  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: center;*/
}

.messageUserInfo {

  width: auto;
  display: inline;

  font-size: 14px;
  color: var(--little-blue-white2);
  cursor: pointer;
}

.messageMessage {
  font-size: 16px;
  color: var(--little-gray-white);
}

</style>