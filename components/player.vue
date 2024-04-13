<script setup>
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import Hls from 'hls.js'

const playerE = ref(null);

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
      const availableQualities = hls.levels.map((l) => l.height)

      // Add new qualities to option
      defaultOptions.quality = {
        default: availableQualities[0],
        options: availableQualities,
        // this ensures Plyr to use Hls to update quality level
        // Ref: https://github.com/sampotts/plyr/blob/master/src/js/html5.js#L77
        forced: true,        
        onChange: (e) => updateQuality(e),
      }

      // Initialize new Plyr player with quality options
      const player = new Plyr(video, defaultOptions);
    });
    hls.attachMedia(video);
    window.hls = hls;
  } else {
    // default options with no quality update in case Hls is not supported
    const player = new Plyr(video, defaultOptions);
  }

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
    <video controls crossorigin playsinline style="--plyr-color-main: #FC6736;" poster="https://bitdash-a.akamaihd.net/content/sintel/poster.png">'
      <source
      type="application/x-mpegURL" 
      src="http://192.168.100.105/stream/hls/stream.m3u8">
    </video>
    <div class="w-full h-fit top-0 absolute z-40"></div>
  </div>
</template>
<style scoped>
.container {
	margin: 20px auto;
	width: 600px;
}
video {
  height: 100%;
	width: 100%;
}
</style>