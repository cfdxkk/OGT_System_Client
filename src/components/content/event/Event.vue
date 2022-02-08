<template>
  <div id="event" class="eventBox">
    <time-line></time-line>
    <div style="position: absolute; top: 0px; right: 0px; overflow-y: auto; width: 93.5%; height: 100%; display: grid; justify-items: center;">
      <div style="width: 95%; height: 340px; margin-top: 20px; background-color: var(--event-blue); border-radius: 30px 30px"></div>
      <div style="width: 95%; height: 300px; margin-top: 20px; background-color: var(--event-blue); border-radius: 30px 30px"></div>
      <div style="width: 95%; height: 200px; margin-top: 20px; background-color: var(--event-blue); border-radius: 30px 30px"></div>
      <div style="width: 95%; height: 400px; margin-top: 20px; background-color: var(--event-blue); border-radius: 30px 30px"></div>
    </div>
  </div>
</template>

<script>
import timeLine from "@/components/content/event/timeLine/TimeLine";
export default {
  name: "Event",
  components: {
    timeLine
  }
}
</script>

<style scoped>
.eventBox {
  --event-box-width: 23vw;
  --event-box-min-width: 400px;
  --event-box-max-width: 600px;
  --event-box-computed-width: clamp(var(--event-box-min-width), var(--event-box-width), var(--event-box-max-width))

}
.eventBox {
  position: absolute;
  right: var(--zero-pixel);
  top: var(--zero-pixel);

  width: var(--event-box-computed-width);
  height: calc(var(--full-screen-height) - var(--header-computed-height));

  /*background-color: #1aff00FF;*/
  background-color: var(--event-back-ground-blue);
}
</style>