<template>
  <div class="groupInfoBox">


    <div class="groupUserBox">

      <div class="groupUserItemBox"  v-for="activeGroupNumber in this.$store.state.activeGroupNumbersInfo" :key="activeGroupNumber.userId">
        <div class="groupUserAvatarBox" @click="gotoUser(activeGroupNumber.userId)"></div>

        <div class="groupUserInfoBox">
          <div class="groupUserAdminCardBox" v-if="activeGroupNumber.userIdentityInGroup === 2">管理员</div>
          <div class="groupUserLeaderCardBox" v-if="activeGroupNumber.userIdentityInGroup === 1">群主</div>
          <div class="groupUserNameBox" @click="gotoUser(activeGroupNumber.userId)">
            {{ activeGroupNumber.username }}
          </div>
        </div>


        <div class="makeGroupUserAdminBox" v-if="this.makeAdminPower(activeGroupNumber.userIdentityInGroup)" @click="addGroupAdmin(activeGroupNumber.userId)">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="up-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
        </div>
        <div class="removeGroupUserAdminBox" v-if="this.removeAdminPower(activeGroupNumber.userIdentityInGroup)" @click="removeGroupAdmin(activeGroupNumber.userId)" >
          <svg viewBox="64 64 896 896" focusable="false" data-icon="down-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M690 405h-46.9c-10.2 0-19.9 4.9-25.9 13.2L512 563.6 406.8 418.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246c3.2 4.4 9.7 4.4 12.9 0l178-246c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
        </div>
        <div class="removeGroupUserBox" v-if="this.removeUserPower(activeGroupNumber.userIdentityInGroup)" @click="removeGroupUser(activeGroupNumber.userId)">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
        </div>
      </div>
    </div>

    <div class="groupInfoTextBox">
      <div class="groupNameBox">
        群聊名称: {{ this.$store.state.activeGroupInfo.groupName }}
      </div>
      <div class="groupIntroductionBox">
        群聊简介：{{ this.$store.state.activeGroupInfo.groupIntroduction }}
      </div>

      <div class="exitGroupBox" v-if="this.$store.state.activeGroupIdentity !== 1" @click="exitGroup">
        退出群聊
      </div>
      <div class="exitGroupBox" v-if="this.$store.state.activeGroupIdentity === 1" @click="deleteGroup">
        解散群聊
      </div>
    </div>
    <div class="closeIcon" @click="goBack()">
      <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupInfo",
  computed: {
    getUserInGroupByGroupIdUrl() {return "http://" + this.$store.state.serverAddress + "/group/getGroupUsersByGroupId"},
    checkAdminUrl() {return "http://" + this.$store.state.serverAddress + "/group/getGroupIdentity"},
    getGroupInfoUrl() {return "http://" + this.$store.state.serverAddress + "/group/getGroupInfoByGroupId"},
    removeGroupUserUrl() {return "http://" + this.$store.state.serverAddress + "/group/removeUserFromGroup"},
    addGroupAdminUrl() {return "http://" + this.$store.state.serverAddress + "/group/addNewAdmin"},
    removeGroupAdminUrl() {return "http://" + this.$store.state.serverAddress + "/group/removeGroupAdmin"},

    exitGroupUrl() {return "http://" + this.$store.state.serverAddress + "/group/exitGroup"},
    deleteGroupUrl() {return "http://" + this.$store.state.serverAddress + "/group/deleteGroup"},
  },
  methods: {

    makeAdminPower(identity) {return this.$store.state.activeGroupIdentity === 1 && identity !== 2 && identity !== 1},
    removeAdminPower(identity) {return this.$store.state.activeGroupIdentity === 1 && identity === 2},
    removeUserPower(identity) {return  (this.$store.state.activeGroupIdentity === 1 || this.$store.state.activeGroupIdentity === 2) && identity !== 1 && identity !== 2},
    goBack() {
      let chatId = this.$route.path.split('/').slice(-1)[0]
      if (chatId !== '' && chatId !== null) {
        this.$router.push(`/chat/${chatId}`)
      }
    },
    getUsersByGroupId() {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]

        let getUserInGroupByGroupId = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          searcherId: userId,
          searcherToken: token
        }

        this.Axios.post(this.getUserInGroupByGroupIdUrl, getUserInGroupByGroupId).then( userList => {
          this.$store.commit('updateActiveGroupNumbersInfo', userList.data)
        })
      }
    },
    checkAdmin() {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]

        let checkUserIdentity = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          groupAdminId: userId,
          token,
        }

        this.Axios.post(this.checkAdminUrl, checkUserIdentity).then( result => {
          this.$store.commit('updateActiveGroupIdentity', result.data)
        })
      }
    },
    gotoUser(userId) {
      this.$router.push(`/user/${userId}`)
    },
    getGroupInfoByGroupId() {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let userId = cookieArray[1]
        let token = cookieArray[2]

        let getGroupInfoByGroupId = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          userId,
          token
        }

        this.Axios.post(this.getGroupInfoUrl, getGroupInfoByGroupId).then( groupInfo => {
          this.$store.commit('updateActiveGroupInfo', groupInfo.data)
        })
      }
    },
    removeGroupUser(userId) {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let adminUserId = cookieArray[1]
        let token = cookieArray[2]

        let removeeUser = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          userId,
          adminUserId: adminUserId,
          adminToken: token
        }

        this.Axios.post(this.removeGroupUserUrl, removeeUser).then( () => {
          this.getUsersByGroupId()
        })
      }
    },
    addGroupAdmin(userId) {  // 添加新管理员
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let adminUserId = cookieArray[1]
        let token = cookieArray[2]

        let addNewAdmin = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          groupAdminId: userId,
          userId: adminUserId,
          token
        }

        this.Axios.post(this.addGroupAdminUrl, addNewAdmin).then( () => {
          this.getUsersByGroupId()
        })
      }
    },
    removeGroupAdmin(userId) {  // 添加新管理员
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let adminUserId = cookieArray[1]
        let token = cookieArray[2]

        let addNewAdmin = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          groupAdminId: userId,
          userId: adminUserId,
          token
        }

        this.Axios.post(this.removeGroupAdminUrl, addNewAdmin).then( () => {
          this.getUsersByGroupId()
        })
      }
    },
    exitGroup() {  // 添加新管理员
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let adminUserId = cookieArray[1]
        let token = cookieArray[2]

        let exitGroup = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          userId: adminUserId,
          adminUserId,
          adminToken: token
        }

        this.Axios.post(this.exitGroupUrl, exitGroup).then( result => {
          if (result.data === true) {
            // this.$router.push('/search')
            window.location.href = '/search'
          }
        })
      }
    },
    deleteGroup() {  // 添加新管理员
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('userinfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let adminUserId = cookieArray[1]
        let token = cookieArray[2]

        let deleteGroup = {
          groupId: this.$route.path.split('/').slice(-1)[0],
          userId: adminUserId,
          adminUserId,
          adminToken: token
        }

        this.Axios.post(this.deleteGroupUrl, deleteGroup).then( result => {
          if (result.data === true) {
            // this.$router.push('/search')
            window.location.href = '/search'
          }
        })
      }
    },
  },
  mounted() {
    this.checkAdmin()
    this.getGroupInfoByGroupId()
    this.getUsersByGroupId()
  }
}
</script>

<style scoped>
.groupInfoBox {
  position: absolute;
  left: var(--zero-pixel);
  bottom: var(--zero-pixel);

  width: 100%;
  height: 100%;

  /*background-color: yellow;*/
}

.groupUserBox {
  position: absolute;
  left: 40px;
  top: 5%;

  width: 400px;
  height: 90%;

  /*border-radius: 20px;*/
  /*background: var(--event-blue);*/
  /*box-shadow: inset 20px 20px 88px ,*/
  /*inset -20px -20px 88px var(--body-blue);*/

  border-radius: 20px;
  background: var(--event-blue);
  box-shadow:  20px 20px 69px #121f32,
  -20px -20px 69px var(--body-blue);

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;
  -ms-overflow-style: none; /* IE 10+ */
  scrollbar-width: none; /* Firefox */
}
.groupUserBox::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.groupUserItemBox {

  /*position: absolute;*/

  width: 92%;
  height: 70px;

  margin: 10px;

  background-color: var(--group-user-item-blue);
  border-radius: 60px ;

  display: flex;
  align-items: center;
}
.groupUserAvatarBox {
  position: relative;
  left: 10px;

  width: 50px;
  height: 50px;

  background-color: gray;

  border-radius: 100%;

  cursor: pointer;
}
.groupUserInfoBox {
  position: absolute;
  left: 85px;

  height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
.groupUserNameBox {

  max-width: 200px;

  color: var(--little-blue-white2);

  font-size: 22px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  cursor: pointer;
}
.groupUserAdminCardBox {
  /*position: absolute;*/
  /*left: 0px;*/

  width: 50px;
  height: 20px;

  border-radius: 3px 3px;

  background-color: var(--good-green);

  font-size: 15px;
  font-weight: bold;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}

.groupUserLeaderCardBox {
  /*position: absolute;*/
  /*left: 0px;*/

  width: 40px;
  height: 20px;

  border-radius: 3px 3px;

  background-color: var(--good-orange);

  font-size: 15px;
  font-weight: bold;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}

.removeGroupUserBox {
  position: absolute;
  right: 35px;

  padding-top: 7px;
  font-size: 30px;
  color: var(--little-blue-white);
}
.removeGroupUserBox:hover {
  color: var(--danger-dark-red);
}
.makeGroupUserAdminBox {
  position: absolute;
  right: 75px;

  padding-top: 8px;
  font-size: 28px;
  color: var(--little-blue-white);
}
.makeGroupUserAdminBox:hover {
  color: var(--good-dark-green);
}
.removeGroupUserAdminBox {
  position: absolute;
  right: 75px;

  padding-top: 8px;
  font-size: 28px;
  color: var(--little-blue-white);
}
.removeGroupUserAdminBox:hover {
  color: var(--danger-dark-red);
}
.groupInfoTextBox {
  position: absolute;
  left: 500px;
  top: 5%;

  width: 400px;

  color: var(--little-blue-white2);

}
.groupNameBox {
  font-size: 30px;
  padding-top: 20px;
}
.groupIntroductionBox {
  font-size: 20px;
  padding-top: 20px;
}

.exitGroupBox{
  position: relative;
  /*left: 500px;*/
  top: 20px;

  width: 392px;
  height: 70px;

  background-color: var(--event-blue);
  border: 4px solid var(--search-bar);
  color: var(--little-blue-white);

  font-size: 20px;

  border-radius: 10px 10px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}
.exitGroupBox:hover {
  background-color: var(--danger-dark-red-alpha);
  border: 4px solid var(--danger-dark-red);
  color: var(--danger-pink);
}












.closeIcon {
  position: absolute;
  top: 10px;
  right: 15px;

  font-size: 30px;

  color: var(--over-date-gray);
}
.closeIcon:hover {
  color: var(--little-blue-white2);
}
</style>