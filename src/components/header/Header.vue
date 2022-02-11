<template>
  <div id="header" class="headerBox">
    <div class="headerTitle">ogt_system_header - {{this.$route.path.split('/').slice(-1)[0]}}</div>
    <user-info></user-info>
  </div>
</template>

<script>
import userInfo from "@/components/header/userInfo/UserInfo";
export default {
  name: "header",
  components: {
    userInfo
  }
}
</script>

<style scoped>

.headerBox {
  background-color: var(--sider-blue);
  height: var(--header-computed-height);
  width: var(--full-screen-width);

  position: absolute;
  top: var(--zero);
  left: var(--zero);

  display: grid;
  align-items: center;
  justify-content: center;

  z-index: var(--top-layer);
}
.headerTitle {
  color: var(--white);
}
</style>