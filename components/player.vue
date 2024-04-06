<script setup>
    const player = ref(null)
    defineProps(
      {
        cover:String
      }
    )
</script>
<template>
  <div class="w-full h-full relative">
    <video
    class="w-full h-full"
    ref="player"
      src="/BigBuckBunny.mp4"
      :poster="cover"
      controls
    ></video>
    <div class="w-full h-fit top-0 absolute z-40">
    </div>
  </div>
</template>
