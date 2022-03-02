<template>
  <div id="content" class="contentBox">
    <router-view name="content"/>
  </div>
</template>

<script>
export default {
  name: "Content",
  methods: {
    // connectWsServer() {
    //   //判断当前浏览器是否支持WebSocket
    //   if('WebSocket' in window){
    //     console.log('当前浏览器支持websocket')
    //
    //     let cookie = document.cookie
    //     if (cookie !== '') {
    //       // 从cookie中获取uuid和token
    //       let cookieArray = (cookie.split('=')[1]).split('-');
    //       let wsUsername = cookieArray[0]
    //       let wsUUID = cookieArray[1]
    //       let wsToken = cookieArray[2]
    //
    //       let trueWsURL = `ws://${this.$store.state.wsServerAddress}/websocket/${wsUsername}/${wsUUID}/${wsToken}`
    //       console.log('wsUrl', trueWsURL)
    //       this.websocket = new WebSocket(trueWsURL);
    //
    //       //连接发生错误的回调方法
    //       this.websocket.onerror = () => {
    //         console.log("error")
    //       }
    //       //连接成功建立的回调方法
    //       this.websocket.onopen = () => {
    //         console.log("open")
    //       }
    //       //接收到消息的回调方法
    //       this.websocket.onmessage = event => {
    //         console.log("============= message back =============")
    //         // this.setMessageInnerHTML(event.data);
    //         console.log(event.data)
    //         let messageArrayString = event.data
    //         if (messageArrayString !== null && messageArrayString !== ''){
    //
    //           let messageArray = event.data.split(' >clip_:< ')
    //
    //           let groupIdFrom = messageArray[0]
    //           let uuidFrom = messageArray[1]
    //           let usernameFrom = messageArray[2]
    //           let messageType = messageArray[3]
    //           let message = messageArray[4]
    //           let messageNoInGroup = messageArray[5]
    //
    //
    //
    //           let messagePrivate = {
    //             selfMessage: true,
    //             messageNoInGroup,
    //             groupIdFrom,
    //             uuidFrom,
    //             usernameFrom,
    //             messageType,
    //             message,
    //           }
    //
    //           // 接收到的消息插入到自己的indexeddb中
    //           this.Dexie.groupMessages.where('groupIdFrom').equals(groupIdFrom).toArray().then(groupMessages => {  // 根据groupId获取indexedDB原来的数据
    //             if (groupMessages.length === 0){  // 如果indexedDB里没有这个群组的消息数据, 插入刚发送的消息
    //               // 插入到indexedDB中
    //               this.Dexie.groupMessages.put({
    //                 'groupIdFrom': groupIdFrom,
    //                 'messages': [messagePrivate]
    //               })
    //               // 如果是当前活跃的群聊
    //               if (this.$route.path.split('/').slice(-1)[0] === groupIdFrom) {
    //                 // 加入到vuex活动群组消息中
    //                 this.$store.commit('updateActiveGroupMessage', [messagePrivate])
    //               }
    //             } else { // 如果indexedDB里有这个群组的历史数据，把刚发送的新消息拼接到原来的消息尾部，然后再插入(一个群聊最多50条)
    //
    //               // 计算出正确的消息顺序号
    //               messagePrivate.messageNoInGroup = parseInt(groupMessages[0].messages.slice(-1)[0].messageNoInGroup) + 1 + ''
    //               let newOfflineMessages = groupMessages[0].messages.concat([messagePrivate]).slice(-50)
    //
    //               // 插入到indexedDB中
    //               this.Dexie.groupMessages.put({
    //                 'groupIdFrom': groupIdFrom,
    //                 'messages': newOfflineMessages
    //               })
    //
    //               // 如果是当前活跃的群聊
    //               if (this.$route.path.split('/').slice(-1)[0] === groupIdFrom) {
    //                 console.log('-----------------------------------------------active')
    //                 // 加入到vuex活动群组消息中
    //                 this.$store.commit('updateActiveGroupMessage', newOfflineMessages)
    //               }
    //             }
    //           })
    //         }
    //       }
    //       //连接关闭的回调方法
    //       this.websocket.onclose = () => {
    //         console.log("close")
    //         trueWsURL = this.$store.state.wsServerAddress
    //       }
    //     }
    //
    //
    //   }
    //   else{
    //     alert('Not support websocket')
    //   }
    // }
  },
  mounted() {
    // this.connectWsServer()
  }
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