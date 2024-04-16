<script setup>
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

const props = defineProps({
  cover: {
    require: true,
    type: String,
  },
  video_src: {
    require: true,
    type: String,
  },
});

onMounted(() => {
  const video = document.querySelector("video");
  const source = props.video_src;

  // For more options see: https://github.com/sampotts/plyr/#options
  const defaultOptions = ref({});

  if (!Hls.isSupported()) {
    video.src = source;
    var player = new Plyr(video, defaultOptions.value);
  } else {
    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    const hls = new Hls();
    hls.loadSource(source);

    // From the m3u8 playlist, hls parses the manifest and returns
    // all available video qualities. This is important, in this approach,
    // we will have one source on the Plyr player.
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      // Transform available levels into an array of integers (height values).
      const availableQualities = hls.levels.map((l) => l.height);
      availableQualities.unshift(0); //prepend 0 to quality array

      // Add new qualities to option
      defaultOptions.value.quality = {
        default: 0, //Default - AUTO
        options: availableQualities,
        forced: true,
        onChange: (e) => updateQuality(e),
      };
      // Add Auto Label
      defaultOptions.value.i18n = {
        qualityLabel: {
          0: "Auto",
        },
      };

      hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
        var span = document.querySelector(
          ".plyr__menu__container [data-plyr='quality'][value='0'] span"
        );
        if (hls.autoLevelEnabled) {
          span.innerHTML = `Auto (${hls.levels[data.level].height}p)`;
        } else {
          span.innerHTML = `Auto`;
        }
      });
      // Initialize new Plyr player with quality options
      var player = new Plyr(video, defaultOptions.value);
    });

    hls.attachMedia(video);
    window.hls = hls;
  }

  function updateQuality(newQuality) {
    if (newQuality === 0) {
      window.hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
    } else {
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          console.log("Found quality match with " + newQuality);
          window.hls.currentLevel = levelIndex;
        }
      });
    }
  }

  setTimeout(() => {
    if (document.getElementsByClassName("plyr")[0]) {
      document.getElementsByClassName("plyr")[0].classList.add("h-full");
      document.getElementsByClassName("plyr")[0].classList.add("w-full");
    }
  }, 100);

  function updateQuality(newQuality) {
    window.hls.levels.forEach((level, levelIndex) => {
      if (level.height === newQuality) {
        console.log("Found quality match with " + newQuality);
        window.hls.currentLevel = levelIndex;
      }
    });
  }
});
</script>
<template>
  <div class="w-full h-full relative">
    <video
      class="w-full h-full"
      controls
      crossorigin
      style="--plyr-color-main: #fc6736; width: 100%; height: 100%;"
      :poster="cover"
    >
      '
      <source type="application/x-mpegURL" :src="video_src" />
    </video>
  </div>
</template>
<style>
video,
:deep(.plyr) {
  height: 100%;
  width: 100%;
}
:deep(.plyr__progress){
  pointer-events: none !important;
  display: none !important;
}
</style>
