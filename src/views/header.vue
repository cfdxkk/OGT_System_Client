<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about" class="paddingLeft20">About</router-link>
    <router-link to="/main" class="paddingLeft20">主页</router-link>
    <router-link to="/message_test_page" class="paddingLeft20">test page</router-link>
  </div>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>

.paddingLeft20{
  padding-left: 20px;
}
</style>