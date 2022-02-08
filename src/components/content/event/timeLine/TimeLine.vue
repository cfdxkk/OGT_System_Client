<template>
  <div id="timeLine" class="timeLineBox">
    <div id="timeLineLineBox" class="timeLineLineBox">
      <div id="timeLineLine" class="timeLineLine"></div>
    </div>
    <div id="nowLineMask" class="nowLineMaksBox">
      <div id="nowLineMaskLine" class="nowLineMaskLine"></div>
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
          <div id="nowLineLine" class="nowLineLine"></div>
        </div>
        <div id="eventLine" class="eventLineBox">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {


  name: "TimeLine",
  data: () => {
    return {
      events: [
        {
          startTime: 1644330199000,
          endTime: 1644333799000,
          event: {
            eventId: 1,
            eventTitle: 'xeno',
            eventText: 'go fight with xeno'
          }
        },
        {
          startTime: 1644337399000,
          endTime: 1644348199000,
          event: {
            eventId: 1,
            eventTitle: 'jump town',
            eventText: 'go to the jump town'
          }
        },
      ]

    }
  },
  methods: {

    refreshNowTIme: function (){

      let nowLine = document.getElementById('nowLineLine')
      // let timeLineHeight = document.getElementById('scale').offsetHeight
      setInterval(() => {
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
      },1000)
    },
    showEvent: function (){
      let eventLineBox = document.getElementById('eventLine')
      // let eventLineBoxHeight = eventLineBox.offsetHeight

      if (this.events.length > 0){
        this.events.forEach(event => {
          let eventContinueTime = (event.endTime - event.startTime) / 1000
          console.log('eventTime',eventContinueTime)
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

          let newEvent = `<div style="position: absolute; top: ${eventTop}; width: var(--time-line-line-width); height: ${eventHeight}; background-color: #ff00ae;"></div>`
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

  background-color: orange;
}

.nowLineMaksBox {
  position: absolute;
  top: var(--zero-pixel);
  left: var(--zero-pixel);

  width: 100%;
  height: 5%;
  /*background-color: white;*/

  display: flex;
  justify-content: center;
}
.nowLineMaskLine {
  width: var(--time-line-line-width);
  height: 100%;

  background-color: #949494;
}


.scaleBox {
  position: absolute;
  top: 2%;

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
  background-color: white;
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
  width: var(--time-line-line-width);
  /*height: 30%;*/

  background-color: #949494;
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