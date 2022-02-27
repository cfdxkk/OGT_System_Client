<template>
  <div class="message">
    <div class="messageUserAvatar">
      <div class="messageUserAvatarBox"></div>
    </div>
    <div class="messageBox">
      <div class="messageUserInfo">{{this.$props.message.usernameFrom}}</div>
      <div class="messageMessage">{{this.$props.message.message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    message: Object
  }
}
</script>

<style scoped>

.message {

  height: 60px;
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

  background-color: white;
}

.messageBox {
  width: calc(100% - 60px);
  height: 100%;

  /*background-color: red;*/

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.messageUserInfo {
  font-size: 14px;
  color: var(--little-blue-white2);
}

.messageMessage {
  font-size: 18;
  color: var(--little-gray-white);
}

</style>