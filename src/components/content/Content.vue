<template>
  <div id="content" class="contentBox">
    <event></event>
    <message></message>
  </div>
</template>

<script>
import event from "@/components/content/event/Event";
import message from "@/components/content/message/Message";
export default {
  name: "Content",
  components: {
    event,
    message
  }
}
</script>

<style scoped>
.contentBox {

  position: relative;
  left: var(--zero-pixel);
  top: var(--zero-pixel);

  width: 100%;
  height: 100%;
}
</style>