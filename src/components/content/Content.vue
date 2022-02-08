<template>
  <div id="content" class="contentBox">
    <event></event>
  </div>
</template>

<script>
import event from "@/components/content/event/Event";
export default {
  name: "Content",
  components: {
    event
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