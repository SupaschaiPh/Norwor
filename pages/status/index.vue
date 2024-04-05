<script setup>
import colors from "vuetify/util/colors";

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
    title: "HLS SServer",
    status_code: 400,
    status: "ok",
  },
]);
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
