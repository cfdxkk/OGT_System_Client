<template>
  <div class="userInfoBox">
    <div class="userBackground">
      <div class="userBackgroundTop"></div>
      <div class="userBackgroundLine"></div>
    </div>
    <div id="userAvatarBox" class="userAvatar" ></div>
    <div class="userNameBox" @mouseenter="showUserInfoEditIcon" @mouseleave="hiddenUserInfoEditIcon">
      {{this.userInfo.username}}
      <svg id="userInfoEditIcon" v-if="userInfo.userId === this.cookieUserId" style="display: none" @click="openUserInfoEditPopup" viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
    </div>
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





    <div class="userInfoPopup" v-if="userInfoEditVisible" @click.self="closeUserInfoEditPopup">
      <div class="usrInfoPopupBox">

        <div class="userInfoText">用户信息</div>

        <div class="userInfoInputBox">
          <input type="text" id="userEmailInput" class="userInfoInput" placeholder="邮箱">
        </div>
        <div class="userInfoInputBox">
          <input type="text" id="userAddressInput" class="userInfoInput" placeholder="住址">
        </div>
        <div class="userInfoInputBox">
          <input type="text" id="userSexInput" class="userInfoInput" placeholder="性别">
        </div>
        <div class="userInfoTextAreaBox">
<!--          <input type="text" id="userNameSignInInput4" class="userInfoInput" placeholder="个人简介">-->
          <textarea id="userTextInput" style="resize:none;" class="userInfoTextArea" placeholder="个人简介" ></textarea>
        </div>

        <div class="userInfoAvatarBox">
          <div id="addGroupAvatar" class="addGroupAvatarBox" v-if="!showImage" @click="toggleShow">
            <svg class="addUserAvatarIcon" viewBox="64 64 896 896" focusable="false" data-icon="plus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
          </div>

          <div id="groupAvatar" class="userAvatarBox" :style="{display: this.showImage ? 'flex' : 'none'}" @mouseenter="setGroupAvatarBoxMaskDisable" @mouseleave="setGroupAvatarBoxMaskNotDisable" @click="clearAvatar">
            <svg class="addUserAvatarIcon" style="z-index: 5" viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
            <div class="userAvatarBoxMask" v-if="groupAvatarBoxMaskDisable"></div>
          </div>
        </div>

        <div class="" style="width: 300px; height: 65px; display: flex; flex-direction: row; justify-content: center;">
          <div class="editUserInfoButton" @click="editUserInfo">
            修改
          </div>
          <div class="closeButton" @click="closeUserInfoEditPopup">
            取消
          </div>
        </div>

        <crop-upload
            field="file"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="300"
            :height="300"
            :url="avatarUploadUrl"
            :params="params"
            :headers="headers"
            :max-size="maxSize"
            img-format="png"
            :withCredentials="false"
            :need-origin-img="true"
        ></crop-upload>


      </div>
    </div>





  </div>
</template>

<script>
import cropUpload from '../upload/vue-image-crop-upload/upload-3'
export default {
  name: "UserInfo",
  components: {
    cropUpload
  },
  data: () => {
    return {
      userInfo: {},
      cookieUserId: '',

      userInfoEditVisible: false,


      show: false,
      params: {
        userId: '',
        token: ''
      },
      headers: {
        // 'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
        // 'withCredentials': false,
      },
      imgDataUrl: '', // the datebase64 url of created image
      maxSize: 50, // maxSize (MB)

      showImage: false,
      groupAvatarBoxMaskDisable: false,

      imageUrls: null,




    }
  },
  computed: {
    userInfoUrl(){ return "http://" + this.$store.state.serverAddress + "/user/info?uuid="},
    joinGroupUrl(){ return "http://" + this.$store.state.serverAddress + "/group/join"},
    avatarUploadUrl() {return "http://" + this.$store.state.serverAddress + '/user/avatar'},
    editUserUrl() {return "http://" + this.$store.state.serverAddress + '/user/editUserInfo'},
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
          this.$store.commit('updateUserInfo', userinfo.data)
          if (userinfo.data.userAvatar !== '' && userinfo.data.userAvatar !== null && userinfo.data.userAvatar !== undefined ) {
            document.getElementById('userAvatarBox').style.backgroundImage = `url("${userinfo.data.userAvatar}")`
          }
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
    },
    showUserInfoEditIcon() {
      document.getElementById('userInfoEditIcon').style.display = 'inline'
    },
    hiddenUserInfoEditIcon() {
      document.getElementById('userInfoEditIcon').style.display = 'none'
    },
    openUserInfoEditPopup() {
      this.userInfoEditVisible = true
      this.clearAvatar()
    },
    closeUserInfoEditPopup() {
      this.userInfoEditVisible = false
      this.clearAvatar()
    },




    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
      console.log('fieldddddddddddddddddddddddddddddd',field)
    },
    cropUploadSuccess(jsonData, field, imgDataUrl){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ',field);
      console.log('createImgUrl', imgDataUrl)
      if (jsonData !== null) {
        this.showImage = true
        this.imageUrls = jsonData
        document.getElementById('groupAvatar').style.backgroundImage = `url("${imgDataUrl}")`
      }
    },
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },
    setGroupAvatarBoxMaskDisable() {
      this.groupAvatarBoxMaskDisable = true
    },
    setGroupAvatarBoxMaskNotDisable() {
      this.groupAvatarBoxMaskDisable = false
    },
    clearAvatar() {
      this.imageUrls = null
      this.showImage = false
      document.getElementById('groupAvatar').style.backgroundImage = ''
    },







    editUserInfo() {

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


        let userEmailInput = document.getElementById('userEmailInput').value
        let userAddressInput = document.getElementById('userAddressInput').value
        let userSexInput = document.getElementById('userSexInput').value
        let userTextInput = document.getElementById('userTextInput').value



          let userInfo = {
            userInfo: userTextInput,
            userEmail: userEmailInput,
            userSex: userSexInput,
            userLocation: userAddressInput,

            adminUserId: userId,
            adminToken: token

          }

          if (this.imageUrls !== null && this.imageUrls !== undefined) {
            userInfo.userAvatar = this.imageUrls.small
            userInfo.userAvatarOrigin = this.imageUrls.full
          }

          this.Axios.post(this.editUserUrl, userInfo).then(result => {
            if (result.data === true) {
              this.getUserInfo()
            }
            this.closeUserInfoEditPopup()
            this.clearAvatar()
          })




      }






    }
  },
  mounted() {
    this.getUserInfo()


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
      this.params.userId = cookieArray[1]
      this.params.token = cookieArray[2]
    }

  }
}
</script>

<style scoped>
.userInfoBox {
  --create-box-little-gray-white: #F5F5F5FF;
  --create-box-little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --add-event-box-blue: #19275DFF;

  --group-input-back-ground-color: #2F3D6AFF;
}

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
  right: 0;

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

  background-size: cover;
  background-repeat:no-repeat;

  background-color: gray;
}
.userNameBox{
  position: absolute;
  top: 170px;
  left: 270px;

  height: 30px;
  /*width: calc(100% - 270px);*/

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
  /*width: 980px;*/
  /*height: 800px;*/
  max-width: 1000px;

  background-color: #38447a;

  border-radius: 10px 10px;

  display: flex;
  justify-content: center;

}
.hotChannelBox:hover {
  background-color: #2e4b75;
}
.channelsBox {
  /*width: 95%;*/

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
  margin: 20px;

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






.userInfoPopup {
  position: fixed;
  left: var(--zero-pixel);
  top: var(--zero-pixel);

  height: var(--full-screen-height);
  width: var(--full-screen-width);

  background-color: #000000AA;

  z-index: var(--top-layer);

  display: grid;
  align-items: center;
  justify-items: center;
}
.usrInfoPopupBox {
  height: 550px;
  width: 500px;
  border-radius: 10px 10px;

  background-color: var(--event-blue);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}




.userInfoText {
  color: var(--create-box-little-blue-white);
  font-size: 30px;
  font-family: var(--default-font);
}



.userInfoInputBox {
  /*position: relative;*/
  /*top: 20px;*/
  /*left: 40px;*/

  margin-top: 10px;
  width: 450px;
  height: 50px;

  border-radius: 5px 5px;
  background-color: var(--create-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}

.userInfoInput {
  width: 98%;
  height: 88%;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
}
.userInfoInput::-webkit-input-placeholder {
  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
}



.userInfoTextAreaBox {
  /*position: relative;*/
  /*top: 20px;*/
  /*left: 40px;*/

  margin-top: 10px;
  width: 450px;
  height: 100px;

  border-radius: 5px 5px;
  background-color: var(--create-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}


.userInfoTextArea {
  width: 98%;
  height: 91%;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
}
.userInfoTextArea::-webkit-input-placeholder {
  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
}

.userInfoTextArea::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.userInfoTextArea::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}
.userInfoTextArea::-webkit-scrollbar-track {
  background-color: transparent;
}




.userInfoAvatarBox {
  /*position: relative;*/
  /*top: 20px;*/
  /*left: 40px;*/

  margin-top: 5px;
  width: 450px;
  height: 100px;

  border-radius: 5px 5px;
  /*background-color: var(--create-box-little-blue-white);*/

  display: grid;
  align-items: center;
  justify-items: start;
}



.editUserInfoButton {
  /*position: relative;*/
  /*top: 8px;*/
  /*left: 40px;*/

  margin: 10px 20px;
  width: 100px;
  height: 40px;


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

.editUserInfoButton:hover {
  color: var(--create-box-little-gray-white);
  border: 2px solid var(--create-box-little-gray-white);
}



.closeButton {
  /*position: relative;*/
  /*top: 8px;*/
  /*left: 40px;*/

  margin: 10px 20px;
  width: 100px;
  height: 40px;


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

.closeButton:hover {
  background-color: var(--danger-dark-red-alpha);
  color: var(--danger-red);
  border: 2px solid var(--danger-dark-red);
}




</style>

<style>

.addGroupAvatarBox {
  /*position: relative;*/
  /*top: 10px;*/
  /*left: 0px;*/

  width: 80px;
  height: 80px;

  border-radius: 10px 10px;
  border: var(--create-box-little-blue-white) dashed 4px;
  cursor: pointer;

  color: var(--create-box-little-blue-white);

  display: flex;
  justify-content: center;
  align-items: center;
}

.addGroupAvatarBox:hover {
  border: var(--create-box-little-gray-white) dashed 4px;
  color: var(--create-box-little-gray-white);
}

.addUserAvatarIcon {
  height: 30%;
  width: 30%;
}


.userAvatarBox {
  position: absolute;
  /*top: 307px;*/
  /*left: 40px;*/

  width: 90px;
  height: 90px;

  border-radius: 10px 10px;
  cursor: pointer;

  color: var(--alpha);

  display: flex;
  justify-content: center;
  align-items: center;

  background-size: cover;
  background-repeat:no-repeat;
}


.userAvatarBoxMask{
  position: absolute;
  left: 0;
  right: 0;

  width: 100%;
  height: 100%;
  background-color: var(--black);
  opacity: 0.5;
}

.userAvatarBox:hover {
  color: var(--little-gray-white);
}

</style>