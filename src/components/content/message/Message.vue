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