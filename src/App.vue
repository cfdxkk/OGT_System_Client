<template>
    <ogt-test-header></ogt-test-header>
    <router-view/>
</template>
<script>
import header from "@/views/header";

export default {
  name: "App",

  components: {
    ogtTestHeader: header
  }
}
</script>

<style lang="scss">
</style>
