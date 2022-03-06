<template>
  <div id="hotChannelPage" class="hotChannelPageBox">
    <div id="hotChannel" class="hotChannelBox">
      <div class="channelsBox">
        <div class="channel" v-for="hotGroup in hotGroupList" :key="hotGroup.groupId">
          <div class="hotGroupInfoBox">
            <div class="hotGroupNameBox">{{hotGroup.groupName}}</div>
            <div class="joinGroup"><div class="joinGroupCard" @click="joinGroup(hotGroup.groupId)">+加入</div></div>
            <div class="hotGroupTextBox">{{hotGroup.groupIntroduction}}</div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "HotChannel",
  data: () => {
    return {
      hotGroupList: []
    }
  },
  computed: {
    getHotGroupListUrl(){ return "http://" + this.$store.state.serverAddress + "/group/hotGroupList"},
    joinGroupUrl(){ return "http://" + this.$store.state.serverAddress + "/group/join"},
  },
  methods: {
    getHotGroupList() {
      this.Axios.get(this.getHotGroupListUrl).then(hotGroupList => {
        this.hotGroupList = hotGroupList.data
      })
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
    }
  },
  mounted() {
    this.getHotGroupList()
  }
}
</script>

<style scoped>

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
  position: relative;

  top: 300px;


  display: grid;
  justify-content: center;

}
.hotChannelBox {
  width: 1000px;
  /*height: 800px;*/

  background-color: #38447a;

  border-radius: 40px 40px;

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

  border-radius: 20px 20px;
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