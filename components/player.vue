<script setup>
import "video.js/dist/video-js.css";
import videojs from "video.js";

//require('videojs-contrib-quality-levels');
//require('videojs-hls-quality-selector');

const props = defineProps({
  cover: String,
});

const playerE = ref(null);
onMounted(() => {
  //videojs.registerPlugin('qalitySelectorHls',qalitySelectorHls);
  const player = videojs(
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
          src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        },
      ],
      poster:props.cover
    },
    () => {
      
    }
  );
//player.value.hlsQualitySelector()
  
});
</script>
<template>
  <div class="w-full h-full relative">
    <video class="w-full h-full video-js" ref="playerE" :poster="cover" controls>
    </video>
    <div class="w-full h-fit top-0 absolute z-40"></div>
  </div>
</template>
