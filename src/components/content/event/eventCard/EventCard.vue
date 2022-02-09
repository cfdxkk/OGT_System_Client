<template>
  <div class="eventCard">
    <div class="userBox">
      <div class="userAvatarBox">
        <div class="userAvatar">
          <img class="userAvatarImg" :src="this.$props.event.userAvatar" :alt="this.$props.event.userName">
        </div>
      </div>

      <div class="userInfoBox">
        <div class="userInfoMiddleBox">
          <div class="userType">
            <div class="userTypeTag" v-if="this.$props.event.userType !== 0">{{this.$props.event.userType === 1 ? '管理员' : '群主'}}</div>
          </div>
          <div class="userName">{{this.$props.event.userName}}</div>
        </div>
      </div>

      <div class="eventInfoBox">
        <div class="eventColorBox" :style="{backgroundColor: this.$props.event.startTime > new Date().getTime() ? this.$props.event.eventColor : 'var(--over-date-gray)'}"></div>
        <div class="clockIcon">
          <svg viewBox="64 64 896 896" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
        </div>
      </div>

      <div class="userBoxBottomBorder"></div>
    </div>
    <div class="textBox">
      <div class="eventTitle" v-if="!!this.$props.event.event.eventTitle" :title="this.$props.event.event.eventTitle">{{this.$props.event.event.eventTitle}}</div>
      <div class="eventText" v-if="!!this.$props.event.event.eventText">{{this.$props.event.event.eventText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: Object
  },
  methods: {

  },
  mounted() {
    console.log("event",this.$props.event);
  }
}
</script>

<style scoped>
.eventCard {
  --event-card-width: 95%;
  --event-card-margin-top: 20px;
  --event-card-border-radius: 20px 20px;

  --user-box-top: 10px;
  --user-box-height: 73px;

  --user-acatar-left: 20px;
  --user-avatar-width: 50px;

  --user-info-box-left: 80px;
  --user-info-box-width: 250px;
  --user-info-box-height: 45px;

  --event-info-box-left: 88%;
  --event-info-box-width: 25px;
  --event-info-box-height: 80%;

  --event-info-color-box-width: 20px;
  --event-info-color-box-height: 20px;

  --event-clock-icon-size: 20px;
}

.eventCard {
  --little-gray-white: #F5F5F5FF;
  --little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --over-date-gray: #949494FF;
}

.eventCard {
  width: var(--event-card-width);
  /*height: 340px;*/
  margin-top: var(--event-card-margin-top);
  background-color: var(--event-blue);
  border-radius: var(--event-card-border-radius)
}

.userBox {

  position: relative;
  top: var(--user-box-top);
  left: 0;

  width: 100%;
  height: var(--user-box-height);

  /*background-color: greenyellow;*/

}
.userAvatarBox {
  position: relative;
  left: var(--user-acatar-left);

  width: var(--user-avatar-width);
  height: 100%;

  /*background-color: red;*/

  display: grid;
  align-items: center;
}

.userAvatar {
  width: var(--user-avatar-width);
  height: var(--user-avatar-width);

  border-radius: 100%;
  background-color: gray;

  overflow: hidden;
}

.userAvatarImg {
  width: 100%;
  height: 100%;
}

.userInfoBox {
  position: absolute;
  left: var(--user-info-box-left);
  top: 0;

  width: var(--user-info-box-width);
  height: 100%;

  /*background-color: orange;*/

  display: flex;
  flex-direction: column;
  justify-content: center;

}
.userInfoMiddleBox {
  width: 100%;
  height: var(--user-info-box-height);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.userType {

  height: 18px;
  width: auto;

  margin-bottom: 3px;

  line-height: 100%;

  /*background-color: #e600ff;*/

  display: grid;
  justify-content: start;
}
.userTypeTag {
  height: 100%;
  border-radius: 3px 3px;
  padding: 0px 4px 0px 4px;
  background-color: #14BD76FF;
  font-weight: bold;
  font-size: 15px;
  color: var(--little-gray-white);
}
.userName {
  font-size: 21px;
  line-height: 100%;
  /*font-weight: bold;*/
  color: var(--little-blue-white);
}

.eventInfoBox {
  position: absolute;
  top: 5px;
  left: var(--event-info-box-left);

  width: var(--event-info-box-width);
  height: var(--event-info-box-height);

  /*background-color: orange;*/

  display: grid;
  justify-content: center;
  align-content: space-between;
}
.eventColorBox {
  width: var(--event-info-color-box-width);
  height: var(--event-info-color-box-height);

  /*background-color: greenyellow;*/

  display: grid;
  align-content: space-between;
  justify-content: center;
}
.clockIcon {
  width: var(--event-clock-icon-size);
  height: var(--event-clock-icon-size);

  font-size: var(--event-clock-icon-size);
  color: var(--little-blue-white);

  display: grid;
  justify-content: center;
}

.userBoxBottomBorder {
  position: absolute;
  bottom: var(--zero-pixel);
  left: 5%;

  width: 90%;
  height: 2px;

  background-color: var(--user-box-bottom-line-blue);
}


.textBox {
  position: relative;
  left: 20px;
  top: 10px;

  width: 90%;

  margin-bottom: 25px;

}
.eventTitle {

  width: 300px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  margin-top: 1px;
  font-size: 24px;
  color: var(--little-blue-white);
  font-weight: bold;
}
.eventText {

  /*width: 300px;*/

  margin-top: 4px;
  color: var(--little-blue-white);
}


</style>