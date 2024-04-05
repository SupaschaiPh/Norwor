<script setup>
    const player = ref(null)
</script>
<template>
  <div class="w-full h-full relative">
    <video
    ref="player"
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      controls
    ></video>
    <div class="w-full h-fit top-0 absolute z-40">
    </div>
  </div>
</template>
