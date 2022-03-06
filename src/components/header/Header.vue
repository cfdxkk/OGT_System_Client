<template>
  <div id="header" class="headerBox">
    <div class="headerTitle">
      OGT - {{this.$store.state.activeTitleName}}
      <div class="editIcon" v-if="this.$route.path.split('/').slice(-2)[0] === 'chat'" @click="openGroupInfoPage()">
        <svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
      </div>
    </div>

    <user-info></user-info>
  </div>
</template>

<script>
import userInfo from "@/components/header/userInfo/UserInfo";
export default {
  name: "header",
  components: {
    userInfo
  },
  methods: {
    openGroupInfoPage() {
      let chatId = this.$route.path.split('/').slice(-1)[0]
      if (chatId !== '' && chatId !== null) {
        this.$router.push(`/groupInfo/${chatId}`)
      }
    }
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
  color: var(--little-gray-white);

  display: flex;
}
.editIcon {
  margin-top: 1px;
  margin-left: 10px;

  color: var(--over-date-gray);
}
.editIcon:hover {
  color: var(--little-blue-white2);
}
</style>