<template>
  <ogt-header></ogt-header>
  <ogt-left-sider></ogt-left-sider>
  <ogt-content></ogt-content>
</template>
<script>
import RoutedHeader from "@/views/RoutedHeader";
import Sider from "@/views/Sider";
import content from "@/views/Content";

export default {
  name: "App",

  components: {
    ogtHeader: RoutedHeader,
    ogtLeftSider: Sider,
    ogtContent: content
  }
}
</script>

<style lang="scss">
/* height & width */
:root {
  --full-screen-width: 100vw;
  --full-screen-height: 100vh;

  --zero: 0;
  --zero-pixel: 0px;

  --header-height: 5vh;

  --left-sider-width-small: 3.6vw;
  --left-sider-min-width-small: 50px;
  --left-sider-max-width-small: 100px;
  --left-sider-computed-width-small: clamp(var(--left-sider-min-width-small), var(--left-sider-width-small), var(--left-sider-max-width-small));
}
/* colors */
:root {
  --white: #FFFFFFFF;
  --black: #000000FF;

  --sider-blue: #0C132BFF;
  //--sider-blue: #ffffff;

  --body-blue: #222C52FF;
  //--body-blue: #1aff00;

  --search-bar: #2e4e7eFF;
}
/* z-index */
:root {

  --top-layer: 1000;
  --after-top-layer-1: 999;
}

body {
  padding: var(--zero-pixel);
  margin: var(--zero-pixel);
  background-color: var(--white);
}
</style>
