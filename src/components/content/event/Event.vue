<template>
  <div id="event" class="eventBox">
    <time-line :events="events"></time-line>
    <event-card-box :events="events"></event-card-box>
  </div>
</template>

<script>
import timeLine from "@/components/content/event/timeLine/TimeLine";
import eventCardBox from "@/components/content/event/eventCard/EventCardBox";
export default {
  name: "Event",
  data: () => {
    return {
      events: [
        {
          eventId: 1,
          startTime: 1644330199000,
          endTime: 1644333799000,
          eventColor: '#FFE666FF',
          userName: 'ZERO two',
          userAvatar: 'https://s3.bmp.ovh/imgs/2022/02/cb03a96454b9f676.jpg',
          userType: 1,
          event: {
            eventTitle: '小明为啥还不买硬盘?',
            eventText: '过年前小明说他要买一块固态硬盘，但是他到现在都没买；说好的一起玩星际公民呢？现在已经是过年期间，小明还不回家，小明的家长也已经开始打电话催促了，小明的妈妈已经在外面等了半个月了，可是小明一直都没有回去。这天下午，小明的妈妈终于忍不住打通了小明的电话。此时的小明正坐在自己的房间内，手中拿着自己的笔记本电脑，正准备上网，却被自己的手机铃声惊醒，他看了看电话号码，竟然是他的母亲。他知道自己已经好几天没有回家了，自己的父亲和母亲肯定早就着急死了。他知道如果自己在这样任性下去，他的家人真的会担心自己，他只能乖乖的回家。接通电话之后，小明听到自己的母亲说："你怎么不回来啊，今天是除夕啊，你爸已经给我打了好几十个电话了。""对不起妈妈，我今天晚上不回去吃饭了，我要和同学在外面吃饭。"小明撒谎道，他怕自己的妈妈发火，毕竟她的脾气一向都很不好。小明的母亲听后，虽然很生气，但是也不能对小明太严格，只能说了几句话之后便挂断了电话。',
            eventImg: []
          }
        },
        {
          eventId: 2,
          startTime: 1644337399000,
          endTime: 1644348199000,
          eventColor: '#ABFF66FF',
          userName: 'bbbbbb',
          userAvatar: 'https://s3.bmp.ovh/imgs/2022/02/9f55d4620b609831.jpg',
          userType: 0,
          event: {
            eventTitle: 'jump town',
            eventText: 'Welcome everyone, I crete this org at XXXX-XX-XX Enjoy it !',
            eventImg: []
          }
        },
        {
          eventId: 3,
          startTime: 1644388143000,
          endTime: 1644391743000,
          eventColor: '#FF66CFFF',
          userName: '超天酱赛高',
          userAvatar: 'https://s3.bmp.ovh/imgs/2022/02/75e042714ac432b5.jpg',
          userType: 0,
          event: {

            eventTitle: 'Xeno',
            eventText: '今天六点钟打xeno入侵任务，在新巴贝奇集合',
            eventImg: []
          }
        },
        {
          eventId: 4,
          startTime: 1644431343000,
          endTime: 1644434943000,
          eventColor: '#66CCFFFF',
          userName: '粉红羊思密达',
          userAvatar: 'https://s3.bmp.ovh/imgs/2022/02/2fcd8ca2ac21615a.jpg',
          userType: 1,
          event: {
            eventTitle: 'Jump town',
            eventText: 'tonight we will go to... to do some bad things, XXX and XX are this mission’s team leader, they will give every a new op to drive the javelin Yes!! the javelin!!!!!!! If you want to join us, don’t forget to follow my channel on Youtube',
            eventImg: []
          }
        },
      ]
    }
  },
  components: {
    timeLine,
    eventCardBox
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