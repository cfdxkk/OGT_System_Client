import { createStore } from 'vuex'

export default createStore({
  state: {
    groupList: []
  },
  mutations: {
    updateGroupList (state, payload){
      state.groupList = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
