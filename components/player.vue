<script setup>
import "video.js/dist/video-js.css";
//import videojs from "video.js";
//import qualitySelector from "videojs-hls-quality-selector";
//import qualityLevels from "videojs-contrib-quality-levels";
import OpenPlayerJS from "openplayerjs";
import "openplayerjs/dist/openplayer.min.css";

//videojs.registerPlugin("qualityLevels", qualityLevels);
//videojs.registerPlugin("hlsQualitySelector", qualitySelector);
//require('videojs-contrib-quality-levels');
//require('videojs-hls-quality-selector');

const props = defineProps({
  cover: String,
  src: String,
});

const playerE = ref(null);
onMounted(() => {
  //videojs.registerPlugin('hlsQualitySelector',qualitySelector);
  //videojs.registerPlugin("qualityLevels", qualityLevels);

  /*const player = videojs(
    playerE.value,
    {
      ...playerE.value.options,
      html5: {
        vhs: {
          withCredentials: true,
        },
      },
      flash: { hls: { withCredentials: false } },
      sources: [
        {
          withCredentials: false,
          type: "application/x-mpegURL",
          src: props.src,
        },
      ],
      poster: props.cover,
    },
    () => {}
  );*/
  //player.value.hlsQualitySelector()
  const player = new OpenPlayerJS("player",{});
  player.init();
  
});
</script>
<template>

  <div class="w-full h-full relative">
    <video
      class="w-full h-full op-player__media"
      ref="playerE"
      :poster="cover"
      controls
      id="player"
      playsinline
    >
    <source :src="src"></source>
    </video>
    <div class="w-full h-fit top-0 absolute z-40"></div>
  </div>
</template>
