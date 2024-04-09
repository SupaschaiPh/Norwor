<script setup>
import colors from "vuetify/util/colors";
import mqtt from "mqtt";

const isRail = useIsRail()
isRail.value = true

const channelName = ref("Admin");
const channelSubtitle = ref("Admin@admin.com");
const videoTitle = ref("");
const videoDesc = ref(
  ""
);
const videoCoverURL = ref("");
const message = ref("");
const chats = ref([]);
const isLoading = ref(true);

let publisMqtt = (mss) => {};

const onSendmessageHandler = function () {
  //chats.value.push(message.value);
  publisMqtt(message.value);
  message.value = "";
};

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

  $fetch("/api/streaming")
    .then((data) => { 
      videoTitle.value = data?.body.video.title;
      videoDesc.value = data?.body.video.description;
      videoCoverURL.value = data.body.video.cover;
      setupMQTT(
        data.body.mqtt.host,
        data.body.mqtt.port,
        data.body.mqtt.path,
        data.body.mqtt.topic
      );
    })
    .finally(() => (isLoading.value = false));
});
</script>
<template>
  <div class="p-[2rem]">
    <div class="flex flex-col lg:flex-row w-full gap-2">
      <div class="w-full lg:w-8/12">
        <v-card :loading="isLoading" class="aspect-video max-h-fit" rounded="xl">
          <v-no-ssr>
          <Player v-if="!isLoading" :cover="videoCoverURL"></Player>
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
          </v-list-item>
          <div class="mt-5 p-3 bg-orange-50 rounded-lg">
            <v-card-text>{{ videoDesc.replace(" ","&nbsp;") }}</v-card-text>
          </div>
        </section>
      </div>
      <div class="lg:w-4/12 lg:px-3">
        <v-card class="h-[90vh] relative" title="ChitChat" rounded="xl">
          <hr />
          <v-card-text
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
          <div class="bottom-0 w-full">
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
