<script setup>
  const channelName = ref("Admin")
  const channelSubtitle = ref("Admin@admin.com")

  const videoTitle = ref("Maroon 5 - This Love (Official Music Video)")

  const videoDesc = ref("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras fermentum odio eu feugiat pretium. Quis blandit turpis cursus in hac habitasse platea dictumst. Id consectetur purus ut faucibus pulvinar elementum integer. Suspendisse in est ante in nibh mauris cursus mattis molestie. Enim nunc faucibus a pellentesque sit amet porttitor. Ipsum dolor sit amet consectetur adipiscing. Aliquet nibh praesent tristique magna sit amet. Lacus sed turpis tincidunt id. Nunc scelerisque viverra mauris in. Adipiscing vitae proin sagittis nisl rhoncus.")
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
            :subtitle="channelSubtitle"
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
              <v-card-text>{{ videoDesc }}</v-card-text>
          </div>
        </section>
      </div>
      <div class="md:w-3/12 md:px-3">
        
      </div>
    </div>
  </div>
</template>
