<script setup>
const props = defineProps({
  error: Object,
});
</script>

<template>
  <div class="h-full w-full flex justify-center items-center">
    <div>
      <p class="text-4xl text-center w-full">Not Found</p>
      <span class="flex justify-center mt-2">
        <NuxtLink class="border rounded-lg px-2 py-1"  href="/" color="primary">Back to home</NuxtLink>
      </span>
    </div>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>
