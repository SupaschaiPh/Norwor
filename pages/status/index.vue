<script setup>
import colors from "vuetify/util/colors";
import mqtt from "mqtt";
const userData = useAcc();
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
const { data: webHealth, refresh: webHealthRefresh } = await useFetch(
  "/api/health"
);
const { data: nginxHealth, refresh: nginxHealthRefresh } = await useFetch(
  "/health"
);
const { data: mqttHealth } = await useFetch("/api/streaming", {
  query: { mqtt: true },
});

status.value[0].status_code = webHealth.value.status;
status.value[1].status_code = nginxHealth.value.status;

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
if (mqttHealth.value) {
  setupMQTT(
    mqttHealth.value?.body.mqtt.host,
    mqttHealth.value?.body.mqtt.port,
    mqttHealth.value?.body.mqtt.path,
    mqttHealth.value?.body.mqtt.topic
  );
}

const dropStream = (app_name, streamId, ban) => {
  $fetch('/api/ingest/drop', { params: {
    app: app_name,
    stream_id: streamId,
    ban: ban
  }})
}

const stats = ref(null);
const fetchStreamingStats = () => {
  $fetch("http://localhost/raw_stat").then((res) => {
    stats.value = res["http-flv"];
  });
};

const timeElasped = (time) => new Date(time * 1000).toISOString().slice(11, 19);

const getReadableFileSizeString = (fileSizeInBytes, is_rate) => {
  let i = -1;
  const byteRateUnits = [
    " kbps",
    " Mbps",
    " Gbps",
    " Tbps",
    " Pbps",
    " Ebps",
    " Zbps",
    " Ybps",
  ];
  const byteUnits = [" kB", " MB", " GB", " TB", " PB", " EB", " ZB", " YB"];
  do {
    fileSizeInBytes = fileSizeInBytes / 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return (
    Math.max(fileSizeInBytes, 0.1).toFixed(1) +
    (is_rate ? byteRateUnits[i] : byteUnits[i])
  );
};

const myTimer = () => {
  webHealthRefresh();
  nginxHealthRefresh();
  if (userData.value && userData.value.username === "admin")
    fetchStreamingStats();
};
const previousSetIntervalInstance = setInterval(myTimer, 1000);

if (userData.value && userData.value.username === "admin")
  fetchStreamingStats();

onBeforeUnmount(() => {
  clearInterval(previousSetIntervalInstance);
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
    <v-card
      v-if="userData && userData.username === 'admin'"
      flat
      title="Ingest Statistics"
    >
    </v-card>
    <v-card
      v-if="userData && userData.username === 'admin'"
      elevated
      variant="text"
      class="border border-1 py-4 px-2"
      rounded="lg"
    >
      <div v-if="stats !== null" class="flex flex-row flex-wrap gap-4 px-4">
        <div class="flex flex-col">
          <p>nginx_version</p>
          <p>{{ stats.nginx_version }}</p>
        </div>
        <div class="flex flex-col">
          <p>nginx_http_flv version</p>
          <p>{{ stats.nginx_http_flv_version }}</p>
        </div>
        <div class="flex flex-col">
          <p>PID</p>
          <p>{{ stats.pid }}</p>
        </div>
        <div class="flex flex-col">
          <p>Uptime</p>
          <p>{{ timeElasped(stats.uptime) }}</p>
        </div>
        <div class="flex flex-col">
          <p>Connection Accepted</p>
          <p>{{ stats.naccepted }}</p>
        </div>

        <div class="flex flex-col">
          <p>Bandwidth In</p>
          <p>{{ getReadableFileSizeString(stats.bw_in, true) }}</p>
        </div>
        <div class="flex flex-col">
          <p>Data In</p>
          <p>{{ getReadableFileSizeString(stats.bytes_in, false) }}</p>
        </div>
        <div class="flex flex-col">
          <p>Bandwidth Out</p>
          <p>{{ getReadableFileSizeString(stats.bw_out, true) }}</p>
        </div>
        <div class="flex flex-col">
          <p>Data Out</p>
          <p>{{ getReadableFileSizeString(stats.bytes_out, false) }}</p>
        </div>
        <div class="flex flex-col">
          <p>Server Port</p>
          <p>{{ stats.servers[0].port }}</p>
        </div>
      </div>
      <div
        class="px-4 py-4 elevation-2 my-6 mx-2"
        v-if="stats !== null"
        v-for="app in stats.servers[0].applications"
        :key="app.name"
      >
        <v-chip prepend-icon="mdi-server-network" color="light-blue-darken-1">
          {{ app.name }}
        </v-chip>
        <v-chip class="ml-4" prepend-icon="mdi-connection" color="green-darken-1">
          {{ app.live.nclients }} Clients
        </v-chip>
        <v-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Bandwidth In</th>
              <th>Data In</th>
              <th>Bandwidth Out</th>
              <th>Data Out</th>
              <th>Audio Bandwidth</th>
              <th>Video Bandwidth</th>
              <th>Video Resolution</th>
              <th>Video Codec</th>
              <th>Audio</th>
              <th>Audio Codec</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="app.live.streams.length > 0" v-for="stream in app.live.streams" :key="stream.name">
              <td>{{ stream.name }}</td>
              <td>{{ timeElasped(stream.time / 1000) }}</td>
              <td>{{ getReadableFileSizeString(stream?.bw_in, true) }}</td>
              <td>{{ getReadableFileSizeString(stream?.bytes_in, false) }}</td>
              <td>{{ getReadableFileSizeString(stream?.bw_out, true) }}</td>
              <td>{{ getReadableFileSizeString(stream?.bytes_out, false) }}</td>
              <td>{{ getReadableFileSizeString(stream?.bw_audio, true) }}</td>
              <td>{{ getReadableFileSizeString(stream?.bw_video, true) }}</td>
              <td >
                {{
                  `${stream.meta?.video?.width | 0}x${stream.meta?.video?.height | 0}@${stream.meta?.video?.frame_rate | 0}`
                }}
              </td>
              <td>
                {{
                  `${stream.meta?.video?.codec} ${stream.meta?.video?.profile} L${stream.meta?.video?.level | 0}`
                }}
              </td>
              <td>
                {{
                  `${stream.meta?.audio?.channels | 0} Ch ${stream?.meta?.audio?.sample_rate?.toString().slice(0,2) | ''} kHz`
                }}
              </td>
              <td>
                {{ `${stream.meta?.audio?.codec} ${stream.meta?.audio.profile}` }}
              </td>
              <td>
                <div class="flex flex-row gap-x-2">
                  <v-btn variant="tonal" color="yellow-darken-4" @click="dropStream(app.name, stream.name, false)"> Drop </v-btn>
                  <v-btn variant="tonal" color="red-darken-4" @click="dropStream(app.name, stream.name, true)"> Drop and Ban </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <v-expansion-panels class="mx-2">
  <v-expansion-panel
    title="Raw Data"
  >
  <template #text>
    <pre>{{ JSON.stringify(stats, null, 2) }}</pre>
  </template>
  </v-expansion-panel>
</v-expansion-panels>
    </v-card>
  </div>
</template>
