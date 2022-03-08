import { createStore } from 'vuex'

export default createStore({
  state: {
    wsServerAddress: "localhost:8888",
    serverAddress: "localhost:8888",
    // wsServerAddress: "150.158.98.146:8888",
    // serverAddress: "150.158.98.146:8888",

    activeTitleName: '搜索',  // OGT的标题



    groupList: [],  // 群列表
    offlineMessage: {},   // 离线消息
    activeGroupMessage: [],  // 当前活动群聊中的消息
    activeGroupEvent: [],  // 当前活动群聊中的事件

    activeGroupNumbersInfo: [],  // 当前活动的群聊中的成员信息
    activeGroupIdentity: 0,  // 是否拥有对当前活跃群聊的管理权限
    activeGroupInfo: {}, //当前活跃的群聊信息
  },
  mutations: {
    updateGroupList (state, payload) {
      state.groupList = payload
    },
    updateOfflineMessage (state, payload) {
      // state.offlineMessage = payload
      let messageFromNewGroup = Object.keys(payload).filter(messageFromGroupId => Object.keys(state.offlineMessage).indexOf(messageFromGroupId) === -1) // 在原来的offlineMessage里不存在的群组ID
      let messageFromOldGroup = Object.keys(payload).filter(messageFromGroupId => Object.keys(state.offlineMessage).indexOf(messageFromGroupId) !== -1) // 在原来的offlineMessage里存在的群组ID

      // console.log(Object.keys(payload));
      // console.log(Object.keys(state.offlineMessage));

      // 向vuex追加新的群组的离线消息数据
      messageFromNewGroup.forEach(newGroupId => {
        state.offlineMessage[newGroupId] = payload[newGroupId].slice(-50)  // 只追加其中的50条
      })

      // 向vuex追加已经在原数据中存在的群组的离线消息数据
      messageFromOldGroup.forEach(oldGroupId => {
        let offlineMessageInThisOldGroup = state.offlineMessage[oldGroupId]
        payload[oldGroupId].forEach(offlineMessage => {
          offlineMessageInThisOldGroup.push(offlineMessage)
        })
        state.offlineMessage[oldGroupId] = offlineMessageInThisOldGroup.slice(-50)
      })
    },
    updateActiveGroupMessage(state, payload) {
      state.activeGroupMessage = payload
    },
    updateActiveGroupEvent (state, payload) {
      state.activeGroupEvent = payload
    },
    updateActiveTitleName (state, payload) {
      state.activeTitleName = payload
    },
    updateActiveGroupNumbersInfo (state, payload) {
      state.activeGroupNumbersInfo = payload
    },
    updateActiveGroupIdentity (state, payload) {
      state.activeGroupIdentity = payload
    },
    updateActiveGroupInfo (state, payload) {
      state.activeGroupInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
