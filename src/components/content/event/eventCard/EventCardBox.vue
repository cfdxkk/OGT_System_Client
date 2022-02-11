<template>
  <div id="eventCard" class="eventCardBox">
    <div id="addEvent" class="addEventBox">
      <div id="addEventForm" class="addEventFormBox">

        <div id="startDateTimeText" class="dateTimeText" style="display: none">起始时间</div>
        <div id="startDatePickerBox" class="DatePickerBox" style="display: none">
          <input id="startDatePicker" class="DatePicker" type="date">
        </div>
        <div id="startTimePickerBox" class="TimePickerBox" style="display: none">
          <input id="startTimePicker" class="TimePicker" type="time">
        </div>

        <div id="endDateTimeText" class="dateTimeText" style="display: none">结束时间</div>
        <div id="endDatePickerBox" class="DatePickerBox" style="display: none">
          <input id="endDatePicker" class="DatePicker" type="date">
        </div>
        <div id="endTimePickerBox" class="TimePickerBox" style="display: none">
          <input id="endTimePicker" class="TimePicker" type="time">
        </div>

        <div id="eventTitleInputBox" class="eventTitleInputBox" style="display: none">
          <input id="eventTitleInput" class="eventTitleInput" type="text" placeholder="请在此输入标题">
        </div>

        <textarea id="eventTextInput" class="eventTextInput" placeholder="请在此输入正文" style="display: none"></textarea>

        <div id="postEventButton" class="postEventButton" style="display: none" @click="postEvent">
          添加至时间轴
        </div>



      </div>
      <div class="iconBox" @click="openAndCloseAddForm">
        <svg class="addEventIcon" v-if="!this.addBoxOpen" viewBox="64 64 896 896" focusable="false" data-icon="plus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
        <svg class="addEventIcon" v-if="this.addBoxOpen" viewBox="64 64 896 896" focusable="false" data-icon="up-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
      </div>
    </div>
    <event-card v-for="event in this.$props.events" :key="event.eventId" :event="event"></event-card>
  </div>
</template>

<script>
import eventCard from "@/components/content/event/eventCard/EventCard";
export default {
  name: "EventCardBox",
  data: () => {
    return {
      addBoxOpen: false,
    }
  },
  props: {
    events: Array
  },
  components: {
    eventCard
  },
  methods: {
    openAndCloseAddForm: function (){
      let addEventBox = document.getElementById('addEvent')
      let addFrom = document.getElementById('addEventForm')

      let startDateTimeText =document.getElementById('startDateTimeText')
      let startDatePickerBox = document.getElementById('startDatePickerBox')
      let startTimePickerBox = document.getElementById('startTimePickerBox')

      let endDateTimeText = document.getElementById('endDateTimeText')
      let endDatePickerBox = document.getElementById('endDatePickerBox')
      let endTimePickerBox = document.getElementById('endTimePickerBox')

      let eventTitleInputBox = document.getElementById('eventTitleInputBox')

      let eventTextInputBox = document.getElementById('eventTextInput')

      let postEventButton = document.getElementById('postEventButton')

      if (this.addBoxOpen === true){

        // 关闭
        addEventBox.animate(
            [
              {height: 'var(--add-card-max-height)'},
              {height: '10vh'},
            ], {
              duration: 600,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        addFrom.animate(
            [
              {height: 'calc(var(--add-card-max-height) - 80px)'},
              {height: 'var(--zero-pixel)'},
            ], {
              duration: 600,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )


        setTimeout(() => {
          startDateTimeText.style.display = 'none'
        },500)
        startDateTimeText.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 400,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )

        setTimeout(() => {
          startDatePickerBox.style.display = 'none'
        },500)
        startDatePickerBox.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 400,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        setTimeout(() => {
          startTimePickerBox.style.display = 'none'
        },500)
        startTimePickerBox.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 400,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )




        setTimeout(() => {
          endDateTimeText.style.display = 'none'
        },400)
        endDateTimeText.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 300,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )


        setTimeout(() => {
          endDatePickerBox.style.display = 'none'
        },400)
        endDatePickerBox.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 300,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        setTimeout(() => {
          endTimePickerBox.style.display = 'none'
        },400)
        endTimePickerBox.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 300,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )







        setTimeout(() => {
          eventTitleInputBox.style.display = 'none'
        },300)
        eventTitleInputBox.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 200,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )





        setTimeout(() => {
          eventTextInputBox.style.display = 'none'
        },200)
        eventTextInputBox.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              delay: 100,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )




        setTimeout(() => {
          postEventButton.style.display = 'none'
        },100)
        postEventButton.animate(
            [
              {opacity: '1'},
              {opacity: '0'},
            ], {
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )




        this.addBoxOpen = false
      } else {

        // 打开
        addEventBox.animate(
            [
              {height: '10vh'},
              {height: 'var(--add-card-max-height)'}
            ], {
              duration: 400,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        addFrom.animate(
            [
              {height: 'var(--zero-pixel)'},
              {height: 'calc(var(--add-card-max-height) - 80px)'}
            ], {
              duration: 400,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )




        startDateTimeText.style.display = 'grid'
        startDateTimeText.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        startDatePickerBox.style.display = 'grid'
        startDatePickerBox.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        startTimePickerBox.style.display = 'grid'
        startTimePickerBox.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )




        setTimeout(() => {
          endDateTimeText.style.display = 'grid'
        },100)
        endDateTimeText.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              delay: 100,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        setTimeout(() => {
          endDatePickerBox.style.display = 'grid'
        },100)
        endDatePickerBox.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              delay: 100,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )
        setTimeout(() => {
          endTimePickerBox.style.display = 'grid'
        },100)
        endTimePickerBox.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              delay: 100,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )







        setTimeout(() => {
          eventTitleInputBox.style.display = 'grid'
        },200)
        eventTitleInputBox.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              delay: 200,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )





        setTimeout(() => {
          eventTextInputBox.style.display = 'block'
        },300)
        eventTextInputBox.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              delay: 300,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )




        setTimeout(() => {
          postEventButton.style.display = 'grid'
        },400)
        postEventButton.animate(
            [
              {opacity: '0'},
              {opacity: '1'},
            ], {
              delay: 400,
              duration: 100,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out"
            }
        )






        this.addBoxOpen = true
      }
    },
    postEvent: function (){
      console.log('eventPosted')
      this.openAndCloseAddForm()
    }
  }
}
</script>

<style scoped>

.eventCardBox {
  --add-event-box-top: 10px;
  --add-event-box-widht: 95%;
  --add-event-box-height: 80px;
  --add-event-box-border-radius: 20px 20px;
  --add-event-icon-size: 35px;

  --add-card-max-height: 580px;
}

.eventCardBox {
  --add-event-box-little-gray-white: #F5F5F5FF;
  --add-event-box-little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --add-event-box-blue: #19275DFF;

  --input-back-ground-color: #2F3D6AFF;
}
.eventCardBox {
  position: absolute;
  top: 0px;
  right: 0px;

  width: 93.5%;
  height: 100%;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 修改滚动条样式 */
.eventCardBox::-webkit-scrollbar {
  width: 6px;
  background-color: var(--event-back-ground-blue);
}
.eventCardBox::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.eventCardBox::-webkit-scrollbar-thumb:hover {
  background-color: #FFFFFF5A;
}
.eventCardBox::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.eventCardBox::-webkit-scrollbar-track:hover {
  background-color: #FFFFFF12;
}

.addEventBox {
  position: sticky;
  top: var(--zero-pixel);
  right: var(--zero-pixel);

  width: var(--add-event-box-widht);
  height: var(--add-event-box-height);
  background-color: var(--event-blue);
  border-bottom-right-radius: var(--add-event-box-border-radius);
  border-bottom-left-radius: var(--add-event-box-border-radius);

  font-size: var(--add-event-icon-size);
  color: var(--add-event-box-little-blue-white);

  z-index: calc(var(--top-layer) - 5);
  display: grid;
  align-items: center;
  justify-items: center;
}

.addEventBox:hover {
  background-color: var(--add-event-box-blue);
  /*color: var(--add-event-box-little-gray-white);*/
}

.addEventFormBox {
  width: 95%;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: flex-start;

  cursor: pointer;
}


.iconBox {
  width: 100%;

  display: grid;
  align-items: center;
  justify-items: center;
}
.addEventIcon {
  height: var(--add-event-box-height);;
}

.dateTimeText {
  width: 97.5%;
  height: 20px;

  margin-top: 10px;
  font-size: 18px;

  display: grid;
  justify-items: start;
  align-items: center;
}

.DatePickerBox {
  margin-top: 10px;
  width: 60%;
  height: 50px;

  border-radius: 5px 5px;
  background-color: var(--add-event-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}

.DatePicker {
  width: 97.5%;
  height: 92%;

  font-size: 15px;
  font-family: var(--default-font);
  color: var(--add-event-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--input-back-ground-color);
}
.DatePicker::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.TimePickerBox {
  margin-top: 10px;
  width: 35%;
  height: 50px;

  border-radius: 5px 5px;
  background-color: var(--add-event-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}

.TimePicker {
  width: 95%;
  height: 92%;

  font-size: 20px;
  font-family: var(--default-font);
  color: var(--add-event-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--input-back-ground-color);
}
.TimePicker::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

.eventTitleInputBox {
  margin-top: 10px;
  width: 97.5%;
  height: 50px;

  border-radius: 5px 5px;
  background-color: var(--add-event-box-little-blue-white);

  display: grid;
  align-items: center;
  justify-items: center;
}
.eventTitleInput {
  width: 97.5%;
  height: 88%;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--add-event-box-little-gray-white);
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--input-back-ground-color);
}
.eventTitleInput::-webkit-input-placeholder {
  font-size: 18px;
  color: var(--add-event-box-little-blue-white);
}

.eventTextInput {
  margin-top: 10px;
  width: 95%;
  height: 180px;

  resize:none;

  font-size: 18px;
  font-family: var(--default-font);
  color: var(--add-event-box-little-gray-white);
  border: 2px solid var(--add-event-box-little-blue-white);
  outline:none;
  border-radius: 5px 5px;
  background-color: var(--input-back-ground-color);
}
.eventTextInput::-webkit-input-placeholder {
  font-size: 18px;
  color: var(--add-event-box-little-blue-white);
}

/* 修改滚动条样式 */
.eventTextInput::-webkit-scrollbar {
  width: 6px;
  background-color: var(--event-back-ground-blue);
}
.eventTextInput::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.eventTextInput::-webkit-scrollbar-thumb:hover {
  background-color: #FFFFFF5A;
}
.eventTextInput::-webkit-scrollbar-track {
  border-radius: 6px;
  background-color: #FFFFFF10;
}
.eventTextInput::-webkit-scrollbar-track:hover {
  background-color: #FFFFFF12;
}

.postEventButton {
  margin-top: 10px;
  width: 96.5%;
  height: 50px;


  font-size: 18px;
  font-family: var(--default-font);
  color: var(--add-event-box-little-blue-white);
  border: 2px solid var(--add-event-box-little-blue-white);
  border-radius: 5px 5px;
  background-color: var(--input-back-ground-color);
  cursor: pointer;

  display: grid;
  align-items: center;
  justify-items: center;
}

.postEventButton:hover {
  color: var(--add-event-box-little-gray-white);
  border: 2px solid var(--add-event-box-little-gray-white);
}
</style>