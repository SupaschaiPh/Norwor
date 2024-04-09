<script setup>
import colors from "vuetify/util/colors";
import convert from "xml-js";
import rmtpStatusTable from "./rmtpStatusTable.vue";

const isRail = useIsRail();
const rtmpStat = ref(null);
const isAppAsArray = ref(false);

isRail.value = false;

const status = ref([
  {
    title: "Web Server",
    status_code: 200,
    status: "ok",
  },
  {
    title: "HLS Server",
    status_code: 200,
    status: "ok",
  },
  {
    title: "MQTT Broker",
    status_code: 400,
    status: "ok",
  },
]);
onMounted(() => {
  $fetch("https://itcdev.jarukrit.net/raw_stats/").then((res) => {
    rtmpStat.value = convert.xml2js(res, {
      compact: true,
      nativeType: true,
    }).rtmp;
    console.log(
      convert.xml2json(res, { compact: true, nativeType: true, spaces: 4 })
    );
    //console.log(typeof rtmpStat.value.server.application.live.stream.client)
    isAppAsArray.value = rtmpStat.value.server.application.name == undefined;
    if (
      !isAppAsArray.value &&
      rtmpStat.value.server.application.live.stream.client.address == undefined
    ) {
      console.log("I am array");
      rtmpStat.value.server.application.live.stream.client =
        rtmpStat.value.server.application.live.stream.client.filter((v) => {
          "publishing" in v;
        })[0];
    } else if (isAppAsArray.value) {
      rtmpStat.value.server.application = rtmpStat.value.server.application.map(
        (v) => {
          if (v.live.stream.client.address == undefined) {
            v.live.stream.client = v.live.stream.client.filter((v) => {
              "publishing" in v;
            })[0];
          }
          return v
        }
      );
    }
  });
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
          <statusCard :title="statu.title" :status_code="statu.status_code">
          </statusCard>
        </span>
      </v-card-text>
    </v-card>
    <rmtpStatusTable :isAppAsArray="isAppAsArray" :rtmp-stat="rtmpStat" />

    {{ JSON.stringify(rtmpStat) }}
  </div>
</template>
