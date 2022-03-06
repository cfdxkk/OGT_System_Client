<template>
  <div id="searchPage" class="searchPageBox">
    <search-bar />
    <hot-channel style="" />
  </div>
</template>

<script>
import searchBar from "@/components/search/SearchBar";
import hotChannel from "@/components/search/HotChannel";

export default {
  name: "Search",
  components: {
    searchBar,
    hotChannel
  }
}
</script>

<style scoped>
.searchPageBox {
  position: relative;

  width: 100%;
  height: 100%;

  overflow-y: auto;
}

</style>