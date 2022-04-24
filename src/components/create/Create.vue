<template>
  <div id="createPage" class="createPageBox">
    <div class="createGroupName">
      <input type="text" id="createGroupNameInput" class="createGroupNameInput" placeholder="在此输入群名">
    </div>

    <textarea id="createGroupIntroductionInput" class="createGroupTextInput" placeholder="请在此输入群简介" ></textarea>

    <div id="addGroupAvatar" class="addGroupAvatarBox" v-if="!showImage" @click="toggleShow">
      <svg class="addGroupAvatarIcon" viewBox="64 64 896 896" focusable="false" data-icon="plus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
    </div>

    <div id="createGroupButton" class="createGroupButton" @click="createGroup">
      创建群聊
    </div>

    <div id="groupAvatar" class="groupAvatarBox" :style="{display: this.showImage ? 'flex' : 'none'}" @mouseenter="setGroupAvatarBoxMaskDisable" @mouseleave="setGroupAvatarBoxMaskNotDisable" @click="clearAvatar">
      <svg class="addGroupAvatarIcon" style="z-index: 5" viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
      <div class="groupAvatarBoxMask" v-if="groupAvatarBoxMaskDisable"></div>
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

</template>

<script>
import cropUpload from '../upload/vue-image-crop-upload/upload-3'
export default {
  name: "Create",
  data: () => {
    return {

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
  components: {
    cropUpload
  },
  computed: {
    createGroupUrl() {return "http://" + this.$store.state.serverAddress + "/group/create"},
    avatarUploadUrl() {return "http://" + this.$store.state.serverAddress + '/group/avatar'},
  },
  methods: {
    createGroup: function () {
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

        let createGroupNameInput = document.getElementById('createGroupNameInput')
        let groupName = createGroupNameInput.value
        let createGroupIntroductionInput = document.getElementById('createGroupIntroductionInput')
        let createGroupIntroduction = createGroupIntroductionInput.value


        if (!(groupName === '' || createGroupIntroduction === '')){
          let groupInfo = {
            groupName: groupName,
            groupIntroduction: createGroupIntroduction,
            groupCreator: userId,
            token
          }

          if (this.imageUrls !== null && this.imageUrls !== undefined) {
            groupInfo.groupAvatar = this.imageUrls.small
            groupInfo.groupAvatarOrigin = this.imageUrls.full
          }

          console.log('groupName',groupName)
          console.log('groupText',createGroupIntroduction)
          this.Axios.post(this.createGroupUrl, groupInfo).then(groups => {

            if (groups.data.length !== 0 || groups.data !== '' || groups.data !== null) {
              this.$store.commit('updateGroupList', groups.data.groupList)
              this.$router.push(`/chat/${groups.data.groupId}`)
              // console.log(groups.data)
            }
          })
        }

        console.log('create')
      }
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
    }
  },
  mounted() {

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
.createPageBox {
  --create-box-little-gray-white: #F5F5F5FF;
  --create-box-little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --add-event-box-blue: #19275DFF;

  --group-input-back-ground-color: #2F3D6AFF;
}

.createPageBox {
  position: absolute;
  top: var(--zero-pixel);
  left: var(--zero-pixel);

  width: 100%;
  height: 100%;
}






.createGroupName {
  position: absolute;
  top: 40px;
  left: 40px;

  margin-top: 10px;
  width: 300px;
  height: 50px;

  border-radius: 5px 5px;
  background-color: var(--create-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}
.createGroupNameInput {
  width: 97.5%;
  height: 88%;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
}
.createGroupNameInput::-webkit-input-placeholder {
  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
}






.createGroupTextInput {
  position: absolute;
  top: 100px;
  left: 40px;

  margin-top: 10px;
  width: 292px;
  height: 180px;

  resize:none;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--create-box-little-gray-white);
  border: 2px solid var(--create-box-little-blue-white);
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--group-input-back-ground-color);
}
.createGroupTextInput::-webkit-input-placeholder {
  font-size: 18px;
  color: var(--create-box-little-blue-white);
}

/* 修改滚动条样式 */
.createGroupTextInput::-webkit-scrollbar {
  width: 6px;
  background-color: var(--event-back-ground-blue);
}
.createGroupTextInput::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.createGroupTextInput::-webkit-scrollbar-thumb:hover {
  background-color: #FFFFFF5A;
}
.createGroupTextInput::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.createGroupTextInput::-webkit-scrollbar-track:hover {
  background-color: #FFFFFF12;
}





.addGroupAvatarBox {
  position: absolute;
  top: 307px;
  left: 40px;

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

.addGroupAvatarIcon {
  height: 50%;
  width: 50%;
}


.groupAvatarBox {
  position: absolute;
  top: 307px;
  left: 40px;

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


.groupAvatarBoxMask{
  position: absolute;
  left: 0;
  right: 0;

  width: 100%;
  height: 100%;
  background-color: var(--black);
  opacity: 0.5;
}

.groupAvatarBox:hover {
  color: var(--little-gray-white);
}





.createGroupButton {
  position: absolute;
  top: 395px;
  left: 40px;

  margin-top: 10px;
  width: 296px;
  height: 50px;


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

.createGroupButton:hover {
  color: var(--create-box-little-gray-white);
  border: 2px solid var(--create-box-little-gray-white);
}




</style>