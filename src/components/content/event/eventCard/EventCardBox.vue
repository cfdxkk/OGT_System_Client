<template>
  <div id="eventCard" class="eventCardBox">
    <div class="addEventBox">
      <svg class="addEventIcon" viewBox="64 64 896 896" focusable="false" data-icon="plus-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
    </div>
    <event-card v-for="event in this.$props.events" :key="event.eventId" :event="event"></event-card>
  </div>
</template>

<script>
import eventCard from "@/components/content/event/eventCard/EventCard";
export default {
  name: "EventCardBox",
  props: {
    events: Array
  },
  components: {
    eventCard
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
}

.eventCardBox {
  --add-event-box-little-gray-white: #F5F5F5FF;
  --add-event-box-little-blue-white: #8697CEFC;
  --user-box-bottom-line-blue: #8697CE47;
  --add-event-box-blue: #0f1836;
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

  z-index: var(--top-layer);
  display: grid;
  align-items: center;
  justify-content: center;
}

.addEventBox:hover {
  background-color: var(--add-event-box-blue);
  color: var(--add-event-box-little-gray-white);
}
.addEventIcon {
  height: var(--add-event-box-height);;
}

</style>