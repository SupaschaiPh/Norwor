<script setup>
import colors from "vuetify/util/colors";
import mqtt from "mqtt";
const isRail = useIsRail();
isRail.value = false;
const isRail = useIsRail();
isRail.value = false;

const status = ref([
  {
    title: "Web Server",
    status_code: 600,
    status: "ok",
  },
  {
    title: "Steaming Server",
    status_code: 600,
    status: "ok",
  },
  {
    title: "MQTT Broker",
    status_code: 600,
    status: "ok",
  },
]);
const { data: webHealth } = await useFetch("/api/health");
const { data: nginxHealth } = await useFetch("http://192.168.100.105/health");
const { data: mqttHealth } = await useFetch("/api/streaming");

status.value[0].status_code = webHealth.value.status;
status.value[1].status_code = nginxHealth.value.status;

const pollingFetch = ref(null);

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
      client.subscribe(topic, (err) => {
        if (!err) {
          status.value[2].status_code = 200;
          console.log("subscribed");
        } else {
          status.value[2].status_code = 404;
        }
      });
    });
  }
  setupMQTT(
    mqttHealth.value.body.mqtt.host,
    mqttHealth.value.body.mqtt.port,
    mqttHealth.value.body.mqtt.path,
    mqttHealth.value.body.mqtt.topic
  );
});
</script>

<template>
  <div class="p-[2rem] flex flex-col gap-6">
    <v-card flat title="Server Status"> </v-card>
    <v-card flat variant="outlined" :color="colors.grey.lighten4" rounded="lg">
      <v-card-text class="flex flex-col gap-4">
        <v-card
          variant="tonal"
          rounded="lg"
          :color="
            status.every((v) => Math.floor(v.status_code / 100) == 2)
              ? 'success'
              : status.some((v) => Math.floor(v.status_code / 100) == 2)
              ? 'warning'
              : 'error'
          "
        >
          <v-card-item>
            <v-card-title
              ><p class="font-bold text-center">All Server</p></v-card-title
            >
          </v-card-item>
        </v-card>
        <span v-for="statu in status">
          <statusCard
            :title="statu.title"
            :status_code="statu.status_code"
          ></statusCard>
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>
