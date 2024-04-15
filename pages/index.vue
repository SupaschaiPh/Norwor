<script setup>
import colors from "vuetify/util/colors";
import mqtt from "mqtt";

const isRail = useIsRail();
isRail.value = true;

const channelName = ref("Admin");
const channelSubtitle = ref("Admin@admin.com");
const videoTitle = ref("");
const videoDesc = ref("");
const message = ref("");
const chats = ref([]);
const isMinimizeChat = ref(false);

let publisMqtt = (mss) => {};

const onSendmessageHandler = function () {
  //chats.value.push(message.value);
  publisMqtt(message.value);
  message.value = "";
};

const { data: streamingData, pending: isLoading } = await useFetch(
  "/api/streaming"
);

videoTitle.value = streamingData?.value.body.video.title;
videoDesc.value = streamingData?.value.body.video.description;

onMounted(() => {
  function setupMQTT(
    host = "mqtt://localhost",
    port = 8083,
    path = "/mqtt",
    topic = "DUCKBEECAUSE-XYZ$ALWAYSMISSU"
  ) {
    const client = mqtt.connect(host, {
      clientId: "clientId-KMIT" + Math.floor(Math.random() * 100),
      port,
      path,
      reconnectPeriod: 0,
    });
    client.on("connect", () => {
      publisMqtt = (mss) => {
        client.publish(topic, mss);
      };
      client.subscribe(topic, (err) => {
        if (!err) {
          //client.publish("0t]F9Z`2tiW0", "Hello mqtt");
          console.log("subscribed");
        }
      });
    });
    client.on("message", (topic, message) => {
      // message is Buffer
      //console.log(message.toString());
      chats.value.push(message.toString());
      setTimeout(() => {
        document.getElementById("chit-chat-messages").scroll({
          top: document.getElementById("chit-chat-messages").scrollHeight * 2,
          behavior: "smooth",
        });
      }, 100);
    });
  }
  setupMQTT(
    streamingData?.value.body.mqtt.host,
    streamingData?.value.body.mqtt.port,
    streamingData?.value.body.mqtt.path,
    streamingData?.value.body.mqtt.topic
  );
});
</script>
<template>
  <div class="p-[2rem]">
    <div class="flex flex-col lg:flex-row w-full gap-2">
      <div :class="'w-full ' + (isMinimizeChat ? 'lg:w-full' : 'lg:w-8/12')">
        <v-card
          :loading="isLoading"
          class="aspect-video max-h-fit"
          rounded="xl"
        >
          <v-no-ssr>
            <Player
              v-if="!isLoading"
              :cover="streamingData?.body.video.cover"
              :video_src="streamingData?.body.video.source + streamingData?.body.video.stream_id + '.m3u8'"
              nuxt-client
            ></Player>
          </v-no-ssr>
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
            <template v-slot:append>
              <v-btn
                v-show="isMinimizeChat"
                @click="() => (isMinimizeChat = false)"
                variant="tonal"
                color="primary"
                class="text-none"
                append-icon="mdi-window-maximize"
                rounded="lg"
              >
                Chitchat
              </v-btn>
            </template>
          </v-list-item>
          <div class="mt-5 p-3 bg-primary-50 rounded-lg">
            <v-card-text>{{ videoDesc.replace(" ", "&nbsp;") }}</v-card-text>
          </div>
        </section>
      </div>
      <div
        v-show="!isMinimizeChat"
        :class="
          'lg:px-3 ' +
          (isMinimizeChat
            ? 'fixed bottom-0 right-0 backdrop:opacity-25'
            : 'lg:w-4/12')
        "
      >
        <v-card
          class="h-auto relative"
          title="ChitChat"
          :rounded="isMinimizeChat ? 'lg' : 'xl'"
        >
          <template v-slot:append>
            <v-btn
              variant="tonal"
              @click="() => (isMinimizeChat = !isMinimizeChat)"
              color="primary"
              density="compact"
              :icon="isMinimizeChat ? 'mdi-window-maximize' : 'mdi-minus'"
            ></v-btn>
          </template>
          <hr />
          <v-card-text
            v-if="!isMinimizeChat"
            class="flex flex-col gap-2 h-[72vh] overflow-y-scroll"
            id="chit-chat-messages"
          >
            <div v-for="message in chats">
              <v-card
                flat
                :color="colors.grey.lighten4"
                rounded="lg"
                :subtitle="message"
              ></v-card>
            </div>
          </v-card-text>
          <div v-if="!isMinimizeChat" class="bottom-0 w-full">
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
<style scoped>
    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
</style>
