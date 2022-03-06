<template>
  <div id="chatListIcon" class="chatListIconBox" :class="{chatListIconRoundedCorners: isActive}" @click="goChat">
    <div id="chatListIconTopRoundedCorners" class=" chatListIconRoundedCornersBox" :class="{chatListIconTopRoundedCornersBox: isActive}" >
      <div id="chatListIconBottomRoundedCorners" class=" chatListIconRoundedCornersBox" :class="{chatListIconBottomRoundedCornersBox: isActive}">
        <div class="chatListIconImgBox">
          <div class="fakeImage">
            {{this.$props.name}}
<!--            <img :src="img" :alt="name">-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "chatListItem",
  props: {
    name: {
      type: String
    },
    btnType: {
      type: String
    },
    itemId: {
      type: String
    },
    img: {
      type: String
    },
    goto: {
      type: String
    }
  },
  data: () => {
    return {
      isActive: false
    }
  },
  computed: {
    groupEventUrl() {return "http://" + this.$store.state.serverAddress + "/group/event"}
  },
  watch:{
    $route(to){
      let url = to.path
      let chatId = url.split('/').slice(-1)[0]
      if(chatId !== '') {
        if(chatId === this.$props.itemId) {
          this.isActive = true
          if (this.$props.btnType === 'groups') {
            this.pushActiveGroupMessagesToVuex(this.$props.itemId)
          }
        } else {
          this.isActive = false
        }
      }
    }
  },
  methods: {
    goChat() {
      // 切换路由
      this.$router.push(`${this.$props.goto}`)
    },
    checkActive() {
      let routeAddress = this.$route.path.split('/').slice(-1)[0]
      if (routeAddress === this.$props.itemId){
        this.isActive = true
        if (this.$props.btnType === 'groups') {
          this.pushActiveGroupMessagesToVuex(this.$props.itemId)
        }
      } else {
        this.isActive = false
      }
    },
    pushActiveGroupMessagesToVuex(groupId){
      console.log(groupId + '群被激活一次')
      let _this = this
      // 把indexedDB中的数据推入vuex的 activeGroupMessage 中
      this.Dexie.groupMessages.where('groupIdFrom').equals(groupId).toArray().then(groupMessages => {  // 根据groupId获取indexedDB原来的数据
        if (groupMessages.length === 0) { // 如果indexedDB中没找到用户点击的群的消息，则向vuex的活动消息推空数组
          _this.$store.commit('updateActiveGroupMessage', [])
        } else { // 如果indexedDB中找到用户点击的群的消息，则向vuex的活动消息推找到的消息数组

          console.log("offlineMMMMMMMMMMMMMMMMMM", groupMessages[0].messages)
          if (this.$route.path.split('/').slice(-1)[0] === groupId) {
            // 加入到vuex活动群组消息中
            _this.$store.commit('updateActiveGroupMessage', groupMessages[0].messages)
            // 插入到vuex活动群聊事件中
            // _this.$store.commit('updateActiveGroupEvent', groupMessages[0].messages.filter( groupEvent => groupEvent.messageType === '2'))
          }
        }
      })




      // 从数据库获取事件然后把获取到的事件放入vuex中
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1){
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]

        let eventGetter = {
          groupId,
          userId,
          token
        }

        this.Axios.post(this.groupEventUrl, eventGetter).then( groupEvents => {
          _this.$store.commit('updateActiveGroupEvent', groupEvents.data)
        } )
      }


    }
  },
  mounted() {
    this.checkActive()
  }
}
</script>

<style scoped>

.chatListIconBox {
  --border-height: 17px;
  --border-width: 17px;
  --border-rounded-corners: 17px;
  --image-padding: 10px;
}

.chatListIconBox {
  width: var(--left-sider-computed-width-small);
  height: var(--left-sider-computed-width-small);

  position: relative;
  left: var(--zero);

  cursor: pointer;
  background-color: var(--sider-blue);
  z-index: calc(var(--top-layer) - 3);
}
.chatListIconRoundedCornersBox {
  width: var(--left-sider-computed-width-small);
  height: var(--left-sider-computed-width-small);

  position: relative;
  left: var(--zero);
  top: var(--zero);
}
.chatListIconImgBox {
  width: var(--left-sider-computed-width-small);
  height: var(--left-sider-computed-width-small);

  position: relative;
  left: var(--zero);
  top: var(--zero);

  display: grid;
  align-items: center;
  justify-content: center;
}
.chatListIconRoundedCorners {
  background-color: var(--body-blue) !important;
  z-index: calc(var(--top-layer) - 1) !important;
}
.chatListIconTopRoundedCornersBox:before {
  width: var(--border-width);
  height: var(--border-height);

  position: absolute;
  right: var(--zero);
  top: calc(var(--border-height) * -1);

  content: '';
  background-color: var(--sider-blue);
  clip-path: polygon(-1px 100%, 100% 100%, 100% -1px);
  -webkit-clip-path: polygon(-1px 100%, 100% 100%, 100% -1px);

  border-bottom-right-radius: var(--border-rounded-corners) var(--border-rounded-corners);
  z-index: calc(var(--top-layer) - 1);
  pointer-events: none;
}
.chatListIconTopRoundedCornersBox:after {
  width: var(--border-width);
  height: var(--border-height);

  position: absolute;
  right: var(--zero);
  top: calc(var(--border-height) * -1);

  content: '';
  background-color: var(--body-blue);
  clip-path: polygon(100% 0, 100% calc(100% + 1px), 0 calc(100% + 1px) );
  -webkit-clip-path: polygon(100% 0, 100% calc(100% + 1px), 0 calc(100% + 1px) );
  z-index: calc(var(--top-layer) - 2);
  pointer-events: none;
}
.chatListIconBottomRoundedCornersBox:before {
  width: var(--border-width);
  height: var(--border-height);

  position: absolute;
  right: var(--zero);
  bottom: calc(var(--border-height) * -1);

  content: '';
  background-color: var(--sider-blue);
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%);

  border-top-right-radius: var(--border-rounded-corners) var(--border-rounded-corners);
  z-index: calc(var(--top-layer) - 1);
  pointer-events: none;
}
.chatListIconBottomRoundedCornersBox:after {
  width: var(--border-width);
  height: var(--border-height);

  position: absolute;
  right: var(--zero);
  bottom: calc(var(--border-height) * -1);

  content: '';
  background-color: var(--body-blue);
  clip-path: polygon(0 -1px, 100% -1px, 100% 100%);
  -webkit-clip-path: polygon(0 -1px, 100% -1px, 100% 100%);
  z-index: calc(var(--top-layer) - 2);
  pointer-events: none;
}

.fakeImage {
  width: calc(var(--left-sider-computed-width-small) - var(--image-padding));
  height: calc(var(--left-sider-computed-width-small) - var(--image-padding));
  border-radius: 100%;

  display: grid;
  justify-content: center;
  align-items: center;

  background-color: gainsboro;
}

</style>