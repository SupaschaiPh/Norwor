<script setup>
import colors from "vuetify/util/colors";

const channelName = ref("Admin");
const channelSubtitle = ref("Admin@admin.com");

const videoTitle = ref(
  'Sunday Morning - Vintage "La La Land" Style Maroon 5 Cover ft. Addie Hamilton'
);

const videoDesc = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras fermentum odio eu feugiat pretium. Quis blandit turpis cursus in hac habitasse platea dictumst. Id consectetur purus ut faucibus pulvinar elementum integer. Suspendisse in est ante in nibh mauris cursus mattis molestie. Enim nunc faucibus a pellentesque sit amet porttitor. Ipsum dolor sit amet consectetur adipiscing. Aliquet nibh praesent tristique magna sit amet. Lacus sed turpis tincidunt id. Nunc scelerisque viverra mauris in. Adipiscing vitae proin sagittis nisl rhoncus."
);
const message = ref("")
const chats = ref(["Hello World"]);

const onSendmessageHandler = function(){
  chats.value.push(message.value)
  message.value = ""
}
</script>
<template>
  <div class="p-[2rem]">
    <div class="flex flex-col lg:flex-row w-full gap-2">
      <div class="w-full lg:w-8/12">
        <v-card class="aspect-video max-h-fit" rounded="xl">
          <Player></Player>
        </v-card>
        <section class="mt-2">
          <p class="text-xl font-bold px-2">
            {{ videoTitle }}
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
      <div class="lg:w-4/12 lg:px-3">
        <v-card class="h-full relative" title="ChitChat" rounded="xl">
          <v-card-text class="flex flex-col gap-2">
            <div v-for="message in chats">
              <v-card
                flat
                :color="colors.grey.lighten4"
                rounded="lg"
                :subtitle="message"
              ></v-card>
            </div>
          </v-card-text>
          <div class="lg:absolute bottom-0 w-full">
            <v-card-text>
              <div class="w-full flex gap-2">
                <span class="w-full">
                  <v-text-field
                    color="primary"
                    rounded="lg"
                    density="compact"
                    label="Message"
                    variant="outlined"
                    v-model="message"
                  ></v-text-field>
                </span>
                <span>
                  <v-btn
                    color="primary"
                    flat
                    rounded="lg"
                    append-icon="mdi-send-outline"
                    @click="onSendmessageHandler"
                  ></v-btn>
                </span>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
