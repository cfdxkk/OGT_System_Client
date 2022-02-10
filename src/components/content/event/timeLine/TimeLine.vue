<template>
  <div id="timeLine" class="timeLineBox">

    <div id="timeLineLineBox" class="timeLineLineBox">
      <div id="timeLineLine" class="timeLineLine"></div>
    </div>

    <div id="nowLineStartMask" class="nowLineStartMaksBox">
      <div id="nowLineStartMaskLine" class="nowLineStartMaskLine"></div>
      <div id="nowLineStartRectangle" class="nowLineStartRectangleBox"></div>
    </div>

    <div id="scale" class="scaleBox">
      <div id="timeLineFull" class="timeLineFullBox">
        <div id="scaleLeft" class="scaleLeftBox">
          <div class="scaleLeftItemBox" v-for="hour in 25" :key="hour">
<!--            <span style="color: white">{{hour + 4}}</span>-->
          </div>
        </div>
        <div id="scaleRight" class="scaleRightBox"></div>

        <div id="nowLine" class="nowLineBox">
          <div id="nowLineLine" class="nowLineLine">
            <div id="nowPoint" class="nowPointBox"></div>
          </div>
        </div>
        <div id="eventLine" class="eventLineBox">
        </div>
      </div>
    </div>

    <div id="nowLineEndMask" class="nowLineEndMaksBox">
      <div id="nowLineEndMaskLine" class="nowLineEndMaskLine"></div>
      <div id="nowLineEndTriangle" class="nowLineEndTriangleBox"></div>
    </div>

  </div>
</template>

<script>
export default {


  name: "TimeLine",
  props: {
    events: Array
  },
  methods: {

    refreshNowTIme: function (){

      let nowLine = document.getElementById('nowLineLine')
      // let timeLineHeight = document.getElementById('scale').offsetHeight
      function showNowTileLine () {
        let nowDate = new Date()
        let nowHour = nowDate.getHours()
        let nowMinute = nowDate.getMinutes()
        let nowSecond = nowDate.getSeconds()
        let nowDateInSecond = (nowHour*3600) + (nowMinute*60) + nowSecond
        let nowGameDateInSecond = 0
        if(nowDateInSecond < (5 * 3600)){
          nowGameDateInSecond = (19 * 3600) + nowDateInSecond
        } else {
          nowGameDateInSecond = nowDateInSecond - (5 * 3600)
        }
        // nowLine.style.height = (timeLineHeight / 86400) * nowGameDateInSecond + "px"
        nowLine.style.height = nowGameDateInSecond / 86400 * 100 + "%"
      }
      showNowTileLine()
      setInterval(showNowTileLine,1000)
    },
    showEvent: function (){
      let eventLineBox = document.getElementById('eventLine')
      // let eventLineBoxHeight = eventLineBox.offsetHeight

      if (this.$props.events.length > 0){
        let zeroPointTime = new Date(new Date().toLocaleDateString()).getTime()
        let timeLineTimeStart = zeroPointTime + (5 * 60 * 60 * 1000)
        let timeLineTimeEnd = timeLineTimeStart + (24 * 60 * 60 * 1000)
        // 过滤掉不能在时间轴上显示的事件，即开始时间和结束时间都没有落在当天(5点-29点)上的日期
        let visibleEvent = this.$props.events.filter(event => {
          return (event.startTime > timeLineTimeStart && event.endTime < timeLineTimeEnd)  // 开始时间和结束时间都在时间轴上
              || ((event.startTime > timeLineTimeStart && event.startTime < timeLineTimeEnd) && (event.endTime > timeLineTimeEnd))    // 开始时间在时间轴上，但是结束时间不在
              || ((event.endTime > timeLineTimeStart && event.endTime < timeLineTimeEnd) && (event.startTime < timeLineTimeStart))    // 开始时间不在时间轴上，但是结束时间在
              || (event.startTime < timeLineTimeStart && event.endTime > timeLineTimeEnd)  // 开始时间和结束时间都在时间轴外
        })
        visibleEvent.forEach(event => {
          let eventContinueTime = (event.endTime - event.startTime) / 1000
          let eventHeight = eventContinueTime / 86400 * 100 + "%"
          let eventStartDate = new Date(event.startTime)
          let eventStartHour = eventStartDate.getHours()
          let eventStartMinute = eventStartDate.getMinutes()
          let eventStartSecond = eventStartDate.getSeconds()
          let eventStartDateInSecond = (eventStartHour*3600) + (eventStartMinute*60) + eventStartSecond
          let eventStartGameDateInSecond = 0
          if(eventStartDateInSecond < (5 * 3600)){
            eventStartGameDateInSecond = (19 * 3600) + eventStartDateInSecond
          } else {
            eventStartGameDateInSecond = eventStartDateInSecond - (5 * 3600)
          }
          let eventTop = eventStartGameDateInSecond / 86400 * 100 + "%"

          let newEvent
          if(event.startTime > timeLineTimeStart && event.endTime < timeLineTimeEnd) {  // 开始时间和结束时间都在时间轴上
            newEvent = `<div style="position: absolute; top: ${eventTop}; width: var(--time-line-line-width); height: ${eventHeight}; background-color: ${event.eventColor};"></div>`
          } else if((event.startTime > timeLineTimeStart && event.startTime < timeLineTimeEnd) && (event.endTime > timeLineTimeEnd)) { // 开始时间在时间轴上，但是结束时间不在
            newEvent = `<div style="position: absolute; top: ${eventTop}; width: var(--time-line-line-width); height: 100%; background-color: ${event.eventColor};"></div>`
          } else if((event.endTime > timeLineTimeStart && event.endTime < timeLineTimeEnd) && (event.startTime < timeLineTimeStart)) { // 开始时间不在时间轴上，但是结束时间在
            eventContinueTime = (event.endTime - timeLineTimeStart) / 1000
            eventHeight = eventContinueTime / 86400 * 100 + "%"
            newEvent = `<div style="position: absolute; top: var(--zero-pixel); width: var(--time-line-line-width); height: ${eventHeight}; background-color: ${event.eventColor};"></div>`
          } else if(event.startTime < timeLineTimeStart && event.endTime > timeLineTimeEnd) { // 开始时间和结束时间都在时间轴外
            newEvent = `<div style="position: absolute; top: var(--zero-pixel); width: var(--time-line-line-width); height: 100%; background-color: ${event.eventColor};"></div>`
          }


          eventLineBox.innerHTML += newEvent
        })
      }
    }
  },
  mounted() {
    this.refreshNowTIme()
    this.showEvent()
  },
  unmounted() {
  }

}
</script>

<style scoped>
.timeLineBox {
  --time-line-width: 12%;
  --time-line-line-width: 7%;

  --over-date-gray: #949494FF;
  --future-date-orange: orange;
  --scale-white: white;
}

.timeLineBox {
  position: relative;
  top: var(--zero-pixel);
  left: var(--zero-pixel);

  width: var(--time-line-width);
  height: 100%;
  /*background-color: #BABABAFF;*/
  /*background-color: #3f0054;*/
  /*background-color: white;*/
  background-color: var(--event-back-ground-blue);
}

.timeLineLineBox {
  position: relative;
  top: var(--zero-pixel);
  left: var(--zero-pixel);

  width: 100%;
  height: 100%;
  /*background-color: white;*/

  display: flex;
  justify-content: center;
}
.timeLineLine {
  width: var(--time-line-line-width);
  height: 100%;

  background-color: var(--future-date-orange);
}

.nowLineStartMaksBox {
  position: absolute;
  top: var(--zero-pixel);
  left: var(--zero-pixel);

  width: 100%;
  height: 5%;
  /*background-color: white;*/

  display: flex;
  justify-content: center;
}
.nowLineStartMaskLine {
  width: var(--time-line-line-width);
  height: 100%;

  background-color: var(--over-date-gray);
}
.nowLineStartRectangleBox {
  position: absolute;
  top: var(--zero-pixel);

  width: 40%;
  height: 3px;

  background-color: var(--over-date-gray);
}

.nowLineEndMaksBox {
  position: absolute;
  bottom: var(--zero-pixel);
  left: var(--zero-pixel);

  width: 100%;
  height: 5%;
  /*background-color: white;*/

  display: flex;
  justify-content: center;
}
.nowLineEndMaskLine {
  position: absolute;
  bottom: var(--zero-pixel);

  width: 35%;
  height: 35%;

  background-color: var(--event-back-ground-blue);
}
.nowLineEndTriangleBox {
  position: absolute;
  bottom: var(--zero-pixel);

  width: 35%;
  height: 35%;

  clip-path: polygon(0 -1px, 100% -1px, 50% 100%);

  background-color: var(--future-date-orange);
}

.scaleBox {
  position: absolute;
  top: 1.25%;

  width: 100%;
  height: 96%;

  /*background-color: #FF00006B;*/

  overflow-y: hidden;
  overflow-x: hidden;
  /*pointer-events: none;*/

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.scaleBox::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.timeLineFullBox {
  position: relative;
  /*top: -30%;*/

  height: 100%;
  width: 100%;
}
.scaleRightBox {
  position: absolute;
  right: var(--zero-pixel);
  top: var(--zero-pixel);

  width: 50%;
  height: 100%;
  /*background-color: #0095FF47;*/

  display: grid;
  align-content: space-between;
}
.scaleLeftBox {
  position: absolute;
  left: var(--zero-pixel);
  top: var(--zero-pixel);

  width: 50%;
  height: 100%;
  /*background-color: #FFA50047;*/

  display: grid;
  align-content: space-between;
  justify-items: end;
}

.scaleRightItemBox {

  width: 100%;
  height: 5px;

  /*background-color: #0c5701;*/
}
.scaleLeftItemBox {

  width: 40%;
  height: 2px;

  border-radius: 1px 1px;

  /*background-color: #b40000;*/
  background-color: var(--scale-white);
}
.nowLineBox {
  position: absolute;
  right: var(--zero-pixel);
  top: var(--zero-pixel);

  width: 100%;
  height: 100%;
  /*background-color: orange;*/

  display: flex;
  justify-content: center;
}

.nowLineLine{
  position: relative;
  width: var(--time-line-line-width);
  /*height: 30%;*/

  background-color: var(--over-date-gray);

  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
.nowPointBox {
  position: absolute;
  bottom: -5px;


  width: 10px;
  height: 10px;

  border-radius: 2px 2px;

  -webkit-animation:myRotate 5s linear infinite;
  animation:myRotate 5s linear infinite;

  z-index: var(--top-layer);

  background-color: greenyellow;
}
/* anime keyframe */
@-webkit-keyframes myRotate{
  0%{ -webkit-transform: rotate(0deg);}
  50%{ -webkit-transform: rotate(180deg);}
  100%{ -webkit-transform: rotate(360deg);}
}
@keyframes myRotate{
  0%{ -webkit-transform: rotate(0deg);}
  50%{ -webkit-transform: rotate(180deg);}
  100%{ -webkit-transform: rotate(360deg);}
}

.eventLineBox{
  position: absolute;
  right: var(--zero-pixel);
  top: var(--zero-pixel);

  width: 100%;
  height: 100%;
  /*background-color: orange;*/

  display: flex;
  justify-content: center;
}
.eventLineLine {

}

</style>