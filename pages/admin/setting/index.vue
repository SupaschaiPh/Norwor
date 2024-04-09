<script setup>
import colors from "vuetify/util/colors";

const isRail = useIsRail()
isRail.value = false

const router = useRouter();

const isLoading = ref(false);

const title = ref("");
const desc = ref("");
const source = ref("https://");
const coverFile = ref(null);
const fixedCoverURL = ref("/docks.jpg");
const coverURL = ref(fixedCoverURL.value);

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

onMounted(() => {
  $fetch("/api/streaming").then((data) => {
    title.value = data.body.video.title;
    desc.value = data.body.video.description;
    coverURL.value = data.body.video.cover;

    chatHost.value = data.body.mqtt.host;
    chatPort.value = data.body.mqtt.port;
    chatTopic.value = data.body.mqtt.topic;
    chatQos.value = data.body.mqtt.qos;
    chatPath.value = data.body.mqtt.path;
  });
});
</script>
<template>
  <section class="p-[2rem]">
    <div class="flex flex-col md:flex-row gap-6">
      <span class="md:w-4/12">
        <v-card flat :color="colors.grey.lighten5" class="h-full" rounded="xl">
          <v-card-text>
            <v-card rounded="xl" class="aspect-video" :image="coverURL">
            </v-card>
            <v-card-title>
              <v-text-field
                color="primary"
                rounded="lg"
                label="Source"
                variant="outlined"
                density="compact"
                v-model="source"
                class="mt-4"
              ></v-text-field>
              <v-file-input
                v-model="coverFile"
                color="primary"
                show-size
                chips
                density="compact"
                rounded="lg"
                label="Cover"
                variant="outlined"
                @click:clear="onChangeCoverFile"
                @change="onChangeCoverFile"
              ></v-file-input>
            </v-card-title>
          </v-card-text>
        </v-card>
      </span>
      <span class="md:w-8/12">
        <div>
          <v-card flat title="Streaming setting">
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
          <v-textarea
            rounded="lg"
            color="primary"
            label="Description"
            variant="outlined"
            rows="15"
            v-model="desc"
          ></v-textarea>
        </v-card-text>
      </span>
    </div>
    <div>
      <v-card flat title="Chat setting">
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
