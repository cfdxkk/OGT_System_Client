<template>
  <div id="hotChannelPage" class="hotChannelPageBox">
    <div id="hotChannel" class="hotChannelBox">
      <div class="channelsBox">
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
        <div class="channel"></div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "HotChannel"
}
</script>

<style scoped>
.hotChannelPageBox {
  position: relative;

  top: 300px;


  display: grid;
  justify-content: center;

}
.hotChannelBox {
  width: 1400px;
  height: 800px;

  background-color: #456ca4;

  border-radius: 40px 40px;

  display: flex;
  justify-content: center;

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
}
</style>