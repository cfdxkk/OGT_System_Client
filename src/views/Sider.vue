<template>
  <div id="leftSider" class="leftSiderBox">
    <chat-list goto="/search" name="search" ></chat-list>
    <chat-list goto="/chat/test1" name="test1" ></chat-list>
    <chat-list goto="/chat/test2" name="test2" ></chat-list>
    <chat-list goto="/chat/test3" name="test3" ></chat-list>
    <chat-list goto="/chat/test4" name="test4" ></chat-list>
    <chat-list goto="/chat/test5" name="test5" ></chat-list>
    <chat-list goto="/chat/test6" name="test6" ></chat-list>
    <chat-list goto="/chat/test7" name="test7" ></chat-list>
    <chat-list goto="/chat/test8" name="test8" ></chat-list>
    <chat-list goto="/chat/test9" name="test9" ></chat-list>
    <chat-list goto="/chat/test10" name="test10" ></chat-list>
    <chat-list goto="/chat/test11" name="test11" ></chat-list>
    <chat-list goto="/chat/test12" name="test12" ></chat-list>
    <chat-list goto="/chat/test13" name="test13" ></chat-list>
    <chat-list goto="/chat/test14" name="test14" ></chat-list>
    <chat-list goto="/chat/test15" name="test15" ></chat-list>
    <chat-list goto="/chat/test16" name="test16" ></chat-list>
    <chat-list goto="/chat/test17" name="test17" ></chat-list>
    <chat-list goto="/chat/test18" name="test18" ></chat-list>
    <chat-list goto="/create" name="create" ></chat-list>


  </div>
</template>

<script>
import chatList from "@/components/leftList/chatListItem";

export default {
  name: "leftSider",
  components: {
    chatList
  }
}
</script>

<style scoped>
.leftSiderBox {
  width: var(--left-sider-computed-width-small);
  height: calc(var(--full-screen-height) - var(--header-computed-height));

  position: absolute;
  top: var(--header-computed-height);
  left: var(--zero);

  overflow-y: auto;

  background-color: var(--sider-blue);

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.leftSiderBox::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>