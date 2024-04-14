<script setup>
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import Hls from "hls.js";

const playerE = ref(null);
const props = defineProps({
  src: String,
  cover: String,
  videotype: String,
});
onMounted(() => {
  const video = document.querySelector("video");
  const source = video.getElementsByTagName("source")[0].src;

  // For more options see: https://github.com/sampotts/plyr/#options
  const defaultOptions = {};

  if (Hls.isSupported()) {
    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    const hls = new Hls();
    hls.loadSource(source);

    // From the m3u8 playlist, hls parses the manifest and returns
    // all available video qualities. This is important, in this approach,
    // we will have one source on the Plyr player.
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      // Transform available levels into an array of integers (height values).
      const availableQualities = hls.levels.map((l) => l.height);

      // Add new qualities to option
      defaultOptions.quality = {
        default: availableQualities[0],
        options: availableQualities,
        // this ensures Plyr to use Hls to update quality level
        // Ref: https://github.com/sampotts/plyr/blob/master/src/js/html5.js#L77
        forced: true,
        onChange: (e) => updateQuality(e),
      };

      // Initialize new Plyr player with quality options
      const player = new Plyr(video, defaultOptions);
    });
    hls.attachMedia(video);
    window.hls = hls;
  } else {
    // default options with no quality update in case Hls is not supported
    const player = new Plyr(video, defaultOptions);
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

// sources: [
//         {
//           withCredentials: false,
//           type: "application/x-mpegURL",
//           src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
//         },
</script>
<template>
  <div class="w-full h-full relative">
    <video
      class="w-full h-full"
      controls
      crossorigin
      style="--plyr-color-main: #fc6736; width: 100%; height: 100%"
      :poster="props.cover"
    >
      <source :type="props.videotype" :src="props.src" />
    </video>
  </div>
</template>
<style>
video,
.plyr {
  height: 100%;
  width: 100%;
}
</style>
