<template>
  <div id="content" class="contentBox">
    <router-view name="content"/>
  </div>
</template>

<script>
export default {
  name: "Content"
}
</script>

<style scoped>
.contentBox {
  width: calc(var(--full-screen-width) - var(--left-sider-computed-width-small));
  height: calc(var(--full-screen-height) - var(--header-computed-height));

  position: absolute;
  top: var(--header-computed-height);
  left: var(--left-sider-computed-width-small);

  background-color: var(--body-blue);
}

</style>