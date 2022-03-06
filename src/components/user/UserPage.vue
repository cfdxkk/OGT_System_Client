<template>
  <div class="userInfoBox">
    <div class="userBackground">
      <div class="userBackgroundTop"></div>
      <div class="userBackgroundLine"></div>
    </div>
    <div class="userAvatar"></div>
    <div class="userNameBox">{{this.userInfo.username}}</div>
    <div class="userDetailInfoTextBox">用户信息</div>
    <div class="userDetailInfoBox">
      <div class="userInfoItemBox">邮箱：{{this.userInfo.userEmail}}</div>
<!--      <div class="userInfoItemBox">生日：{{this.userInfo.userBirthday}}</div>-->
      <div class="userInfoItemBox">住址：{{this.userInfo.userLocation}}</div>
      <div class="userInfoItemBox">性别：{{this.userInfo.userSex}}</div>
      <div class="userInfoItemBox">服务器ID：{{this.userInfo.userWsServer}}</div>
      <div class="userInfoItemBox">个人简介：{{this.userInfo.userInfo}}</div>
    </div>

    <div class="logOutButtonBox" v-if="userInfo.userId === this.cookieUserId" @click="logout()">
      退出登录
    </div>

    <div class="userGroupTextBox" v-if="userInfo.userId === this.cookieUserId">加入的群聊</div>
    <div id="hotChannelPage" class="hotChannelPageBox" v-if="userInfo.userId === this.cookieUserId">
      <div id="hotChannel" class="hotChannelBox">
        <div class="channelsBox">
          <div class="channel" v-for="group in this.$store.state.groupList" :key="group.groupId">
            <div class="hotGroupInfoBox">
              <div class="hotGroupNameBox">{{group.groupName}}</div>
              <div class="joinGroup"><div class="joinGroupCard" @click="joinGroup(group.groupId)">+加入</div></div>
              <div class="hotGroupTextBox">{{group.groupIntroduction}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data: () => {
    return {
      userInfo: {},
      cookieUserId: ''
    }
  },
  computed: {
    userInfoUrl(){ return "http://" + this.$store.state.serverAddress + "/user/info?uuid="},
    joinGroupUrl(){ return "http://" + this.$store.state.serverAddress + "/group/join"},
  },
  watch:{
    $route(){
      this.getUserInfo()
    }
  },
  methods: {
    getUserInfo() {
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
        this.cookieUserId = cookieArray[1]
            let userId = this.$route.path.split("/")[this.$route.path.split("/").length - 1]
        console.log('router', userId)
        this.Axios.get(this.userInfoUrl + userId).then(userinfo => {
          this.userInfo = userinfo.data
        })
      }
    },
    joinGroup(groupId){

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
        let UUID = cookieArray[1]

        let groupRelationship = {
          groupId,
          userId: UUID
        }
        this.Axios.post(this.joinGroupUrl, groupRelationship).then(groups => {
          if (groups.data.length !== 0 || groups.data !== '' || groups.data !== null) {
            this.$store.commit('updateGroupList', groups.data)
            this.$router.push(`/chat/${groupId}`)
            // console.log(groups.data)
          }
        })
      }
    },
    logout(){

      // 清除cookie
      let keys = document.cookie.match(/[^ =;]+(?==)/g);
      if(keys) {
        for(let i = keys.length; i--;)
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()+";path=/"
      }

      // 返回首页(不使用路由，自动引发页面刷新)
      window.location.replace('/')
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userInfoBox {
  position: absolute;
  left: var(--zero-pixel);
  top: var(--zero-pixel);

  width: 100%;
  height: 100%;

  /*background-color: yellow;*/
}
.userBackgroundTop{
  position: absolute;
  left: 0;
  height: 0;

  width: 100%;
  height: 220px;

  background-color: var(--event-back-ground-blue);
}

.userBackground{
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
}

.userAvatar {
  position: absolute;
  top: 100px;
  left: 100px;

  width: 150px;
  height: 150px;

  border-radius: 10px 10px;

  background-color: gray;
}
.userNameBox{
  position: absolute;
  top: 170px;
  left: 270px;

  height: 30px;
  width: calc(100% - 270px);

  color: white;
  font-size: 30px;
  font-style: italic;
}

.userDetailInfoTextBox{
  position: absolute;
  top: 280px;
  left: 100px;

  height: 20px;
  width: 300px;

  font-size: 22px;

  color: white;
}
.userDetailInfoBox {
  position: absolute;
  top: 320px;
  left: 100px;

  width: 400px;
  height: 260px;

  border-radius: 10px 10px;

  background-color: var(--event-back-ground-blue);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.userInfoItemBox {
  width: 95%;

  color: white;

  font-size: 18px;

  margin-left: 20px;
  /*margin-top: 20px;*/
}

.logOutButtonBox{
  position: absolute;
  top: 600px;
  left: 100px;

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
.logOutButtonBox:hover {
  background-color: var(--danger-dark-red-alpha);
  border: 4px solid var(--danger-dark-red);
  color: var(--danger-pink);
}














.userGroupTextBox {
  position: absolute;
  top: 280px;
  left: 600px;

  height: 20px;
  width: 300px;

  font-size: 22px;

  color: white;
}

.hotChannelPageBox {

  --searchBarBoxWidth: 800px;
  --searchBarBoxHeight: 60px;

  --searchBarBoxTop: calc(var(--searchTextBoxTop) + 80px);
  --searchTextBoxTop: 60px;

  --inputOffsite: 20px;
}

.hotChannelPageBox {
  --create-box-little-gray-white: #F5F5F5FF;
  --create-box-little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --add-event-box-blue: #19275DFF;

  --group-input-back-ground-color: #2F3D6AFF;
}


.hotChannelPageBox {
  position: absolute;

  top: 320px;
  left: 600px;


  display: grid;
  justify-content: center;

}
.hotChannelBox {
  width: 980px;
  /*height: 800px;*/

  background-color: #38447a;

  border-radius: 10px 10px;

  display: flex;
  justify-content: center;

}
.hotChannelBox:hover {
  background-color: #2e4b75;
}
.channelsBox {
  width: 95%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;

  /*padding-top: 20px;*/
}
.channel {
  --channel-width: 290px;
  width: var(--channel-width);
  height: calc(var(--channel-width) / 16 * 9 );

  background-color: #6a91cb;

  border-radius: 10px 10px;
  margin: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.hotGroupInfoBox {
  position: relative;
  left: 0;
  top: 5px;

  width: 85%;
  height: 90%;
}

.hotGroupNameBox {
  width: 60%;
  height: 39px;

  color: var(--little-gray-white);

  font-size: 20px;

  display: flex;
  align-items: center;
}

.hotGroupTextBox {
  width: 60%;
  height: 35px;

  color: var(--little-gray-white);


  display: flex;
  align-items: center;
}


.joinGroup {
  position: absolute;
  top: 0;
  right: 0;

  width: 30%;

  display: grid;
  align-items: center;
}

.joinGroupCard {
  width: 80px;
  height: 35px;


  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
  border: 2px solid var(--create-box-little-blue-white);
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
  cursor: pointer;

  display: grid;
  align-items: center;
  justify-items: center;
}

.joinGroupCard:hover {
  color: var(--good-green);
  border: 2px solid var(--good-dark-green);
  background-color: var(--good-dark-green-alpha);
}



</style>