<script setup>
import colors from "vuetify/util/colors";
definePageMeta({
  middleware: ["admin-route"],
  meta: { permitted: ["admin"] },
});
const isRail = useIsRail();
isRail.value = false;

const config = useRuntimeConfig();

const isLoading = ref(false);

const title = ref("");
const desc = ref("");
const source = ref("");
const coverFile = ref(null);
const fixedCoverURL = ref("/docks.jpg");
const coverURL = ref(fixedCoverURL.value);
const streamID = ref("");
const streamKey = ref("");

const chatHost = ref("");
const chatPort = ref("");
const chatTopic = ref("");
const chatQos = ref("");
const chatPath = ref("");

const onChangeCoverFile = function (e) {
  if (coverFile.value[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      coverURL.value = reader.result;
    };
    reader.readAsDataURL(coverFile.value[0]);
  } else {
    coverURL.value = fixedCoverURL.value;
  }
};

const onSaveStreamingSetting = function () {
  isLoading.value = true;
  $fetch("/api/streaming", {
    method: "patch",
    body: {
      video: {
        title: title.value,
        cover: coverURL.value,
        description: desc.value,
        source: source.value,
        stream_key: streamKey.value,
        stream_id: streamID.value,
      },
    },
  })
    .then((res) => console.log(res))
    .catch((res) => console.error(res))
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });
};

const onSaveChatSetting = function () {
  isLoading.value = true;
  $fetch("/api/streaming", {
    method: "patch",
    body: {
      mqtt: {
        host: chatHost.value,
        port: chatPort.value,
        topic: chatTopic.value,
        qos: chatQos.value,
        path: chatPath.value,
      },
    },
  })
    .then((res) => console.log(res))
    .catch((res) => console.error(res))
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    });
};

const generateKey = (
  length = 20,
  characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
) =>
  Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");

const { data: streamData } = await useFetch("/api/streaming");

const streamLink = computed(
  () => `rtmp://${config.public.INGEST_SERVER}/ingest?key=${streamKey.value}`
);

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

title.value = streamData.value?.body.video.title;
desc.value = streamData.value?.body.video.description;
coverURL.value = streamData.value?.body.video.cover;
source.value = streamData.value?.body.video.source;
streamID.value = streamData.value?.body.video.stream_id;
streamKey.value = streamData.value?.body.video.stream_key;

chatHost.value = streamData.value?.body.mqtt.host;
chatPort.value = streamData.value?.body.mqtt.port;
chatTopic.value = streamData.value?.body.mqtt.topic;
chatQos.value = streamData.value?.body.mqtt.qos;
chatPath.value = streamData.value?.body.mqtt.path;
</script>
<template>
  <section class="p-[2rem]">
    <div class="flex flex-col md:flex-row gap-6">
      <span class="md:w-4/12">
        <v-card flat :color="colors.grey.lighten5" class="h-full" rounded="xl">
          <v-card-text>
            <v-card rounded="xl" class="aspect-video">
              <div
                :class="
                  'flex justify-center h-full ' +
                  (coverURL ? 'bg-black' : 'bg-primary-100')
                "
              >
                <NuxtImg class="h-full" :src="coverURL"></NuxtImg>
              </div>
            </v-card>
            <v-card-title>
              <v-file-input
                v-model="coverFile"
                class="mt-4"
                color="primary"
                show-size
                chips
                density="compact"
                rounded="lg"
                label="Thumbnails"
                variant="outlined"
                @click:clear="onChangeCoverFile"
                @change="onChangeCoverFile"
              ></v-file-input>
              <div class="flex flex-row gap-x-2">
                <v-text-field
                  color="primary"
                  rounded="lg"
                  label="Stream Key"
                  prepend-icon="mdi-identifier"
                  variant="plain"
                  v-model="streamID"
                  readonly
                  density="compact"
                ></v-text-field>
                <v-tooltip text="Copy to Clipboard">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      variant="plain"
                      density="compact"
                      class="mt-1"
                      @click="copyToClipboard(streamID)"
                      icon="mdi-content-copy"
                    ></v-btn>
                  </template>
                </v-tooltip>
                <v-tooltip text="Renew ID">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      variant="plain"
                      density="compact"
                      class="mt-1"
                      @click="() => (streamID = generateKey((length = 8)))"
                      icon="mdi-refresh"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div>
              <div class="flex flex-row gap-x-2">
                <v-text-field
                  color="primary"
                  rounded="lg"
                  label="Stream Session Key"
                  prepend-icon="mdi-key"
                  variant="plain"
                  v-model="streamKey"
                  readonly
                  density="compact"
                ></v-text-field>
                <v-tooltip text="Renew Key">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      variant="plain"
                      density="compact"
                      class="mt-1"
                      @click="() => (streamKey = generateKey())"
                      icon="mdi-refresh"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div>
              <div class="flex flex-row gap-x-2">
                <v-text-field
                  color="primary"
                  rounded="lg"
                  label="Ingest Server"
                  prepend-icon="mdi-upload-network"
                  variant="plain"
                  v-model="streamLink"
                  readonly
                  density="compact"
                ></v-text-field>
                <v-tooltip text="Copy to Clipboard">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      v-bind="props"
                      variant="plain"
                      density="compact"
                      class="mt-1"
                      @click="copyToClipboard(streamLink)"
                      icon="mdi-content-copy"
                    ></v-btn>
                  </template>
                </v-tooltip>
              </div>
            </v-card-title>
          </v-card-text>
        </v-card>
      </span>
      <span class="md:w-8/12">
        <div>
          <v-card flat title="Streaming settings">
            <template v-slot:append>
              <v-btn
                color="primary"
                @click="onSaveStreamingSetting"
                :loading="isLoading"
                rounded="lg"
                >Save</v-btn
              >
            </template>
          </v-card>
        </div>
        <v-card-text>
          <v-text-field
            color="primary"
            rounded="lg"
            label="Title"
            variant="outlined"
            v-model="title"
          ></v-text-field>
          <div class="flex flex-row gap-2">
            <v-text-field
            color="primary"
            rounded="lg"
            label="Source"
            variant="outlined"
            v-model="source"
            ></v-text-field>
            <v-btn color="blue-darken-2" variant="plain" class="mt-2" @click="() => {
              source = '/stream/hls/'
            }">
              Default
            </v-btn>
          </div>
          <v-textarea
            rounded="lg"
            color="primary"
            label="Description"
            variant="outlined"
            rows="12"
            v-model="desc"
          ></v-textarea>
        </v-card-text>
      </span>
    </div>
    <div>
      <v-card flat title="Chat settings">
        <template v-slot:append>
          <v-btn
            color="primary"
            @click="onSaveChatSetting"
            :loading="isLoading"
            rounded="lg"
            >Save</v-btn
          >
        </template>
      </v-card>
      <v-card-text>
        <div class="flex gap-6">
          <v-text-field
            class="w-10/12"
            color="primary"
            density="compact"
            label="Host"
            variant="outlined"
            v-model="chatHost"
            rounded="lg"
          ></v-text-field>
          <v-text-field
            color="primary"
            density="compact"
            label="Port"
            type="number"
            variant="outlined"
            v-model="chatPort"
            rounded="lg"
          ></v-text-field>
        </div>
        <div class="flex gap-6">
          <v-text-field
            class="w-8/12"
            color="primary"
            density="compact"
            label="Topic"
            variant="outlined"
            v-model="chatTopic"
            rounded="lg"
          ></v-text-field>
          <v-select
            label="Qos"
            color="primary"
            density="compact"
            :items="[0, 1, 2]"
            variant="outlined"
            v-model="chatQos"
            rounded="lg"
          ></v-select>
          <v-text-field
            class="w-2/12"
            color="primary"
            density="compact"
            label="Path"
            variant="outlined"
            rounded="lg"
            v-model="chatPath"
          ></v-text-field>
        </div>
      </v-card-text>
    </div>
  </section>
</template>
