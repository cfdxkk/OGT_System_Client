<template>
  <div id="searchBarAndText" class="searchBarAndTextBox">
    <div id="searchText" class="searchTextBox">
      <div id="searchTextText" class="searchTextTextBox">
        &nbsp;寻找游戏或聊天！
      </div>
    </div>
    <div id="searchPart" class="searchPartBox">
      <div id="searchBar" class="searchBarBox">
        <input type="text" id="searchInputBox" class="searchInputBox" @focus="inputBoxOn" @blur="inputBoxOut" @keyup.enter="searchGroupByName">
      </div>
    </div>

    <div class="resultGroupPart">
      <div class="resultGroupBox">
        <div class="resultGroupCard" v-for="group in this.groups" :key="group">
          <div class="groupImage"><div class="groupImageCard">{{group.groupImage}}</div></div>
          <div class="groupText">
            <div class="groupNameCard">{{group.groupName}}</div>
            <div class="groupIntroduceCard">{{group.groupIntroduction}}</div>
          </div>
          <div class="joinGroup"><div class="joinGroupCard" @click="joinGroup(group.groupId)">+加入</div></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => {
    return {
      // groups: [
      //   {
      //     groupName: 'aaaa',
      //     groupIntroduction: 'bbbbbbbbbbbbbbbbbbbb',
      //     groupImage: 'cccc.jpg'
      //   },
      //   {
      //     groupName: 'dddd',
      //     groupIntroduction: 'eeeeeeeeeeeeeeeeeeeeeee',
      //     groupImage: 'ffff.jpg'
      //   }
      // ],
      groups: [],



      // hostAddress: "150.158.98.146:8888",
      hostAddress: "localhost:8888",
    }
  },
  computed: {
    registerURL(){ return "http://" + this.$store.state.serverAddress + "/user/register"},
    loginURL(){ return "http://" + this.$store.state.serverAddress + "/user/login"},
    selectURL(){ return "http://" + this.$store.state.serverAddress + "/user/info"},

    wsURL(){ return "ws://" + this.$store.state.wsServerAddress + "/websocket/"},
    sendMessageUrl(){ return "http://" + this.$store.state.serverAddress + "/message/messagefilterandcluster"},

    offlineMessageUrl(){ return "http://" + this.$store.state.serverAddress + "/messagepull/getofflinemessage"},

    getGroupsByNameUrl(){ return "http://" + this.$store.state.serverAddress + "/group/search?groupName="},
    joinGroupUrl(){ return "http://" + this.$store.state.serverAddress + "/group/join"}
  },
  methods: {
    inputBoxOn: () => {
      let inputBox = document.getElementById('searchBar')
      if (inputBox !== null) {
        inputBox.style.boxShadow = 'inset 20px 20px 60px #27426b,inset -20px -20px 60px #355a91'
      }
    },
    inputBoxOut: () => {
      let inputBox = document.getElementById('searchBar')
      if (inputBox !== null) {
        inputBox.style.boxShadow = ''
      }
    },
    searchGroupByName: function (){
      // console.log('search!')
      let groupName = document.getElementById('searchInputBox').value
      this.Axios.get(this.getGroupsByNameUrl + groupName).then(groups => {
        console.log('groups',groups.data)
        this.groups = groups.data
      })
    },
    joinGroup: function (groupId){

      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和tokey
        let cookieArray = (cookie.split('=')[1]).split('-');
        let UUID = cookieArray[1]

        let groupRelationship = {
          groupId,
          userId: UUID
        }
        this.Axios.post(this.joinGroupUrl, groupRelationship).then(groups => {
          if (groups.data.length !== 0 || groups.data !== '' || groups.data !== null) {
            this.$store.commit('updateGroupList', groups.data.groupList)
            this.$router.push(`/chat/${groupId}`)
            // console.log(groups.data)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.searchBarAndTextBox {

  --searchBarBoxWidth: 800px;
  --searchBarBoxHeight: 60px;

  --searchBarBoxTop: calc(var(--searchTextBoxTop) + 80px);
  --searchTextBoxTop: 60px;

  --inputOffsite: 20px;
}

.searchBarAndTextBox {
  --create-box-little-gray-white: #F5F5F5FF;
  --create-box-little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --add-event-box-blue: #19275DFF;

  --group-input-back-ground-color: #2F3D6AFF;
}

.searchPartBox {
  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  justify-content: center
}
.searchBarBox {
  width: var(--searchBarBoxWidth);
  height: var(--searchBarBoxHeight);

  position: relative;
  top: var(--searchBarBoxTop);

  display: grid;
  align-items: center;

  border-radius: var(--searchBarBoxHeight) var(--searchBarBoxHeight);

  background-color: var(--search-bar);
}
.searchTextBox {
  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  justify-content: center
}
.searchTextTextBox {
  position: relative;
  height: calc(100% - var(--searchTextBoxTop));

  top: var(--searchTextBoxTop);

  font-size: 40px;
  font-family: “Arial”,”Microsoft YaHei”,”黑体”,”宋体”,sans-serif;
  letter-spacing: 4px;

  color: var(--white);
}
.searchInputBox {
  position: absolute;
  left: var(--inputOffsite);

  width: calc(var(--searchBarBoxWidth) - var(--inputOffsite));
  height: calc(var(--searchBarBoxHeight) - 2px);

  border: 0;
  outline:none;

  border-radius: var(--searchBarBoxHeight) var(--searchBarBoxHeight);


  font-size: 25px;

  color: var(--white);

  /*color: transparent;*/
  /*text-shadow: 0 0 0 #000;*/

  /*background-color: pink;*/
  background-color: #00000000;


  z-index: calc(var(--top-layer) - 4);
}


.resultGroupPart {
  position: relative;
  top: 200px;

  width: 100%;

  display: grid;
  justify-items: center;
}


.resultGroupBox {

  /*height: 200px;*/
  width: var(--searchBarBoxWidth);
  /*background-color: orange;*/

  display: grid;
  justify-items: center;
}

.resultGroupCard {

  position: relative;

  width: 100%;
  height: 150px;

  margin-top: 20px;

  background-color: var(--search-bar);

  /*border: 4px solid var(--create-box-little-blue-white);*/
  border-radius: 20px 20px;
}

.groupImage {
  position: absolute;
  top: 0;
  left: 2%;

  width: 30%;
  height: 100%;

  display: grid;
  align-items: center;
}

.groupImageCard {
  width: 100%;
  height: 80%;
  background-color: gray;
  border-radius: 10px 10px;

  color: white;

  display: grid;
  align-items: center;
  justify-items: center;
}



.groupText {
  position: absolute;
  top: 0;
  left: 34%;

  width: 45%;
  height: 100%;


}

.groupNameCard {
  position: relative;
  top: 25px;

  font-size: 30px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
}

.groupIntroduceCard {
  position: relative;
  top: 35px;

  font-size: 20px;
  font-family: var(--default-font);
  color: var(--create-box-little-blue-white);
}




.joinGroup {
  position: absolute;
  top: 0;
  left: 81%;

  width: 30%;
  height: 100%;

  display: grid;
  align-items: center;
}

.joinGroupCard {
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

.joinGroupCard:hover {
  color: var(--good-green);
  border: 2px solid var(--good-dark-green);
  background-color: var(--good-dark-green-alpha);
}





</style>