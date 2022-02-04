<template>
  <div id="header" class="headerBox">
<!--    <router-link to="/">Home</router-link>-->
<!--    <router-link to="/about" class="paddingLeft20">About</router-link>-->
<!--    <router-link to="/main" class="paddingLeft20">主页</router-link>-->
<!--    <router-link to="/message_test_page" class="paddingLeft20">test page</router-link>-->

    <div class="headerTitle">ogt_system_header - {{this.$route.path.split('/').slice(-1)[0]}}</div>
  </div>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>

.headerBox {
  background-color: var(--sider-blue);
  height: var(--header-height);
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