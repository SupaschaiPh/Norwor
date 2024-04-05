<script setup>
  const channelName = ref("Maroon 5")
  const videoTitle = ref("Maroon 5 - This Love (Official Music Video)")
</script>
<template>
  <div class="p-[2rem]">
    <div class="flex w-full">
      <div class="w-full md:w-9/12">
        <v-card class="aspect-video" rounded="xl"></v-card>
        <section class="mt-2">
          <p class="text-xl font-bold px-2">
           {{videoTitle}}
          </p>

          <v-list-item
            style="padding: 0px"
            :title="channelName"
            subtitle="ผู้ติดตาม 36.9 ล้าน คน"
            class="mt-2 px-2"
          >
            <template v-slot:prepend>
              <v-avatar
                class="cursor-pointer"
                id="avatarMeunAticvator"
                color="secondary"
              >
                {{ channelName.slice(0, 1) }}
              </v-avatar>
            </template>
          </v-list-item>
          <div class="mt-5 p-3 bg-orange-50 rounded-lg">
              demo
          </div>
        </section>
      </div>
      <div class="md:w-3/12 md:px-3">
        
      </div>
    </div>
  </div>
</template>
