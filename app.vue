<script setup lang="ts">
import colors from "vuetify/util/colors";
import '@fontsource/noto-sans-thai-looped'
</script>
<template>
  <NuxtLoadingIndicator :color="false" />
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<style>
  body {
  font-family: 'Noto Sans Thai Looped', sans-serif;
}
</style>
