<template>
  <div id="createPage" class="createPageBox">
    <div class="createGroupName">
      <input type="text" id="createGroupNameInput" class="createGroupNameInput" placeholder="在此输入群名">
    </div>

    <textarea id="createGroupIntroductionInput" class="createGroupTextInput" placeholder="请在此输入群简介" ></textarea>

    <div id="createGroupButton" class="createGroupButton" @click="createGroup">
      创建群聊
    </div>

  </div>

</template>

<script>
export default {
  name: "Create",
  data: () => {
    return {
      // hostAddress: "150.158.98.146:8888",
      hostAddress: "localhost:8888",



    }
  },
  components: {
  },
  computed: {
    createGroupUrl() {return "http://" + this.$store.state.serverAddress + "/group/create"}
  },
  methods: {
    createGroup: function () {
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let cookieArray = (cookie.split('=')[1]).split('-');
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





.createGroupButton {
  position: absolute;
  top: 298px;
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